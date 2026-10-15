/**
 * The one script every portfolio page loads. Each behaviour looks for its own elements and does
 * nothing when the page doesn't have them, so one file serves the homepage and project pages
 * (a single request instead of a chain of small ones).
 */
import { watchDock } from './dock-compact';
import { watchHeader } from './header-hide';
import { watchReadProgress } from './read-progress';
import { startShapeMorph } from './shape-morph';
import { trackSections } from './scroll-spy';
import { initThemeControls } from './theme-controls';

const all = <T extends Element>(selector: string) => [...document.querySelectorAll<T>(selector)];
const first = <T extends Element>(selector: string) => document.querySelector<T>(selector);

initThemeControls();

const header = first<HTMLElement>('[data-header]');
if (header) watchHeader(header);

const dock = first<HTMLElement>('[data-dock]');
if (dock) watchDock(dock);

// Bottom navigation (homepage) and "On this page" (project pages)
trackSections(all<HTMLAnchorElement>('[data-scroll-spy] [data-nav-item]'));
trackSections(all<HTMLAnchorElement>('[data-toc-link]'));

// Reading progress in the project dock
const info = first<HTMLAnchorElement>('[data-dock-info]');
const fill = first<HTMLElement>('[data-progress]');
if (info && fill) watchReadProgress(info, fill);

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  all<SVGPathElement>('[data-shape-morph]').forEach(startShapeMorph);
}
