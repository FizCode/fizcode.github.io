import { watchScrollDirection } from './scroll-direction';

/** Shrinks the dock (`data-compact`) while scrolling down and restores it on any scroll up. */
export function watchDock(dock: HTMLElement) {
  watchScrollDirection((down) => dock.toggleAttribute('data-compact', down));
}
