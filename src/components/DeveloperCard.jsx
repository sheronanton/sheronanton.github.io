import { ArrowUpRight, Code2, FileCode2 } from 'lucide-react';
import { resumeData, hasValue } from '../data/resumeData';
import { assetUrl, Value } from './Shared';

export default function DeveloperCard() {
  const { personal, skills, featuredStack } = resumeData;
  const stack = [...new Set((featuredStack ?? Object.values(skills).flat()).filter(hasValue))].slice(0, 5);
  const fields = [['role', personal.title], ['location', personal.location]];
  return <aside className="developer-card" aria-label="Developer profile">
    <div className="editor-titlebar"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><span><FileCode2 size={14} /> developer.js</span><Code2 size={15} aria-hidden="true" /></div>
    <div className="developer-profile">
      <div className="developer-avatar">{hasValue(personal.profileImage) ? <img className="profile-image" src={assetUrl(personal.profileImage)} alt={`Professional portrait of ${hasValue(personal.name) ? personal.name : 'the portfolio owner'}`} width="620" height="800" fetchPriority="high" /> : <Code2 size={36} />}</div>
      <div><p className="code-comment">// the person behind the code</p><p className="developer-name"><Value value={personal.name} fallback="Your name" /></p></div>
    </div>
    <div className="editor-code" aria-label="Professional details">
      <div className="editor-row"><span className="editor-line-number" aria-hidden="true">1</span><code><span className="syntax-keyword">const</span> <span className="syntax-variable">developer</span> = {'{'}</code></div>
      {fields.map(([key, value], index) => <div className="editor-row" key={key}><span className="editor-line-number" aria-hidden="true">{index + 2}</span><code className="editor-indent"><span className="syntax-property">{key}</span>: <span className="syntax-string">{hasValue(value) ? JSON.stringify(value) : 'null'}</span>,</code></div>)}
      <div className="editor-row"><span className="editor-line-number" aria-hidden="true">4</span><code className="editor-indent"><span className="syntax-property">stack</span>: <span className="syntax-string">[{stack.map((technology, index) => <span key={technology}><span className="stack-token">{JSON.stringify(technology)}{index < stack.length - 1 ? ',' : ''}</span>{index < stack.length - 1 ? ' ' : ''}</span>)}]</span></code></div>
      {!stack.length && <div className="editor-row"><span className="editor-line-number" aria-hidden="true">5</span><code className="editor-indent code-comment">// Add your verified technologies</code></div>}
      <div className="editor-row"><span className="editor-line-number" aria-hidden="true">{stack.length ? 5 : 6}</span><code>{'};'}</code></div>
    </div>
    <div className="editor-statusbar"><span>UTF-8</span><span><span className="status-dot" aria-hidden="true" /> JavaScript</span></div>
    {resumeData.projects.length > 0 && <a className="terminal-link" href="#projects"><span><span className="terminal-prompt" aria-hidden="true">❯</span> Explore projects</span><ArrowUpRight size={16} /></a>}
  </aside>;
}
