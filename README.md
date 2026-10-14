# FizCode - Android Developer Portfolio

A high-performance, static portfolio website built for Android Developers. Designed to showcase projects, skills, and experience with a soft, expressive look: big rounded shapes, frosted glass and five color themes in light and dark.

![Astro](https://img.shields.io/badge/Built%20with-Astro-ff5d01.svg?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)

## 🚀 Features

*   **Minimal Expressive + Glass design**: big soft shapes, frosted-glass header and navigation, springy hover motion.
*   **Five color themes, light and dark**: switched by two attributes on `<html>`; the choice is saved and applied before first paint.
*   **One Markdown file per project**: structured parts live in frontmatter, the story in the body.
*   **Floating navigation**: the glass header and the bottom bar get out of the way while you scroll down. Project pages have a dock with reading progress and a button to the next project.
*   **Static and fast**: built with [Astro](https://astro.build); the only client scripts are theme switching, scroll tracking and one shape animation. Fonts load without blocking the first paint.
*   **SEO basics**: a title, description and canonical URL on every page, a generated `sitemap.xml` and `robots.txt`, structured data (schema.org) and a custom 404 page.
*   **GitHub Pages ready**: includes a GitHub Actions workflow for automatic deployment.

## 🛠️ Tech Stack

*   **Framework**: [Astro 7](https://astro.build) with a content collection
*   **Styling**: Vanilla CSS driven by design tokens (`src/styles/tokens.css`)
*   **Fonts**: Plus Jakarta Sans, Roboto Flex & JetBrains Mono (via Google Fonts, only the weights in use)
*   **Deployment**: GitHub Pages (via GitHub Actions)

## 📂 Project Structure

```text
/
├── public/                    # Static assets (favicon, CNAME)
├── src/
│   ├── components/
│   │   ├── ui/                # Small reusable pieces (Button, Icon, ProjectCard, …)
│   │   ├── layout/            # Header, bottom navigation, project dock, ambient shapes, contact
│   │   ├── home/              # Sections of the homepage
│   │   └── project/           # Sections of a project page
│   ├── content/projects/      # One Markdown file per project
│   ├── content.config.ts      # Schema of the projects collection
│   ├── data/                  # Site info and the icon set
│   ├── layouts/               # Layout.astro
│   ├── lib/                   # Project queries, theme and shape helpers
│   ├── pages/                 # index.astro, projects/[slug].astro
│   ├── scripts/               # Client scripts (theme, scrolling, shape morph)
│   └── styles/                # tokens.css, base.css, prose.css
├── astro.config.mjs
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🚀 Deployment

This project comes configured for **GitHub Pages**.

1.  Push your code to a GitHub repository.
2.  Go to **Settings > Pages** in your repository.
3.  Set **Source** to **GitHub Actions**.
4.  The included `.github/workflows/deploy.yml` will automatically build and deploy your site on every push to `main`.

## 🎨 Customization

### Adding a project
Create `src/content/projects/<slug>.md`. The frontmatter is checked at build time (see `src/content.config.ts`), so a missing field or an unknown icon name fails the build.

```md
---
title: My App
order: 7                 # position on the homepage; the 01, 02, … numbers follow it
summary: One or two sentences.
tags: [Compose, MVVM]    # tech line on the homepage card
icon: grid               # any name in src/data/icons.ts
stack: [Kotlin, Jetpack Compose]
features:
  - { icon: gauge, title: Dashboard, text: What it does. }
highlights:
  - { title: Clean Architecture, text: Why it matters. }
next: cashier            # optional: slug of the next project (card and dock button); leave it out on the last one
---

## Overview

The story. Each `##` heading appears in "On this page".
```

Optional fields: `description` (the search-result text, up to 160 characters; defaults to `summary`), `featured`, `badge`, `statChip`, `role`, `year`, `team`, `emphasis` (the bold end of the title) and `screens` (up to three images).

### Adding screenshots
Put the images in a folder named after the project, next to its Markdown file, and list them under `screens:` (the first one is the main phone):

```md
screens:
  - { src: ./my-app/home.png, alt: Home screen with the season's anime }
```

Use portrait phone screenshots (about 1080×2400). They are shown whole, so the navigation bar at the bottom stays visible.

### Changing colors and type
Edit `src/styles/tokens.css`. Every component reads from these variables.

### Changing text and links
Name, email, social links and skills are in `src/data/site.ts`. The hero and about copy are in `src/components/home/`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
