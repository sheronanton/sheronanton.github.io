# Personal resume & portfolio

A responsive static portfolio built with React, Vite, JavaScript, CSS, and Lucide icons. An editor-inspired theme combines charcoal surfaces, mint accents, monospace headings, file-tab navigation, and a syntax-highlighted profile card with a compact portrait. The profile card reads real resume fields and verified skills from the data file. Includes accessible mobile navigation, active section indicators, system-aware persistent light/dark mode, and GitHub Pages deployment.

**Website:** [sheronanton.github.io](https://sheronanton.github.io/)

Animations include a terminal greeting, a brief cursor blink, staggered code-line entry, and subtle hover effects. Scroll effects add alternating experience entrances, individually staggered responsibility bullets, card scale-ins, drawn heading accents, contact entry, a reading-progress bar, an experience timeline that fills as you scroll, and gentle desktop profile parallax. Decorative loops finish within five seconds. Scroll entrances replay when content leaves the viewport and returns from either direction; separate entry and exit boundaries keep partially visible content stable. Reduced-motion preferences disable entrances/parallax, while content stays visible for keyboard focus, printing, and browsers without IntersectionObserver. Scroll updates use requestAnimationFrame without React renders. No animation library is required.

**Screenshot:** add a finished-site screenshot here after entering your resume information.

## Local development

Requires Node.js 22 and npm.

```sh
npm install
npm run dev
```

Visit the URL printed by Vite. For a production build and local preview:

```sh
npm run build
npm run preview
```

## Add your resume

Edit **`src/data/resumeData.js`**. All personal content is stored there; the website and generated SEO metadata use the same file.

- Resume content has been populated from your supplied **Infant Antony Sheron S - CV.pdf** and subsequent updates. Your Senior Software Engineer headline, Chennai location, GitHub link, and selected phone number are retained. The latest role is Senior Software Engineer at BCT Consulting Private Limited, 16 June 2026 – Present. MACCS Innovations runs from 21 January 2022 to your confirmed end date of 15 June 2026. The downloadable PDF is now a one-page resume generated from the current site data.
- The CV supplies SQL, Oracle, PostgreSQL, reporting, database migration, mentoring, two work roles, and three education entries. Java, Spring Boot, and React were subsequently confirmed as priority skills and lead the introduction and profile stack. The tools category and projects/certifications/achievements remain empty because they were not supplied; work accomplishments remain in the experience section. No years of experience or extra technologies have been inferred.
- Edit `featuredStack` to control the technology order in the profile card; the first five entries appear. Skills remain grouped by category below.
- The production website URL is configured as `https://sheronanton.github.io/`. Work/school locations and school dates absent from the CV are omitted.
- Add your introduction, biography, skills, role descriptions, project contributions, and education. Add more array entries as needed.
- Empty arrays automatically hide skills, experience, projects, education, certifications, and achievements. The draft banner disappears when no `[REPLACE ...]` strings remain. Remove optional placeholders or set them to empty strings when unused.
- Set your public email, GitHub and LinkedIn URLs. Missing links are shown as inactive placeholders; only valid HTTP(S) links become clickable. Phone is optional and is not shown in the default layout.
- Run `npm run resume:pdf` after updating the resume data to regenerate `public/resume.pdf`. The site's download buttons use `personal.resumeFile` and save it with a filename based on your name.
- The current compact portrait is `public/profile-black-suit.jpg`. To change it, add an image to `public/` and update `personal.profileImage`. Without a portrait, a code icon appears in the profile card.
- `public/og-image.png` contains a 1200 × 630 social preview with your name, professional title, featured stack, and portrait. Update it if those details change.
- After choosing the final deployed URL, set `personal.website` to the full HTTPS URL (including the repository path for a project site). This enables canonical, Open Graph URL, and absolute social image metadata. Person JSON-LD is generated only when your name is supplied.
- Build again after editing. Never publish confidential details or documents.

## Generate the PDF resume

```sh
npm run resume:pdf
npm run build
```

The generator reads `src/data/resumeData.js`, uses the layout in `scripts/resume.css`, and exports `public/resume.pdf` through local Chrome. Chrome must be installed; use `RESUME_CHROME_PATH` if your browser executable is in a different location. PDF generation is a separate command, so the Pages workflow deploys the reviewed PDF committed to the repository.

The PDF uses a single-column A4 layout, 11-point body text, selectable tagged text, and clickable email, phone, portfolio, GitHub, and LinkedIn links. It prioritizes Java, Spring Boot, React, database migration, SQL reporting, and verified achievements. `resumeSummary` and each role's `resumeDescription` hold the concise PDF copy; roles without a PDF-specific description fall back to their website bullets. All employers and the university degree are included. School-level education and grades stay on the website to keep the professional resume focused.

The generator rejects content that exceeds one page, rather than silently clipping it. The original supplied CV is backed up locally in the ignored `files/original-cv.pdf`.

## Deploy free with GitHub Pages

1. Create a public GitHub repository. For a personal site use `YOUR_USERNAME.github.io`; a project repository works too.
2. Commit and push these source files, including `package-lock.json`, to its `main` branch. Do not commit `node_modules` or `dist`.
3. Open the repository’s **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Push to `main`, or run **Deploy resume to GitHub Pages** manually in Actions.
5. Open the URL from the deployment job. Enter that URL in `personal.website` and push again.

This project uses the public repository `sheronanton/sheronanton.github.io`. Once Pages is configured to use GitHub Actions, pushing to `main` automatically publishes the site at `https://sheronanton.github.io/`. Original photos and editing prompts in `files/`, local build instructions, dependencies, and build output are excluded from Git.

The workflow configures Pages, installs with `npm ci`, builds, uploads `dist`, and deploys. It automatically derives Vite’s base path from Pages, so personal sites and project repositories use the correct asset paths. It requires no API keys or backend.

To test a project path locally:

```sh
VITE_BASE_PATH=/resume-portfolio/ npm run build
npm run preview -- --base /resume-portfolio/
```

Open `/resume-portfolio/` on the preview server. The default local base is `/`.

References: [Vite static deployment](https://vite.dev/guide/static-deploy.html), [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Share on LinkedIn

Open your LinkedIn profile → **Contact info** → **Edit** → **Add website**. Enter `https://sheronanton.github.io/`, select **Personal**, and save. See [LinkedIn's website instructions](https://www.linkedin.com/help/linkedin/answer/a548010).

For a more visible link, open **Add profile section → Recommended → Add Featured**, then add the website as a link. See [LinkedIn's Featured instructions](https://www.linkedin.com/help/linkedin/answer/a550399/). Suggested title: **Infant Antony Sheron S — Software Engineer Portfolio**. Suggested description: **My professional experience and skills in Java, Spring Boot, React, PostgreSQL, and database migration, with a downloadable resume.**

## Structure

- `src/data/resumeData.js`: factual content and asset settings.
- `src/components/`: navigation, hero, resume sections, contact, footer, and shared elements.
- `src/styles.css`: responsive layouts and themes, visible focus states, reduced motion.
- `src/hooks/useScrollReveal.js`: repeatable scroll entry animations and accessibility fallbacks.
- `vite.config.js`: build-generated metadata and configurable base path.
- `public/`: favicon and reserved resume/image locations.
- `scripts/`: PDF template, print layout, and generator.
- `.github/workflows/deploy.yml`: Pages build and deployment.

## Validation

Run `npm run build` before publishing. Check real contact links, your PDF download, keyboard navigation, both themes, mobile menu, and layouts at 320, 375, 768, 1024, and 1440 pixels. Performance and accessibility scores in the brief are goals; no Lighthouse scores are claimed.

The production build passes. Headless Chrome checks with the populated CV verified both themes at all five viewport sizes without horizontal overflow, mobile menu opening/link closure/Escape handling, theme persistence, anchor targets, work roles, three education entries, and hidden unsupported sections. Email/GitHub/LinkedIn link targets and external-link attributes passed. The PDF response and actual browser download passed. The generated resume was inspected with macOS PDFKit: one A4 page, selectable text in reading order, correct employer dates, and five working contact/profile links. No browser console errors were detected. GitHub Pages project paths were also checked during the initial implementation. Canonical metadata and social previews use the production URL/image. Other browser engines and Lighthouse have not been run.

Animation checks also passed in headless Chrome: finite decorative loops, scroll reveals that replay when returning from above or below, alternating role entries, staggered responsibilities, desktop parallax, reading progress from zero to completion, and the filling experience timeline. Live reduced-motion changes, keyboard focus on unrevealed contact controls, print visibility, and the missing-IntersectionObserver fallback passed. All five viewport widths remained free of horizontal overflow and runtime errors, including during experience entry animations.
