/**
 * The soft, lobed "cookie" shapes behind the hero, the theme swatches and the featured card.
 * A shape is a circle whose radius wobbles with `lobes` bumps; it is stored as a list of radii so
 * two shapes can be blended point by point.
 */

export type ShapeSpec = readonly [lobes: number, amplitude: number, rotation: number];

const DEFAULT_SAMPLES = 200;
const DEFAULT_RADIUS = 42;

export function lobedRadii(
  [lobes, amplitude, rotation]: ShapeSpec,
  radius = DEFAULT_RADIUS,
  samples = DEFAULT_SAMPLES,
): number[] {
  return Array.from({ length: samples }, (_, i) => {
    const angle = (i / samples) * Math.PI * 2;
    return radius * (1 + amplitude * Math.cos(lobes * angle + rotation));
  });
}

/** SVG path (100 × 100 viewBox) through one radius per evenly spaced angle. */
export function pathFromRadii(radii: readonly number[]): string {
  const points = radii.map((r, i) => {
    const angle = (i / radii.length) * Math.PI * 2;
    return `${(50 + r * Math.cos(angle)).toFixed(2)} ${(50 + r * Math.sin(angle)).toFixed(2)}`;
  });
  return `M${points.join(' L')} Z`;
}

export function lobedPath(spec: ShapeSpec, radius = DEFAULT_RADIUS, samples = DEFAULT_SAMPLES): string {
  return pathFromRadii(lobedRadii(spec, radius, samples));
}

export const SHAPES = {
  cookie: [12, 0.05, 0],
  sunny: [8, 0.1, 0],
  clover: [4, 0.14, Math.PI / 4],
} as const satisfies Record<string, ShapeSpec>;

/** The featured card's shape drifts through these, one after the other. */
export const LOADER_SEQUENCE: readonly ShapeSpec[] = [
  [4, 0.14, Math.PI / 4],
  [9, 0.07, 0],
  [5, 0.1, -Math.PI / 2],
  [8, 0.06, 0],
  [2, 0.12, 0],
  [10, 0.05, 0],
  [6, 0.08, 0],
];
