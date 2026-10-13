/** Theme = a seed palette (color) × a scheme (light/dark), both set as attributes on <html>. */

export const THEME_STORAGE_KEY = 'fizcode-theme';

export const SEEDS = [
  { seed: 'blue', lobes: 8 },
  { seed: 'green', lobes: 9 },
  { seed: 'violet', lobes: 5 },
  { seed: 'rose', lobes: 6 },
  { seed: 'orange', lobes: 4 },
] as const;

export type Seed = (typeof SEEDS)[number]['seed'];
export type Scheme = 'light' | 'dark';

export const DEFAULT_SEED: Seed = 'blue';
