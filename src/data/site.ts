export const site = {
  name: 'fizcode',
  url: 'https://fizcode.dev',
  email: 'fizcode.dev@gmail.com',
  description: 'Android developer and former UI/UX designer building apps with Kotlin and Jetpack Compose.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/fizcode' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/fizcode' },
    { label: 'Medium', href: 'https://medium.com/@fizcode' },
  ],
  skills: [
    'Kotlin',
    'Jetpack Compose',
    'Kotlin Multiplatform',
    'Coroutines',
    'Koin / Hilt',
    'Room',
    'Ktor',
    'MVI',
    'Design systems',
    'Figma',
  ],
} as const;

export interface DockAction {
  href: string;
  label: string;
}

export type NavId = 'home' | 'work' | 'about' | 'contact';

/** Sections of the home page, in page order. `target` is the element id on the page. */
export const navItems: readonly { id: NavId; target: string; icon: string; label: string }[] = [
  { id: 'home', target: 'top', icon: 'home', label: 'Home' },
  { id: 'work', target: 'work', icon: 'grid', label: 'Work' },
  { id: 'about', target: 'about', icon: 'user', label: 'About' },
  { id: 'contact', target: 'contact', icon: 'mail', label: 'Contact' },
];
