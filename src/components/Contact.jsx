import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { resumeData, hasValue } from '../data/resumeData';
import { ResumeButton, SocialLinks } from './Shared';

export default function Contact() {
  const [message, setMessage] = useState('');
  const email = resumeData.personal.email;
  const emailReady = hasValue(email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setMessage('Email copied.'); }
    catch { setMessage('Copy is unavailable. Please select the email address to copy it.'); }
  }
  return <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="contact-top"><div><p className="eyebrow">LET’S CONNECT</p><h2 id="contact-title">Start a conversation<span>.</span></h2><p>For opportunities, collaborations, or a simple hello.</p></div><ArrowUpRight className="contact-arrow" size={70} strokeWidth={1} /></div><div className="contact-bottom"><div className="contact-email">{emailReady ? <><a href={`mailto:${email}`}><Mail size={20} />{email}</a><button className="icon-button" aria-label="Copy email address" onClick={copyEmail}>{message === 'Email copied.' ? <Check size={18} /> : <Copy size={18} />}</button></> : <span className="contact-pending"><Mail size={20} />Add your public email to get in touch</span>}<p role="status" className="copy-status">{message}</p></div><ResumeButton /></div><SocialLinks labeled /></section>;
}
