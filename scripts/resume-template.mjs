import { hasValue, isWebUrl } from '../src/data/resumeData.js';

const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const join = values => values.filter(hasValue).map(escape).join(' · ');
const monthYear = value => escape(value.replace(/^\d+\s+/, ''));
const link = url => isWebUrl(url) ? `<a href="${escape(url)}">${escape(url.replace(/^https?:\/\/(?:www\.)?/, '').replace(/\/$/, ''))}</a>` : '';

function highlight(text) {
  return escape(text).replace(/30\+ reports|30\+ daily reports|millions of records|3 junior team members|Oracle to PostgreSQL|Java, Spring Boot, and React/g, '<strong>$&</strong>');
}

export function renderResume(data, css) {
  const { personal, experience, education } = data;
  const verifiedSkills = new Set([
    ...Object.values(data.skills).flat(),
    ...experience.flatMap(job => job.technologies || []),
  ]);
  const skills = [
    ['Core stack', data.featuredStack],
    ['Web & data', ['JavaScript', 'HTML', 'CSS', 'SQL', 'Oracle', 'Stored procedures', 'Report generation'].filter(skill => verifiedSkills.has(skill))],
    ['Engineering', [...data.skills.concepts, ...['Code reviews', 'Team mentorship'].filter(skill => verifiedSkills.has(skill))]],
  ];
  const contacts = [
    escape(personal.location),
    hasValue(personal.phone) ? `<a href="tel:${escape(personal.phone.replace(/\s/g, ''))}">${escape(personal.phone)}</a>` : '',
    hasValue(personal.email) ? `<a href="mailto:${escape(personal.email)}">${escape(personal.email)}</a>` : '',
  ].filter(Boolean).join('<span class="separator"> | </span>');
  const profiles = [personal.website, personal.github, personal.linkedin].map(link).filter(Boolean).join('<span class="separator"> | </span>');

  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><title>${escape(personal.name)} — Resume</title><style>${css}</style></head>
<body><main class="resume">
  <header>
    <h1>${escape(personal.name)}</h1>
    <p class="professional-title">${escape(personal.title)}</p>
    <p class="contacts">${contacts}</p>
    <p class="profiles">${profiles}</p>
  </header>
  <section aria-labelledby="summary-heading">
    <h2 id="summary-heading">Professional summary</h2>
    <p class="summary">${highlight(data.resumeSummary || data.summary)}</p>
  </section>
  <section aria-labelledby="skills-heading">
    <h2 id="skills-heading">Technical skills</h2>
    ${skills.filter(([, items]) => items.length).map(([label, items]) => `<p class="skill-row"><strong>${escape(label)}:</strong> ${join(items)}</p>`).join('')}
  </section>
  <section aria-labelledby="experience-heading">
    <h2 id="experience-heading">Professional experience</h2>
    ${experience.map(job => `<article class="job">
      <h3>${escape(job.role)}</h3>
      <p class="company">${escape(job.company)}${hasValue(job.location) ? ` · ${escape(job.location)}` : ''}<span class="separator"> | </span><span class="dates">${monthYear(job.startDate)} – ${monthYear(job.endDate)}</span></p>
      <ul>${(job.resumeDescription || job.description).map(bullet => `<li>${highlight(bullet)}</li>`).join('')}</ul>
    </article>`).join('')}
  </section>
  <section aria-labelledby="education-heading">
    <h2 id="education-heading">Education</h2>
    ${education.filter(entry => /bachelor|master|doctor|diploma|associate/i.test(entry.degree)).map(entry => `<div class="education">
      <p><strong>${escape(entry.degree)}</strong></p>
      <p>${escape(entry.institution)}${hasValue(entry.location) ? ` · ${escape(entry.location)}` : ''}<span class="separator"> | </span><span class="education-years">${join([entry.startYear, entry.endYear]).replace(' · ', '–')}</span></p>
    </div>`).join('')}
  </section>
</main></body></html>`;
}
