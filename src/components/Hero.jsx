import { ArrowDown, ArrowUpRight, MapPin, Terminal } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { ResumeButton, SocialLinks, Value } from './Shared';
import DeveloperCard from './DeveloperCard';

export default function Hero({ experienceAvailable }) {
  const { personal } = resumeData;
  return <section id="home" className="hero" aria-labelledby="hero-title">
    <div className="hero-content"><p className="eyebrow"><span aria-hidden="true">//</span> SENIOR SOFTWARE ENGINEER · PORTFOLIO</p><p className="hello"><Terminal size={17} aria-hidden="true" /><span className="terminal-greeting">Hello, world. I’m</span></p><h1 id="hero-title"><Value value={personal.name} fallback="Your name." /><span className="heading-cursor" aria-hidden="true">_</span></h1><p className="hero-title">{personal.title}<span className="accent-period">.</span></p><p className="hero-intro"><Value value={resumeData.introduction} fallback="Add a short introduction about the applications you build, the technologies you use, and the problems you solve." /></p>
      <p className="location"><MapPin size={16} /><Value value={personal.location} fallback="Your city, country" /></p>
      <div className="hero-buttons"><a className="button button-primary" href={experienceAvailable ? '#experience' : '#about'}>{experienceAvailable ? 'View Experience' : 'About me'}<ArrowUpRight size={17} /></a><ResumeButton /></div>
      <div className="hero-social"><SocialLinks /><span className="social-divider" /><span>Find me online</span></div>
    </div>
    <div className="hero-visual"><DeveloperCard /></div>
    <a href="#about" className="scroll-cue"><ArrowDown size={15} /> Scroll to explore</a>
  </section>;
}
