import { ArrowUpRight, Award, Braces, Code2, Database, ExternalLink as LinkIcon, GraduationCap, Layers, Terminal, Users, Wrench } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { Badges, ExternalLink, Section, Value } from './Shared';

export function About() {
  return <Section id="about" number="01" eyebrow="THE PERSON BEHIND THE CODE" title="A little about me."><div className="about-layout"><p className="about-summary"><Value value={resumeData.summary} fallback="This is where your professional story goes. Describe your current focus, engineering strengths, the systems you’ve worked on, and what you’d like to build next." /></p><aside className="about-note"><Braces size={27} /><p>A professional story,<br />one contribution at a time.</p><span>BACKGROUND & APPROACH</span></aside></div></Section>;
}

const categories = { languages: ['Languages', Code2], frontend: ['Frontend', Layers], backend: ['Backend', Terminal], databases: ['Databases', Database], tools: ['Tools & workflow', Wrench], concepts: ['Engineering concepts', Braces], interpersonal: ['Collaboration & problem solving', Users] };
export function Skills() {
  return <Section id="skills" number="02" eyebrow="THE TOOLKIT" title="Skills & technologies." description="The tools and concepts behind the work."><div className="skills-grid">{Object.entries(resumeData.skills).filter(([, items]) => items.length).map(([category, items]) => {
    const [label, Icon] = categories[category] || [category, Code2];
    return <article className="skill-card" key={category}><Icon size={21} strokeWidth={1.5} /><h3>{label}</h3><div className="skill-items">{items.map((skill, index) => <Value value={skill} key={index} fallback="Add your verified skills" />)}</div></article>;
  })}</div></Section>;
}

export function Experience() {
  return <Section id="experience" number="03" eyebrow="THE JOURNEY" title="Professional experience." description="Roles, responsibilities, and contributions along the way.">
    <div className="timeline">{resumeData.experience.map((job, index) => <article className="experience-item" key={index}>
      <div className="experience-dates"><span className="timeline-dot" />{!job.endDate && <span>Started</span>}<Value value={job.startDate} fallback="Start date" />{job.endDate && <><span className="date-dash">—</span><Value value={job.endDate} /></>}</div>
      <div className="experience-content">
        <h3><Value value={job.role} fallback="Your role" /></h3>
        <p className="company"><Value value={job.company} fallback="Company name" />{job.location && <><span> / </span><Value value={job.location} /></>}</p>
        {job.description.length > 0 && <ul>{job.description.map((point, i) => <li key={i}><Value value={point} fallback={i === 0 ? 'Add a responsibility or achievement from this role.' : 'Describe a verified result or technical contribution.'} /></li>)}</ul>}
        <Badges items={job.technologies} />
      </div>
    </article>)}</div>
  </Section>;
}

export function Projects() {
  return <Section id="projects" number="04" eyebrow="SELECTED WORK" title="Projects in focus." description="A closer look at the things I’ve built."><div className="projects-grid">{resumeData.projects.map((project, index) => <article className="project-card" key={index}><div className={`project-art project-art-${index % 3}`} aria-hidden="true"><div className="mock-window"><div className="window-bar"><i /><i /><i /><span>project / {String(index + 1).padStart(2, '0')}</span></div><div className="window-code"><span className="code-line line-long" /><span className="code-line line-medium" /><span className="code-line line-short" /><span className="code-line line-medium" /><span className="code-line line-long" /></div><Code2 size={48} strokeWidth={1.3} /></div><span className="project-number">{String(index + 1).padStart(2, '0')}</span></div><div className="project-content"><div className="project-heading"><h3><Value value={project.name} fallback="Your project name" /></h3><ArrowUpRight size={22} /></div><p><Value value={project.description} fallback="Describe the problem this project solves and what you personally built." /></p>{project.highlights?.length > 0 && <ul>{project.highlights.map((point, i) => <li key={i}><Value value={point} fallback={i === 0 ? 'Add a key implementation detail.' : 'Describe a technical challenge you solved.'} /></li>)}</ul>}<Badges items={project.technologies} /><div className="project-links"><ExternalLink href={project.github}>Source code <ArrowUpRight size={15} /></ExternalLink><ExternalLink href={project.demo}>Live demo <LinkIcon size={15} /></ExternalLink></div></div></article>)}</div></Section>;
}

export function Education() {
  return <Section id="education" number="05" eyebrow="THE FOUNDATION" title="Education.">
    <div className="education-list">{resumeData.education.map((education, index) => <article className="education-card" key={index}>
      <div className="education-icon"><GraduationCap size={25} strokeWidth={1.5} /></div>
      <div>
        <h3><Value value={education.degree} fallback="Your degree" /></h3>
        <p><Value value={education.institution} fallback="College or university" /></p>
        {education.location && <p className="muted"><Value value={education.location} /></p>}
        {education.details && <p className="education-details"><Value value={education.details} /></p>}
      </div>
      {(education.startYear || education.endYear) && <div className="education-date">
        {education.startYear && <Value value={education.startYear} />}
        {education.startYear && education.endYear && ' — '}
        {education.endYear && <Value value={education.endYear} />}
      </div>}
    </article>)}</div>
  </Section>;
}

export function Certifications() {
  return <Section id="certifications" number="06" eyebrow="CONTINUED LEARNING" title="Certifications."><div className="credentials-grid">{resumeData.certifications.map((certificate, index) => <article className="credential-card" key={index}><Award size={24} /><h3>{certificate.name}</h3><p>{certificate.issuer} · {certificate.year}</p><ExternalLink href={certificate.credentialUrl}>View credential <ArrowUpRight size={15} /></ExternalLink></article>)}</div></Section>;
}

export function Achievements() {
  return <Section id="achievements" number="07" eyebrow="MILESTONES" title="Achievements."><ul className="achievement-list">{resumeData.achievements.map((achievement, index) => <li key={index}><Award size={20} /><Value value={achievement} /></li>)}</ul></Section>;
}
