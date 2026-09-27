/** Shapes shared by this talk's slides and components */

export type LayerKey = 'presentation' | 'domain' | 'data';

/** A piece of code that lives in one layer, with one line on its job */
export interface Snippet {
	title: string;
	lives: LayerKey;
	note: string;
	code: string;
}

/** One side of a comparison; the tone sets its mark and colour (✕ bad, ✓ good, none for neutral) */
export interface ComparisonSide {
	label: string;
	code: string;
	tone: 'bad' | 'good' | 'neutral';
}

/** Two pieces of code side by side, with the reasons underneath */
export interface Comparison {
	left: ComparisonSide;
	right: ComparisonSide;
	reasons: string[];
}

/** A layer box in a feature diagram, listing the files that live in it */
export interface DiagramLayer {
	key: LayerKey;
	files: { name: string; highlight?: boolean }[];
}

/** The mini diagrams a card can show (drawn by MiniSketch) */
export type Sketch = 'domain' | 'module' | 'usecase' | 'mapper' | 'dry' | 'extend' | 'substitute';
