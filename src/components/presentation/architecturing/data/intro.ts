/** Content for the opening slide: the hook, the route through the talk, and who it is for */

export const hook = {
	question: 'Where should this code go?',
	text: 'Every developer asks this daily. This talk gives you a way to answer it.',
};

/** The talk zooms in: the app, then each module, then the code inside */
export interface Part {
	title: string;
	goal: string;
	topics: string;
}

export const parts: Part[] = [
	{ title: 'Modules', goal: 'Split the app into pieces', topics: 'Why modularize, module structure, coupling' },
	{ title: 'Layers', goal: 'Give each piece clear layers', topics: 'Layers, direction, repositories, mappers' },
	{ title: 'Code', goal: 'Keep the code inside readable', topics: 'DRY, KISS & YAGNI, small functions' },
];

export const footer = ['For anyone new to architecture', 'Examples in Kotlin, ideas for any language', 'FizCode'];
