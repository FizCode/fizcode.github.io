/**
 * Password protection for content in a public repository and on a static site.
 * Build side only (node:crypto); the browser decrypts the same format with Web Crypto in Locked.astro.
 *
 * AES-256-GCM with a key from PBKDF2-SHA256. Nothing about the password is stored: a wrong
 * password simply fails to decrypt.
 */
import { createCipheriv, createDecipheriv, pbkdf2Sync, randomBytes } from 'node:crypto';

export const PBKDF2_ITERATIONS = 600_000;

export interface Sealed {
	salt: string;
	iv: string;
	/** Ciphertext followed by the 16-byte GCM tag, as Web Crypto expects */
	data: string;
}

const keyFor = (password: string, salt: Buffer) => pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 32, 'sha256');

export const seal = (plaintext: string, password: string): Sealed => {
	const salt = randomBytes(16);
	const iv = randomBytes(12);
	const cipher = createCipheriv('aes-256-gcm', keyFor(password, salt), iv);
	const data = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final(), cipher.getAuthTag()]);
	return { salt: salt.toString('base64'), iv: iv.toString('base64'), data: data.toString('base64') };
};

export const open = (sealed: Sealed, password: string): string => {
	const salt = Buffer.from(sealed.salt, 'base64');
	const data = Buffer.from(sealed.data, 'base64');
	const decipher = createDecipheriv('aes-256-gcm', keyFor(password, salt), Buffer.from(sealed.iv, 'base64'));
	decipher.setAuthTag(data.subarray(-16));
	return Buffer.concat([decipher.update(data.subarray(0, -16)), decipher.final()]).toString('utf8');
};

/** The password for protected slides: from the environment (a CI secret, or .env locally) */
export const protectPassword = (): string | undefined =>
	import.meta.env?.QITA_PASSWORD || process.env.QITA_PASSWORD || undefined;
