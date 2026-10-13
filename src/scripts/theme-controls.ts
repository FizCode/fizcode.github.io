import { DEFAULT_SEED, THEME_STORAGE_KEY, type Scheme, type Seed } from '@/lib/theme';

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

const syncControls = () => {
  const seed = (root.dataset.seed ?? DEFAULT_SEED) as Seed;
  swatches.forEach((swatch) => swatch.setAttribute('aria-pressed', String(swatch.dataset.seedPick === seed)));
  darkToggle?.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
};

swatches.forEach((swatch) =>
  swatch.addEventListener('click', () => {
    root.dataset.seed = swatch.dataset.seedPick;
    syncControls();
    save();
  }),
);

darkToggle?.addEventListener('click', () => {
  const next: Scheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  syncControls();
  save();
});

syncControls();
