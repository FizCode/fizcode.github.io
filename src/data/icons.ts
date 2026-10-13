/** Inline stroke icons on a 24 × 24 grid. Add a name here and it becomes valid in Icon.astro and in project frontmatter. */
export const icons = {
  'home': '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
  'grid': '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  'mail': '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 7l9 6 9-6"/>',
  'moon': '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  'send': '<path d="M4 20l16-8L4 4l3 8-3 8z"/><path d="M7 12h6"/>',
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  'components': '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="3.5"/><rect x="3" y="14" width="7" height="7" rx="3.5"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  'receipt': '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  'play': '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/>',
  'fingerprint': '<path d="M7 8.5a6 6 0 0 1 10.6 3.8"/><path d="M5.5 13a7 7 0 0 1 .3-3"/><path d="M9 12a3 3 0 0 1 6 0c0 2.5-.5 4.5-1.5 6.5"/><path d="M12 12c0 2.8-.8 5.3-2.2 7.2"/><path d="M17.8 15.5a12 12 0 0 1-1.1 3.5"/>',
  'medical': '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 8v8M8 12h8"/>',
  'tag': '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  'arrow-left': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  'gauge': '<path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-5"/><path d="M4 20h16"/>',
  'cart': '<path d="M3 4h2l2.4 11h11.2L21 8H7"/><circle cx="10" cy="19.5" r="1.5"/><circle cx="18" cy="19.5" r="1.5"/>',
  'search': '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  'bookmark': '<path d="M6 3h12v18l-6-4-6 4z"/>',
  'map-pin': '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
} as const;

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as [IconName, ...IconName[]];
