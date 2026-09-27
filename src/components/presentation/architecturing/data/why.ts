/** Content for the "Why modularize?" slide */

// Icon paths are drawn on a 24x24 grid with a stroke, so they follow the text color
export const icons = {
	zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
	shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
	users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
	test: '<path d="M9 3h6"/><path d="M10 3v6l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3"/><path d="M7 15h10"/>',
	reuse: '<path d="m17 2 4 4-4 4"/><path d="M3 11V10a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
	compass: '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
};

export interface Benefit {
	icon: keyof typeof icons;
	title: string;
	text: string;
}

export const benefits: Benefit[] = [
	{ icon: 'zap', title: 'Faster builds', text: 'Only changed modules rebuild. Everything else comes from cache.' },
	{ icon: 'shield', title: 'Enforced boundaries', text: 'The build fails when a feature reaches into another. Rules live in code, not a wiki.' },
	{ icon: 'users', title: 'Teams work in parallel', text: 'Each team owns its modules and ships without stepping on others.' },
	{ icon: 'test', title: 'Easier testing', text: 'Small modules with clear inputs are quick to test in isolation.' },
	{ icon: 'reuse', title: 'Reuse', text: 'Shared modules serve every feature, and even other apps.' },
	{ icon: 'compass', title: 'Faster onboarding', text: 'New developers learn one module, not the whole codebase.' },
];

/** Monolith drawing (400x200 viewBox): every part is wired to many others */
export const monolithParts = [
	{ id: 'ui', label: 'UI', x: 70, y: 45 },
	{ id: 'cart', label: 'Cart', x: 200, y: 40 },
	{ id: 'search', label: 'Search', x: 330, y: 50 },
	{ id: 'utils', label: 'Utils', x: 135, y: 100 },
	{ id: 'api', label: 'API', x: 265, y: 100 },
	{ id: 'auth', label: 'Auth', x: 70, y: 155 },
	{ id: 'profile', label: 'Profile', x: 200, y: 160 },
	{ id: 'db', label: 'DB', x: 330, y: 155 },
];

export const monolithTangles = [
	['ui', 'cart'], ['ui', 'api'], ['ui', 'db'], ['ui', 'profile'], ['cart', 'auth'], ['cart', 'db'],
	['cart', 'utils'], ['search', 'auth'], ['search', 'utils'], ['search', 'profile'], ['search', 'ui'],
	['auth', 'api'], ['profile', 'api'], ['profile', 'utils'], ['db', 'utils'], ['auth', 'db'], ['cart', 'api'],
];
