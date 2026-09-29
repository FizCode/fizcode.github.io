import type { ModuleNode } from './modules';

/*
 * Module structure of Now in Android (github.com/android/nowinandroid), Google's reference app,
 * from its settings.gradle.kts and docs/ModularizationLearningJourney.md.
 */

export const niaApp: ModuleNode = {
	name: ':app',
	kind: 'app',
	description:
		'MainActivity, NiaApp and app-level navigation (NiaNavHost, TopLevelDestination). Depends on every feature and the core modules it needs.',
};

const api: ModuleNode = {
	name: ':api',
	kind: 'package',
	description:
		'Only the navigation keys, e.g. ForYouNavKey. Another feature opens this one by depending on its :api, never on its :impl.',
};

const impl: ModuleNode = {
	name: ':impl',
	kind: 'package',
	description:
		'Everything else: screen, ViewModel, UI state and the entry that maps the key to the screen. It may depend on other features’ :api only.',
};

export interface NiaFeature {
	node: ModuleNode;
	/** Its submodules; NiA splits a feature into :api and :impl */
	parts: ModuleNode[];
}

const feature = (name: string, description: string, parts = [api, impl]): NiaFeature => ({
	node: { name, kind: 'feature', description },
	parts,
});

export const niaFeatures: NiaFeature[] = [
	feature(':foryou', 'The “For You” feed of news from followed topics. Its :impl opens a topic through :topic:api.'),
	feature(':interests', 'Browse and follow topics.'),
	feature(':bookmarks', 'News saved for later.'),
	feature(':topic', 'One topic and its news. Opened from other features through its :api.'),
	feature(':search', 'Search across topics and news.'),
	feature(
		':settings',
		'Theme and preference settings, shown as a dialog by :app. Nothing navigates to it by key, so it has no :api.',
		[impl]
	),
];

export interface NiaGroup {
	label: string;
	nodes: ModuleNode[];
}

const core = (name: string, description: string): ModuleNode => ({ name, kind: 'core', description });

/** :core, grouped by what the modules are for */
export const niaCore: NiaGroup[] = [
	{
		label: 'Data',
		nodes: [
			core(':data', 'Repositories combining network and local storage: the single source of truth for app data.'),
			core(':domain', 'Use cases shared by features, e.g. GetFollowableTopicsUseCase. Only where logic combines repositories.'),
			core(':model', 'Plain Kotlin models used across the app. A JVM library, with no Android at all.'),
			core(':database', 'Room database, DAOs and entities.'),
			core(':datastore', 'User preferences, stored with Proto DataStore.'),
			core(':network', 'Retrofit API and network models.'),
		],
	},
	{
		label: 'UI',
		nodes: [
			core(':ui', 'Composables used by several features, e.g. news cards, built from the design system and models.'),
			core(':designsystem', 'Theme, icons and Nia components, so every feature looks the same.'),
			core(':navigation', 'Navigator and navigation state. Every feature’s :api builds on it.'),
		],
	},
	{
		label: 'Common',
		nodes: [
			core(':common', 'Coroutine dispatchers and scopes, and a Result wrapper.'),
			core(':analytics', 'An analytics interface, with Firebase and stub implementations.'),
			core(':notifications', 'System notifications for new content.'),
		],
	},
];

/** Modules around the app rather than in it */
export const niaOther: ModuleNode[] = [
	{ name: ':sync:work', kind: 'package', description: 'WorkManager jobs that keep local data in sync in the background.' },
	{ name: ':app-nia-catalog', kind: 'package', description: 'A small app that shows the design system’s components.' },
	{ name: ':benchmarks', kind: 'package', description: 'Macrobenchmarks and baseline profiles for startup and scrolling.' },
	{ name: ':lint', kind: 'package', description: 'Custom lint checks for the project.' },
	{
		name: 'test modules',
		kind: 'package',
		description:
			'Fakes and helpers for tests: :core:testing, :core:data-test, :core:datastore-test, :core:screenshot-testing, :sync:sync-test and :ui-test-hilt-manifest.',
	},
];
