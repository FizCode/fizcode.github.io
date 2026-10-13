import { LOADER_SEQUENCE, lobedRadii, pathFromRadii } from '@/lib/shapes';

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

/** Reads a CSS time token such as `6s` or `200ms` as milliseconds. */
const readMs = (element: Element, property: string) => {
  const value = getComputedStyle(element).getPropertyValue(property).trim();
  return value.endsWith('ms') ? parseFloat(value) : parseFloat(value) * 1000;
};

/** Holds each shape of the sequence, then drifts into the next while the whole shape turns slowly. */
export function startShapeMorph(path: SVGPathElement) {
  const holdMs = readMs(path, '--loader-hold');
  const morphMs = readMs(path, '--loader-morph');
  const turnMs = readMs(path, '--duration-ambient');
  const shapes = LOADER_SEQUENCE.map((spec) => lobedRadii(spec));

  let start: number | null = null;
  const frame = (now: number) => {
    start ??= now;
    const elapsed = now - start;
    const cycle = Math.floor(elapsed / holdMs);
    const eased = easeInOutCubic(Math.min(1, (elapsed % holdMs) / morphMs));
    // The first cycle starts on the shape the server rendered, so it has nothing to morph from
    const from = shapes[Math.max(0, cycle - 1) % shapes.length];
    const to = shapes[cycle % shapes.length];

    path.setAttribute('d', pathFromRadii(to.map((r, i) => from[i] + (r - from[i]) * eased)));
    path.setAttribute('transform', `rotate(${(((elapsed / turnMs) * 360) % 360).toFixed(2)} 50 50)`);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
