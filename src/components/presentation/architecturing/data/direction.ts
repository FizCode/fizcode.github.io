/** Content for the "Which way do dependencies point?" slide: layered (linear) vs onion */

// Diagram (SVG user units): three layer boxes that move from a line into a triangle
export const BOX_W = 200;
export const BOX_H = 80;
export const VIEWBOX = { width: 900, height: 460 };

export type LayerKey = 'presentation' | 'domain' | 'data';

/** Top-left corner of each box in both arrangements */
export const positions: Record<LayerKey, { linear: [number, number]; onion: [number, number] }> = {
	presentation: { linear: [50, 210], onion: [60, 320] },
	domain: { linear: [350, 210], onion: [350, 100] },
	data: { linear: [650, 210], onion: [640, 320] },
};

export interface Explanation {
	title: string;
	points: string[];
}

export const linear: Explanation = {
	title: 'Why it hurts',
	points: [
		'Business rules import data code: APIs, databases, JSON',
		'Change the database, and the domain changes too',
		"Rules can't be tested without the data layer",
	],
};

export const onion: Explanation = {
	title: 'Why it works',
	points: [
		'The domain depends on nothing, so it changes least',
		'Swap an API or database without touching the rules',
		'Test the rules with simple fakes',
	],
};

/** How the data layer can point at the domain at all */
export const inversion = {
	name: 'Dependency inversion',
	text: 'the domain defines the interface, the data layer implements it.',
};
