import { useRef } from 'react';
import { resumeData, isPlaceholder } from './data/resumeData';
import useScrollReveal from './hooks/useScrollReveal';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { About, Skills, Experience, Projects, Education, Certifications, Achievements } from './components/ResumeSections';
import Contact from './components/Contact';
import Footer from './components/Footer';

const sections = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' },
  ...(Object.values(resumeData.skills).some(items => items.length) ? [{ id: 'skills', label: 'Skills' }] : []),
  ...(resumeData.experience.length ? [{ id: 'experience', label: 'Experience' }] : []),
  ...(resumeData.projects.length ? [{ id: 'projects', label: 'Projects' }] : []),
  ...(resumeData.education.length ? [{ id: 'education', label: 'Education' }] : []),
  { id: 'contact', label: 'Contact' },
];

export default function App() {
  const mainRef = useRef(null);
  useScrollReveal(mainRef);
  const draft = JSON.stringify({ ...resumeData, personal: { ...resumeData.personal, website: '' } }).includes('[REPLACE');
  return <><a className="skip-link" href="#main-content">Skip to content</a><ScrollProgress containerRef={mainRef} /><Navbar sections={sections} /><main ref={mainRef} id="main-content" className="page-shell">
    {draft && <div className="draft-notice"><span className="draft-label">DRAFT PREVIEW</span><span>{isPlaceholder(resumeData.personal.name) ? 'Your portfolio is ready for your story.' : 'Some resume details are awaiting completion.'} <span className="draft-detail">Muted placeholder text is awaiting your real resume details.</span></span></div>}
    <Hero experienceAvailable={resumeData.experience.length > 0} /><About />
    {Object.values(resumeData.skills).some(items => items.length) && <Skills />}
    {resumeData.experience.length > 0 && <Experience />}
    {resumeData.projects.length > 0 && <Projects />}
    {resumeData.education.length > 0 && <Education />}
    {resumeData.certifications.length > 0 && <Certifications />}
    {resumeData.achievements.length > 0 && <Achievements />}
    <Contact />
  </main><div className="page-shell"><Footer /></div></>;
}
