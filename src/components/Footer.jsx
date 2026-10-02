import { ArrowUp } from 'lucide-react';
import { resumeData, hasValue } from '../data/resumeData';

export default function Footer() {
  return <footer className="footer"><p>© {new Date().getFullYear()} {hasValue(resumeData.personal.name) ? resumeData.personal.name : 'Your name'}<span> · Personal portfolio</span></p><a href="#home">Back to top <ArrowUp size={15} /></a></footer>;
}
