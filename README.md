# FizCode - Android Developer Portfolio

A high-performance, static portfolio website built for Android Developers. Designed to showcase projects, skills, and experience with a modern, dark-themed aesthetic.

![Astro](https://img.shields.io/badge/Built%20with-Astro-ff5d01.svg?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)

## 🚀 Features

*   **Minimal Expressive + Glass design**: big soft shapes, frosted-glass header and navigation, springy hover motion.
*   **Five color themes, light and dark**: switched by two attributes on `<html>`; the choice is saved and applied before first paint.
*   **One Markdown file per project**: structured parts live in frontmatter, the story in the body.
*   **Static and fast**: built with [Astro](https://astro.build); the portfolio's only client scripts are theme switching, scroll tracking and one shape animation.
*   **Presentations**: talks built as web slides, e.g. [`/presentation/architecturing`](https://fizcode.dev/presentation/architecturing).
*   **GitHub Pages ready**: includes a GitHub Actions workflow for automatic deployment.

## 🛠️ Tech Stack

*   **Framework**: [Astro 7](https://astro.build) with a content collection
*   **Styling**: Vanilla CSS driven by design tokens (`src/styles/tokens.css`)
*   **Fonts**: Plus Jakarta Sans, Roboto Flex & JetBrains Mono (via Google Fonts)
*   **Deployment**: GitHub Pages (via GitHub Actions)

## 📂 Project Structure

```text
/
├── public/                    # Static assets (favicon, CNAME)
├── src/
│   ├── components/
│   │   ├── ui/                # Small reusable pieces (Button, Icon, ProjectCard, …)
│   │   ├── layout/            # Header, bottom navigation, ambient shapes, contact
│   │   ├── home/              # Sections of the homepage
│   │   ├── project/           # Sections of a project page
│   │   └── presentation/      # Slide components and each talk's slides and content
│   ├── content/projects/      # One Markdown file per project
│   ├── content.config.ts      # Schema of the projects collection
│   ├── data/                  # Site info and the icon set
│   ├── layouts/               # Layout.astro, PresentationLayout.astro
│   ├── lib/                   # Project queries, theme and shape helpers
│   ├── pages/                 # index.astro, projects/[slug].astro, presentation/
│   ├── scripts/               # Client scripts (theme, scroll spy, shape morph)
│   └── styles/                # tokens.css, base.css, prose.css, presentation styles
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
| `npm run seal:qita`       | Encrypts the private Qita slide data (see below) |

## 🔒 Password-protected slides

Some slides hold private content (e.g. the Qita slide in the Architecturing talk). The repository only contains an encrypted copy of it (`*.sealed.json`). The build decrypts it with a password, then encrypts the rendered slide again, so the published page only holds ciphertext and the right password unlocks it in the browser.

Create a `.env` file in the project root (it is git-ignored) with the password:

```sh
QITA_PASSWORD=your-password
```

Restart `npm run dev` after adding it. Without it, the site still builds, but those slides show *"This slide isn't available in this build."*

To change the private content, edit `src/components/presentation/architecturing/data/qita.private.ts` (git-ignored, so keep your own copy), then run `npm run seal:qita` and commit the updated `qita.sealed.json`.

## 🚀 Deployment

This project comes configured for **GitHub Pages**.

1.  Push your code to a GitHub repository.
2.  Go to **Settings > Pages** in your repository.
3.  Set **Source** to **GitHub Actions**.
4.  Add the password for protected slides as a repository secret named `QITA_PASSWORD` under **Settings > Secrets and variables > Actions**.
5.  The included `.github/workflows/deploy.yml` will automatically build and deploy your site on every push to `main`.

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
next: cashier            # optional: slug of another project
---

## Overview

The story. Each `##` heading appears in "On this page".
```

Optional fields: `featured`, `badge`, `statChip`, `role`, `year`, `team`, `emphasis` (the bold end of the title) and `screens` (up to three images, placed next to the file).

### Changing colors and type
Edit `src/styles/tokens.css`. Every component reads from these variables.

### Changing text and links
Name, email, social links and skills are in `src/data/site.ts`. The hero and about copy are in `src/components/home/`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
