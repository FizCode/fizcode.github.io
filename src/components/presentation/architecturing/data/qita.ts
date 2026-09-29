import type { ModuleNode } from './modules';
import sealed from './qita.sealed.json';
import { open, protectPassword } from '../../protect';

/*
 * Module structure of Qita by BRI. The content is private: the values live in qita.private.ts,
 * which is not committed, and only this encrypted copy of them is (see `npm run seal:qita`).
 */

export interface QitaModule {
	node: ModuleNode;
	/** Its submodules, or for a single module, the packages inside it */
	parts: ModuleNode[];
}

export interface QitaGroup {
	label: string;
	modules: QitaModule[];
}

export interface QitaCoreGroup {
	label: string;
	nodes: ModuleNode[];
}

export interface QitaData {
	qitaApp: ModuleNode;
	qitaFeatures: QitaGroup[];
	qitaShared: QitaModule[];
	qitaCore: QitaCoreGroup[];
	qitaTooling: ModuleNode[];
	qitaDesignSystem: ModuleNode;
}

/** The data, or undefined when the build has no password (the slide then stays locked) */
export const loadQita = (): QitaData | undefined => {
	const password = protectPassword();
	return password ? JSON.parse(open(sealed, password)) : undefined;
};
