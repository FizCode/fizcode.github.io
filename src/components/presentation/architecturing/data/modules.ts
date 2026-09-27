export interface ModuleNode {
	name: string;
	description: string;
	/** Drives the color: `package` is a folder inside a module rather than a module of its own */
	kind: 'app' | 'feature' | 'core' | 'shared' | 'package';
	/** Drawn dashed: only add it when the project needs it */
	optional?: boolean;
	/** `tree` spreads children horizontally with connectors, `list` stacks them */
	layout?: 'tree' | 'list';
	children?: ModuleNode[];
}

export const app: ModuleNode = {
	name: ':app',
	kind: 'app',
	description:
		'The entry point. Wires features together, sets up dependencies and ships the product. It should hold almost no logic of its own.',
};

/** Every feature has the same internal shape; that consistency is the point */
const featureLayers: ModuleNode[] = [
	{
		name: 'navigation',
		kind: 'package',
		description: 'The routes or entry points other modules use to open this feature, without knowing its internals.',
	},
	{
		name: 'presentation',
		kind: 'package',
		description: 'What the user sees: screens, views and UI state. Asks the domain when there is one; otherwise asks the data repository directly.',
		children: [
			{ name: 'component', kind: 'package', description: 'UI pieces reused within this feature.' },
			{ name: 'model', kind: 'package', description: 'UI state shaped for display, e.g. formatted prices and labels.' },
		],
	},
	{
		name: 'domain',
		kind: 'package',
		optional: true,
		description:
			'Business rules in plain code, free of frameworks. Optional: add it once logic grows beyond simple data passing.',
		children: [
			{ name: 'usecase', kind: 'package', optional: true, description: 'One complex business action each, e.g. PlaceOrder. Simple reads skip it and use the repository.' },
			{ name: 'repository', kind: 'package', optional: true, description: 'Interfaces (contracts) the domain needs. The data layer implements them.' },
			{ name: 'model', kind: 'package', optional: true, description: 'Plain business models, independent of API or database shapes.' },
		],
	},
	{
		name: 'data',
		kind: 'package',
		description: 'Talks to the outside world: APIs, databases, caches. Implements the repository contract, which lives in the domain if there is one, otherwise here in data.',
		children: [
			{ name: 'repository', kind: 'package', description: 'The implementation, combining remote and local sources. Without a domain, the contract lives here too.' },
			{ name: 'model', kind: 'package', description: 'DTOs and database records. Mapped to domain models, or straight to UI models when there is no domain.' },
		],
	},
	{
		name: 'util',
		kind: 'package',
		description: 'Small helpers only this feature needs. If others need them too, they belong in :core.',
	},
];

const makeFeature = (name: string, description: string): ModuleNode => ({
	name,
	kind: 'feature',
	description,
	children: featureLayers,
});

export const features: ModuleNode[] = [
	makeFeature(
		':featureA',
		'One user-facing capability, e.g. checkout. It owns its UI, business rules and data access, and never depends on another feature.'
	),
	makeFeature(
		':featureB',
		'Another capability, e.g. search. Same internal shape as every other feature, so anyone on the team knows where things live.'
	),
	makeFeature(
		':featureC',
		'A third capability, e.g. profile. Features share code only through :core or the shared modules, never by importing each other.'
	),
];

export const core: ModuleNode = {
	name: ':core',
	kind: 'core',
	layout: 'list',
	description: 'Shared foundations any feature may use. Core never depends on a feature.',
	children: [
		{ name: ':common', kind: 'core', description: 'Language-level helpers: result types, extensions, date and string utilities.' },
		{ name: ':designsystem', kind: 'core', description: 'Theme, tokens and shared UI components, so every feature looks consistent.' },
		{ name: ':network', kind: 'core', description: 'HTTP client, authentication and error handling in one place.' },
		{ name: ':navigation', kind: 'core', description: 'Route contracts that let features open each other without depending on each other.' },
		{ name: ':database', kind: 'core', optional: true, description: 'Local storage setup. Optional: only when the product stores data locally.' },
		{ name: ':analytics', kind: 'core', optional: true, description: 'One module per integration (analytics, payments, maps…), so a vendor can be swapped in one place.' },
	],
};

export const shared: ModuleNode[] = [
	{
		name: ':domain:category',
		kind: 'shared',
		layout: 'list',
		optional: true,
		description:
			'Business rules used by several features, pulled out so features never depend on each other. Optional.',
		children: [
			{ name: 'usecase', kind: 'package', optional: true, description: 'Shared business actions.' },
			{ name: 'repository', kind: 'package', optional: true, description: 'Shared contracts.' },
			{ name: 'model', kind: 'package', optional: true, description: 'Business models shared by several features.' },
		],
	},
	{
		name: ':data:category',
		kind: 'shared',
		layout: 'list',
		description: 'Data access used by several features, e.g. a product catalog read by both checkout and search.',
		children: [
			{ name: 'repository', kind: 'package', description: 'The shared implementation.' },
			{ name: 'model', kind: 'package', description: 'Shared DTOs and database records. Mapped to domain models, or straight to UI models when there is no domain.' },
		],
	},
];

/**
 * One step of the walk through the diagram. Each step adds the next part of the picture
 * (see `data-from` in the slide), opens these boxes, and sets the subtitle.
 */
export interface TourStep {
	open: string[];
	name: string;
	text: string;
}

export const tour: TourStep[] = [
	{
		open: [':featureA'],
		name: ':app and its features',
		text: 'features never depend on each other, and each has the same layers inside; dashed means optional',
	},
	{
		open: [':featureA', ':core'],
		name: 'Shared by features and :core',
		text: 'what features share moves out of them; core never depends on a feature',
	},
];
