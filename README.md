# FizCode - Android Developer Portfolio

A high-performance, static portfolio website built for Android Developers. Designed to showcase projects, skills, and experience with a modern, dark-themed aesthetic.

![Astro](https://img.shields.io/badge/Built%20with-Astro-ff5d01.svg?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)

## 🚀 Features

*   **Zero JavaScript Runtime**: Portfolio pages ship no JavaScript, for blazing fast load times with [Astro](https://astro.build).
*   **Modern Dark UI**: A sleek, professional dark mode designed with Android green accents.
*   **Responsive Layout**: Fully responsive design that looks great on Mobile, Tablet, and Desktop.
*   **SEO Optimized**: Built-in meta tags and semantic HTML.
*   **Project Pages from Markdown**: Each project is a Markdown file with its own detail page, powered by Astro content collections.
*   **Presentations**: Talks built as web slides, e.g. [`/presentation/architecturing`](https://fizcode.dev/presentation/architecturing).
*   **GitHub Pages Ready**: Includes a pre-configured GitHub Actions workflow for automatic deployment.

## 🛠️ Tech Stack

*   **Framework**: [Astro 7](https://astro.build)
*   **Content**: Astro content collections (Markdown)
*   **Styling**: Vanilla CSS (Variables, Flexbox, Grid)
*   **Fonts**: Inter & Outfit (via Google Fonts)
*   **Deployment**: GitHub Pages (via GitHub Actions)

## 📂 Project Structure

```text
/
├── public/                   # Static assets (favicon, CNAME)
├── src/
│   ├── components/           # Reusable UI components (Header, Footer, ProjectCard)
│   │   └── presentation/     # Slide components and each talk's slides and content
│   ├── content/
│   │   └── projects/         # One Markdown file per project
│   ├── layouts/              # Page layouts (Layout.astro, PresentationLayout.astro)
│   ├── pages/
│   │   ├── index.astro       # Home page
│   │   ├── projects/         # Project detail pages ([...slug].astro)
│   │   └── presentation/     # Presentations (architecturing.astro)
│   ├── styles/               # Global CSS variables and resets, presentation styles
│   └── content.config.ts     # Content collection schema
├── astro.config.mjs          # Astro configuration
└── package.json              # Project dependencies
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

### Changing content
Edit `src/pages/index.astro` to update your bio, experience, and skills.

### Adding Projects
Add a Markdown file to `src/content/projects/`. It appears on the home page and gets its own page at `/projects/<file-name>`:

```markdown
---
title: "My Awesome App"
description: "What it does..."
pubDate: 2024-01-01
tags: ["Kotlin", "Compose"]
priority: 5 # Higher number = shown first
---

## Overview

Details about the project...
```

Optional fields: `link` and `heroImage`. The full schema is in `src/content.config.ts`.

### Changing Colors
Open `src/styles/global.css` and modify the `:root` variables:

```css
:root {
  --color-primary: #3ddc84; /* Change this to your brand color */
}
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
