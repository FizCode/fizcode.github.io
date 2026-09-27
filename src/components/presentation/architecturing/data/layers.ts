/** Content for the "Layers inside a feature" slide */

export interface Layer {
	key: "presentation" | "domain" | "data";
	title: string;
	/** Drawn dashed and revealed by clicking the slide: only added when needed */
	optional?: boolean;
	text: string;
	tags: string[];
	belongs: string[];
	keepOut: string[];
	/** Dependency arrow drawn below this layer */
	arrowAfter?: "down" | "up";
}

export const layers: Layer[] = [
	{
		key: "presentation",
		title: "Presentation",
		text: "What the user sees and does: screens, views and UI state.",
		tags: ["Screens / views", "UI state", "ViewModels / controllers"],
		belongs: [
			"Screens, views and UI components",
			"UI state and display formatting",
			"Handling user input and navigation",
		],
		keepOut: [
			"Complex Business rules and calculations",
			"API calls, SQL or storage code",
			"Knowing where data comes from",
		],
		arrowAfter: "down",
	},
	{
		key: "domain",
		title: "Domain",
		optional: true,
		text: "Business rules in plain code. Add it when logic grows or is shared by several screens.",
		tags: ["Use cases", "Business models", "Repository interfaces"],
		belongs: [
			"Use cases: one business action each",
			"Business models and validation rules",
			"Repository interfaces (contracts)",
		],
		keepOut: [
			"UI or framework imports",
			"HTTP, database or JSON details",
			"Any dependency on presentation or data",
		],
		arrowAfter: "up",
	},
	{
		key: "data",
		title: "Data",
		text: "Where data comes from: APIs, databases and caches, mapped into models the app can use.",
		tags: ["Repositories", "API clients", "Local storage"],
		belongs: [
			"Repository implementations",
			"API clients, database and cache access",
			"DTOs and mapping to app models",
		],
		keepOut: [
			"UI state or formatting",
			"Business decisions",
			"Anything about how screens look",
		],
	},
];
