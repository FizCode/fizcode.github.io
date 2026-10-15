// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://fizcode.dev',
    build: {
        // Put each page's CSS into its HTML: no separate stylesheet requests to wait for before the first paint
        inlineStylesheets: 'always',
    },
    // base: '/intro-to-astro',
});
