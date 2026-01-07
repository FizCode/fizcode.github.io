# FizCode - Android Developer Portfolio

A high-performance, static portfolio website built for Android Developers. Designed to showcase projects, skills, and experience with a modern, dark-themed aesthetic.

![Astro](https://img.shields.io/badge/Built%20with-Astro-ff5d01.svg?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)

## 🚀 Features

*   **Zero JavaScript Runtime**: Blazing fast load times by default using [Astro](https://astro.build).
*   **Modern Dark UI**: A sleek, professional dark mode designed with Android green accents.
*   **Respiratory Layout**: Fully responsive design that looks great on Mobile, Tablet, and Desktop.
*   **SEO Optimized**: Built-in meta tags, sitemap generation, and semantic HTML.
*   **GitHub Pages Ready**: Includes a pre-configured GitHub Actions workflow for automatic deployment.

## 🛠️ Tech Stack

*   **Framework**: [Astro 5.0](https://astro.build)
*   **Styling**: Vanilla CSS (Variables, Flexbox, Grid)
*   **Fonts**: Inter & Outfit (via Google Fonts)
*   **Deployment**: GitHub Pages (via GitHub Actions)

## 📂 Project Structure

```text
/
├── public/              # Static assets (favicons, images)
├── src/
│   ├── assets/          # Project images
│   ├── components/      # Reusable UI components (Header, Footer, ProjectCard)
│   ├── layouts/         # Main page layouts (Layout.astro)
│   ├── pages/           # Website pages (index.astro)
│   └── styles/          # Global CSS variables and resets
├── astro.config.mjs     # Astro configuration
└── package.json         # Project dependencies
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
Edit the `projects` section in `src/pages/index.astro` and use the `<ProjectCard />` component:

```astro
<ProjectCard 
  title="My Awesome App" 
  description="What it does..." 
  tags={['Kotlin', 'Compose']}
/>
```

### Changing Colors
Open `src/styles/global.css` and modify the `:root` variables:

```css
:root {
  --color-primary: #3ddc84; /* Change this to your brand color */
}
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
