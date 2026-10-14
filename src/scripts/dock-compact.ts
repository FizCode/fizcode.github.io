/** Shrinks the dock (`data-compact`) while scrolling down and restores it on any scroll up. */
const AFTER = 120;
const THRESHOLD = 6;

export function watchDock(dock: HTMLElement) {
  let last = scrollY;
  addEventListener(
    'scroll',
    () => {
      const delta = scrollY - last;
      if (Math.abs(delta) < THRESHOLD) return;
      last = scrollY;
      dock.toggleAttribute('data-compact', scrollY > AFTER && delta > 0);
    },
    { passive: true },
  );
}
