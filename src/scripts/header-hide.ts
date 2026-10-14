import { watchScrollDirection } from './scroll-direction';

/** Slides the glass header away (`data-hidden`) while scrolling down and brings it back on scroll up. */
export function watchHeader(header: HTMLElement) {
  watchScrollDirection((down) => {
    header.toggleAttribute('data-hidden', down);
    // An open theme popover belongs to the header, so it closes with it
    if (down) document.dispatchEvent(new CustomEvent('seed-popover:close'));
  });
}
