import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { hasValue, isPlaceholder, isWebUrl, resumeData } from '../data/resumeData';

export const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export function Value({ value, fallback, className = '' }) {
  return <span className={`${className} ${isPlaceholder(value) ? 'placeholder' : ''}`} title={isPlaceholder(value) ? value : undefined}>{hasValue(value) ? value : fallback || 'Details to be added'}</span>;
}

export function Section({ id, number, eyebrow, title, description, children, className = '' }) {
  return <section id={id} aria-labelledby={`${id}-title`} className={`section ${className}`}>
    <div className="section-heading"><p className="eyebrow"><span aria-hidden="true">// {number}</span> {eyebrow}</p><h2 id={`${id}-title`}>{title}<span className="section-braces" aria-hidden="true"> {'{ }'}</span></h2>{description && <p className="section-description">{description}</p>}</div>
    {children}
  </section>;
}

export function Badges({ items = [] }) {
  if (!items.length) return null;
  return <div className="badges">{items.filter(Boolean).map((item, i) => <Value key={`${item}-${i}`} value={item} fallback="Add technology" className="badge" />)}</div>;
}

export function ExternalLink({ href, children, className = '', ...props }) {
  if (!isWebUrl(href)) return null;
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}

export function ResumeButton({ compact = false }) {
  const file = resumeData.personal.resumeFile;
  return hasValue(file)
    ? <a className={`button ${compact ? 'button-small' : 'button-outline'}`} href={assetUrl(file)} download><Download size={16} />{compact ? 'Resume' : 'Download Resume'}</a>
    : <button className={`button ${compact ? 'button-small' : 'button-outline'}`} disabled title="Add public/resume.pdf and set personal.resumeFile to enable downloads"><Download size={16} />{compact ? 'Resume' : 'Resume coming soon'}</button>;
}

export function SocialLinks({ labeled = false }) {
  const { personal } = resumeData;
  const links = [{ name: 'GitHub', href: personal.github, Icon: Github }, { name: 'LinkedIn', href: personal.linkedin, Icon: Linkedin }];
  const emailReady = hasValue(personal.email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email);
  return <div className={`social-links ${labeled ? 'social-labeled' : ''}`}>
    {links.map(({ name, href, Icon }) => isWebUrl(href)
      ? <ExternalLink key={name} href={href} aria-label={name}><Icon size={18} />{labeled && name}{labeled && <ArrowUpRight size={15} />}</ExternalLink>
      : <span key={name} className="unavailable" aria-label={`${name} link not added`} title={`Add your ${name} URL`}><Icon size={18} />{labeled && `${name} · not added`}</span>)}
    {emailReady ? <a href={`mailto:${personal.email}`} aria-label="Send an email"><Mail size={18} />{labeled && 'Email me'}{labeled && <ArrowUpRight size={15} />}</a>
      : <span className="unavailable" aria-label="Email not added" title="Add your public email"><Mail size={18} />{labeled && 'Email · not added'}</span>}
  </div>;
}
