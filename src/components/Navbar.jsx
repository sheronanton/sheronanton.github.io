import { useEffect, useRef, useState } from 'react';
import { Code2, Menu, Moon, Sun, X } from 'lucide-react';
import { hasValue, resumeData } from '../data/resumeData';
import { ResumeButton } from './Shared';

export default function Navbar({ sections }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [theme, setTheme] = useState(document.documentElement.dataset.theme);
  const menuButton = useRef(null);

  useEffect(() => {
    const elements = sections.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const update = () => {
      let current = 'home';
      for (const element of elements) if (element.getBoundingClientRect().top <= 160) current = element.id;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact';
      setActive(current);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [sections]);

  useEffect(() => {
    if (!open) return;
    const escape = (event) => { if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); } };
    const media = matchMedia('(min-width: 1000px)');
    const close = () => { if (media.matches) setOpen(false); };
    document.addEventListener('keydown', escape);
    media.addEventListener('change', close);
    return () => { document.removeEventListener('keydown', escape); media.removeEventListener('change', close); };
  }, [open]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem('resume-theme', next); } catch { /* Theme still works if storage is unavailable. */ }
  }

  const initials = hasValue(resumeData.personal.name) ? resumeData.personal.name.split(/\s+/).map(part => part[0]).slice(0, 2).join('') : 'R';
  return <header className="site-header"><div className="nav-shell">
    <a className="brand" href="#home" aria-label="Resume portfolio home"><span className="brand-icon"><Code2 size={21} /></span><span>{initials}<span className="brand-dot">.</span><span className="brand-caption"> / dev</span></span></a>
    <nav id="main-navigation" aria-label="Main navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
      {sections.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}<span className="nav-extension" aria-hidden="true">.jsx</span></a>)}
    </nav>
    <div className="nav-actions"><button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button><ResumeButton compact /><button ref={menuButton} className="icon-button menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
  </div></header>;
}
