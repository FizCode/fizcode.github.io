/**
 * Reports when the reader starts scrolling down (past the top of the page) and when they scroll
 * back up, so floating bars can settle out of the way. The distances come from tokens.css.
 */
const readPx = (name: string) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));

export function watchScrollDirection(onChange: (scrollingDown: boolean) => void) {
  const threshold = readPx('--dock-scroll-threshold');
  const jitter = readPx('--dock-scroll-jitter');

  let last = scrollY;
  let down = false;
  addEventListener(
    'scroll',
    () => {
      const delta = scrollY - last;
      if (Math.abs(delta) < jitter) return;
      last = scrollY;
      const next = scrollY > threshold && delta > 0;
      if (next !== down) onChange((down = next));
    },
    { passive: true },
  );
}
