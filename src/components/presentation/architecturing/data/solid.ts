/** Content for the "You already know SOLID" slide: each principle, and where the talk already used it */

import type { Sketch } from './types';

export interface Principle {
	letter: string;
	name: string;
	meaning: string;
	sketch: Sketch;
	seen: string;
	slides: number[];
}

export const principles: Principle[] = [
	{
		letter: 'S',
		name: 'Single Responsibility',
		meaning: 'One reason to change',
		sketch: 'mapper',
		seen: 'Three models, three reasons to change; small functions that do one thing',
		slides: [8, 11],
	},
	{
		letter: 'O',
		name: 'Open/Closed',
		meaning: 'Add behavior without editing what already works',
		sketch: 'extend',
		seen: 'A fake repository was added; the ViewModel did not change',
		slides: [7],
	},
	{
		letter: 'L',
		name: 'Liskov Substitution',
		meaning: 'Every implementation keeps the contract’s promise',
		sketch: 'substitute',
		seen: 'The fake stands in for the real repository',
		slides: [7],
	},
	{
		letter: 'I',
		name: 'Interface Segregation',
		meaning: 'Depend only on what you use',
		sketch: 'module',
		seen: 'Small repositories, one per job; features share a small module',
		slides: [6, 7],
	},
	{
		letter: 'D',
		name: 'Dependency Inversion',
		meaning: 'Depend on contracts; arrows point inward',
		sketch: 'domain',
		seen: 'The repository contract lives in the domain; data implements it',
		slides: [5, 7],
	},
];

export const closing = "SOLID isn't a checklist. It's what good structure looks like after the fact.";
