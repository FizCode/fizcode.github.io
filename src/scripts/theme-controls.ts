import { lobedPath } from '@/lib/shapes';
import { DEFAULT_SEED, SEEDS, THEME_STORAGE_KEY, type Scheme, type Seed } from '@/lib/theme';

/** Wires the theme swatches, the dark-mode toggle and the phone popover; the choice is saved. */
export function initThemeControls() {
  const root = document.documentElement;

  const save = () => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ seed: root.dataset.seed, scheme: root.dataset.theme }));
    } catch {
      // Storage can be blocked (private mode); the theme then simply lasts for this visit.
    }
  };

  const swatches = document.querySelectorAll<HTMLButtonElement>('[data-seed-pick]');
  const darkToggle = document.querySelector<HTMLButtonElement>('[data-dark-toggle]');

  const toggle = document.querySelector<HTMLButtonElement>('[data-seed-toggle]');
  const popover = document.querySelector<HTMLElement>('[data-seed-pop]');
  const toggleShape = toggle?.querySelector('[data-seed-shape]');

  const setPopover = (open: boolean) => {
    if (!toggle || !popover) return;
    popover.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  };

  const syncControls = () => {
    const seed = (root.dataset.seed ?? DEFAULT_SEED) as Seed;
    const lobes = SEEDS.find((s) => s.seed === seed)?.lobes ?? 8;
    toggleShape?.setAttribute('d', lobedPath([lobes, 0.07, 0], 40, 120));
    toggle?.setAttribute('aria-label', `Theme color: ${seed}`);
    swatches.forEach((swatch) => swatch.setAttribute('aria-pressed', String(swatch.dataset.seedPick === seed)));
    darkToggle?.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
  };

  swatches.forEach((swatch) =>
    swatch.addEventListener('click', () => {
      root.dataset.seed = swatch.dataset.seedPick;
      syncControls();
      save();
      setPopover(false);
    }),
  );

  darkToggle?.addEventListener('click', () => {
    const next: Scheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    syncControls();
    save();
  });

  toggle?.addEventListener('click', () => setPopover(popover?.hidden ?? false));
  document.addEventListener('seed-popover:close', () => setPopover(false));

  // Escape (focus goes back to the button) or a tap outside closes the popover
  addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && popover && !popover.hidden) {
      setPopover(false);
      toggle?.focus();
    }
  });
  addEventListener('pointerdown', (event) => {
    const target = event.target as Node;
    if (popover && !popover.hidden && !popover.contains(target) && !toggle?.contains(target)) setPopover(false);
  });

  syncControls();
}
