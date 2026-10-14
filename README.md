# Ahmad Darwish — Portfolio Website

**Public website source code only. No commercial product code is included.**

A responsive React portfolio highlighting Node.js and React skills alongside four public-facing commercial case studies.

## Requirements

- Node.js 20.19+ or 22.x (project uses Vite 5; Node 22 recommended)
- npm

## Quick start

```bash
npm install
npm run dev
```

Then open the URL printed in your terminal (usually `http://127.0.0.1:5173`).

## Before publishing

1. Open `src/config.js` and replace `YOUR_GITHUB_USERNAME` with your **actual GitHub username**.
2. Review the public email address (you can change or remove it).
3. Review `src/data.js` and verify all project details and your personal contribution.
4. Create four public showcase repositories, using the files in `../showcase-repositories/`.
5. **Do not add private source code, internal API paths, database screenshots, private screenshots, passwords, client information, or .env files.**

## Publishing

Create a **public** repository called `<your-username>.github.io`. Put the contents of this `portfolio-website` folder at the repository **root** (not a nested directory). Push to `main`. Open repository **Settings → Pages → Build and deployment → Source: GitHub Actions**. The included workflow builds React and deploys the `dist` output. Your website will be at `https://<your-username>.github.io`.

If you choose a different repository name, update `base` in `vite.config.js` to `/<repository-name>/` or use the special `<your-username>.github.io` name above.

### Security note

This website is public source code, **not** any of the commercial application code. The illustrations are intentionally abstract; they are not screenshots of client software.
