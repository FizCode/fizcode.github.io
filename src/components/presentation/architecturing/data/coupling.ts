/** Content for the "Keep modules decoupled" slide: a high-coupling graph and its decoupled version */

// Diagram grid (SVG user units): three columns, four rows of modules
export const NODE_W = 200;
export const NODE_H = 72;
export const VIEWBOX = { width: 860, height: 510 };
const col = [30, 330, 630];
const row = [30, 150, 270, 410];

export type GraphState = 'before' | 'after';

export interface GraphNode {
	id: string;
	label: string[];
	/** `package` is a folder inside a module (named by `module`), not a module of its own */
	kind: 'feature' | 'shared' | 'package';
	module?: string;
	x: number;
	y: number;
	/** Only drawn in one state; shared by both when omitted */
	state?: GraphState;
	/** Drawn dashed: a layer added only when needed */
	optional?: boolean;
}

export const nodes: GraphNode[] = [
	{ id: 'aPres', label: [':featureA', '/presentation'], kind: 'feature', x: col[0], y: row[0] },
	{ id: 'bPres', label: [':featureB', '/presentation'], kind: 'feature', x: col[0], y: row[1] },
	{ id: 'cPres', label: [':featureC', '/presentation'], kind: 'feature', x: col[0], y: row[2] },
	{ id: 'dPres', label: [':featureD', '/presentation'], kind: 'feature', x: col[0], y: row[3], state: 'before' },
	{ id: 'aDom', label: [':featureA', ':domain'], kind: 'feature', x: col[1], y: row[0], state: 'before' },
	{ id: 'aData', label: [':featureA', ':data'], kind: 'feature', x: col[2], y: row[0], state: 'before' },
	{ id: 'cDom', label: [':featureC', ':domain'], kind: 'feature', x: col[1], y: row[2], state: 'before' },
	// After: A-C share the payment modules, lined up with featureB;
	// featureD stands alone as one module, its layers are packages inside it
	//
	// Speaker note: the payment split is the api/impl evolution of one shared module.
	// A team usually starts with a single `:shared:payment` (simple: one shared, versioned unit)
	// and splits it into `:domain:payment` (the contract, the "api") and `:data:payment`
	// (the "impl") once features should see only the contract: then a change to the API or
	// database code rebuilds just `:data:payment`, which is exactly what the blast radius shows
	// here ("breaks nothing else"). `:app` wires the implementation in through DI.
	{ id: 'payDom', label: [':domain:payment'], kind: 'shared', x: col[1], y: row[1], state: 'after' },
	{ id: 'payData', label: [':data:payment'], kind: 'shared', x: col[2], y: row[1], state: 'after' },
	{ id: 'dPresPkg', label: ['presentation'], kind: 'package', module: ':featureD', x: col[0], y: row[3], state: 'after' },
	{ id: 'dDom', label: ['domain'], kind: 'package', module: ':featureD', x: col[1], y: row[3], state: 'after', optional: true },
	{ id: 'dData', label: ['data'], kind: 'package', module: ':featureD', x: col[2], y: row[3], state: 'after' },
];

const at = (id: string) => nodes.find((n) => n.id === id)!;
const cy = (n: GraphNode) => n.y + NODE_H / 2;

export interface GraphEdge {
	/** `from` depends on `to` */
	from: string;
	to: string;
	state: GraphState;
	/** A feature reaching into another feature's internals */
	cross?: boolean;
	/** SVG path */
	d: string;
}

// Paths run right/left along a row, or right then up/down into the target
const straight = (from: string, to: string) => {
	const a = at(from), b = at(to);
	return a.x < b.x ? `M${a.x + NODE_W},${cy(a)} H${b.x}` : `M${a.x},${cy(a)} H${b.x + NODE_W}`;
};
const elbow = (from: string, to: string, dx = 0) => {
	const a = at(from), b = at(to);
	const x = b.x + NODE_W / 2 + dx;
	return `M${a.x + NODE_W},${cy(a)} H${x} V${b.y < a.y ? b.y + NODE_H : b.y}`;
};
// Every feature joins one trunk that runs into the shared domain module
const trunk = (from: string) => {
	const a = at(from), b = at('payDom');
	const x = (col[0] + NODE_W + col[1]) / 2;
	return `M${a.x + NODE_W},${cy(a)} H${x} V${cy(b)} H${b.x}`;
};

export const edges: GraphEdge[] = [
	{ from: 'aPres', to: 'aDom', state: 'before', d: straight('aPres', 'aDom') },
	{ from: 'aData', to: 'aDom', state: 'before', d: straight('aData', 'aDom') },
	{ from: 'cPres', to: 'cDom', state: 'before', d: straight('cPres', 'cDom') },
	{ from: 'bPres', to: 'aData', state: 'before', cross: true, d: elbow('bPres', 'aData', -40) },
	{ from: 'cDom', to: 'aData', state: 'before', cross: true, d: elbow('cDom', 'aData', 40) },
	{ from: 'dPres', to: 'cDom', state: 'before', cross: true, d: elbow('dPres', 'cDom') },
	...['aPres', 'bPres', 'cPres'].map((id) => ({ from: id, to: 'payDom', state: 'after' as const, d: trunk(id) })),
	{ from: 'payData', to: 'payDom', state: 'after', d: straight('payData', 'payDom') },
	{ from: 'dPresPkg', to: 'dDom', state: 'after', d: straight('dPresPkg', 'dDom') },
	{ from: 'dData', to: 'dDom', state: 'after', d: straight('dData', 'dDom') },
];

/** Frame around featureD's packages in the decoupled graph, titled with the module name */
export const moduleFrame = {
	title: ':featureD',
	x: col[0] - 15,
	y: row[3] - 15,
	width: col[2] + NODE_W + 15 - (col[0] - 15),
	height: NODE_H + 30,
};

export const rules = ['Features never depend on each other', 'Share code through common modules', 'Depend on domain, not data'];
