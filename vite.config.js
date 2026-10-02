import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resumeData, hasValue, isWebUrl } from './src/data/resumeData.js';

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

export default defineConfig({
  plugins: [react(), {
    name: 'resume-metadata',
    transformIndexHtml(html) {
      const { personal, introduction } = resumeData;
      const name = hasValue(personal.name) ? personal.name : 'Resume portfolio';
      const title = `${name} | ${personal.title}`;
      const description = hasValue(introduction) ? introduction : 'Professional resume and developer portfolio. Personal information is awaiting completion.';
      const tags = [
        { tag: 'meta', attrs: { name: 'description', content: description } },
        ...['og:title', 'og:description', 'og:type'].map((property, i) => ({ tag: 'meta', attrs: { property, content: [title, description, 'website'][i] } })),
        { tag: 'meta', attrs: { name: 'twitter:card', content: personal.socialImage && isWebUrl(personal.website) ? 'summary_large_image' : 'summary' } },
        { tag: 'meta', attrs: { name: 'twitter:title', content: title } },
        { tag: 'meta', attrs: { name: 'twitter:description', content: description } },
      ];
      if (isWebUrl(personal.website)) {
        tags.push({ tag: 'link', attrs: { rel: 'canonical', href: personal.website } }, { tag: 'meta', attrs: { property: 'og:url', content: personal.website } });
        if (personal.socialImage) {
          const image = new URL(personal.socialImage, `${personal.website.replace(/\/$/, '')}/`).href;
          tags.push(
            { tag: 'meta', attrs: { property: 'og:image', content: image } },
            { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
            { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
            { tag: 'meta', attrs: { property: 'og:image:alt', content: `${name} — ${personal.title}` } },
            { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
          );
        }
      }
      if (hasValue(personal.name)) tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Person', name: personal.name, jobTitle: personal.title,
        ...(isWebUrl(personal.website) ? { url: personal.website } : {}),
        sameAs: [personal.github, personal.linkedin].filter(isWebUrl),
      }).replace(/</g, '\\u003c') });
      return { html: html.replace('<title>Resume portfolio</title>', `<title>${escapeHtml(title)}</title>`), tags };
    },
  }],
  base: process.env.VITE_BASE_PATH || '/',
});
