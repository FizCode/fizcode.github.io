/**
 * Encrypts the private Qita data (qita.private.ts, not committed) into qita.sealed.json, which is.
 * Run after changing the data: `npm run seal:qita`. Reads QITA_PASSWORD from the environment or .env.
 */
import { writeFileSync } from 'node:fs';
import { seal } from '../src/components/presentation/protect.ts';
import { qita } from '../src/components/presentation/architecturing/data/qita.private.ts';

try {
	process.loadEnvFile();
} catch {
	// No .env: the password must come from the environment
}

const password = process.env.QITA_PASSWORD;
if (!password) {
	console.error('Set QITA_PASSWORD (in the environment or .env) first.');
	process.exit(1);
}

const out = new URL('../src/components/presentation/architecturing/data/qita.sealed.json', import.meta.url);
writeFileSync(out, JSON.stringify(seal(JSON.stringify(qita), password), null, '\t') + '\n');
console.log(`Sealed ${out.pathname}`);
