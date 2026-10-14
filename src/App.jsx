import React, { useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Code2, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, X, Layers3, ShieldCheck, Sparkles, TerminalSquare } from 'lucide-react';
import { config } from './config.js';
import { projects } from './data.js';

const isConfigured = config.githubUsername !== 'YOUR_GITHUB_USERNAME';
const repositoryUrl = (slug) => isConfigured ? `https://github.com/${config.githubUsername}/${slug}` : null;
const profile = config.profile || {};

function formatExperience(startDate) {
  if (!startDate) return 'Add your experience';
  const start = new Date(startDate);
  if (Number.isNaN(start.getTime())) return 'Add your experience';

  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const hasNotReachedAnniversary = now.getMonth() < start.getMonth() || (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
  if (hasNotReachedAnniversary) years -= 1;
  if (years <= 0) return '<1 year';
  return `${years}+ year${years > 1 ? 's' : ''}`;
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [['Work', '#work'], ['Expertise', '#expertise'], ['About', '#about'], ['Contact', '#contact']];
  return <header className="site-header">
    <div className="shell header-inner">
      <a className="brand" href="#top" aria-label="Ahmad Darwish home"><span className="brand-mark">AD<span>.</span></span><span className="brand-caption">software engineer</span></a>
      <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        {nav.map(([name, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{name}</a>)}
        <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="nav-linkedin">LinkedIn <ArrowUpRight size={15}/></a>
      </nav>
      <button aria-label={open ? 'Close navigation' : 'Open navigation'} className="mobile-toggle" aria-expanded={open} onClick={()=>setOpen(!open)}>{open ? <X size={24}/> : <Menu size={24}/>}</button>
    </div>
  </header>;
}
function Label({children}) { return <div className="section-kicker"><span className="kicker-line"/>{children}</div> }

function Hero() {
  const heroStats = [
    { label: 'Experience', value: formatExperience(profile.companyStartDate) },
    { label: 'Current company', value: profile.company || 'Add your company' },
    { label: 'Role', value: profile.title || 'Add your role' },
    { label: 'Education', value: profile.education || 'Add your education' },
  ];

  return <section className="hero shell" id="top">
    <div className="hero-grid">
      <div className="hero-content">
        <div className="availability"><span className="status-dot"/> SOFTWARE ENGINEER · NODE.JS & REACT</div>
        <h1><span className="hero-name">{profile.name || 'Ahmad Darwish'}</span>Engineering software<br/>that <span>solves problems.</span></h1>
        <p className="hero-description">I'm <strong>{profile.name || 'Ahmad Darwish'}</strong>, a software engineer building web applications, business software, and AI integrations. My primary focus is <strong>Node.js</strong> and <strong>React</strong> — with hands-on experience developing commercial products.</p>
        <div className="hero-actions"><a className="btn btn-primary" href="#work">Explore projects <ArrowUpRight size={18}/></a><a className="btn btn-secondary" href={config.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <ArrowUpRight size={17}/></a></div>
        <dl className="hero-stats" aria-label="Professional summary">
          {heroStats.map(stat => <div className="hero-stat" key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}
        </dl>
        <div className="hero-details"><span><MapPin size={15}/>{config.location}</span><span className="detail-sep"/><span>{`Working at ${profile.company || 'Alkhazen Soft'} since Aug 2025`}</span></div>
      </div>
      <div className="hero-visual" aria-label="Abstract illustration of software engineering and AI-enabled business systems">
        <div className="grid-dots"/>
        <div className="visual-orbit visual-orbit-one"/><div className="visual-orbit visual-orbit-two"/>
        <div className="visual-card visual-code"><span className="tiny-label"><TerminalSquare size={14}/> ENGINEERING / FOCUS</span><div className="code-line"><i>const</i> stack = &#123;</div><div className="code-line indent">backend: <b>'Node.js'</b>,</div><div className="code-line indent">frontend: <b>'React'</b>,</div><div className="code-line indent">specialty: <b>'AI integration'</b></div><div className="code-line">&#125;;</div><div className="code-footer"><span/><span/><span/></div></div>
        <div className="visual-mini mini-top"><Sparkles size={18}/><div><strong>AI + Business</strong><small>Practical integrations</small></div></div>
        <div className="visual-mini mini-bottom"><Layers3 size={17}/><div><strong>4 featured systems</strong><small>Products & collaborations</small></div></div>
        <div className="visual-glow"/>
      </div>
    </div>
  </section>;
}

function ProjectCard({project}) {
  const link = repositoryUrl(project.repository);
  return <article className={`project-card ${project.accent}`}>
    <div className="project-art" aria-hidden="true"><div className="art-ring one"/><div className="art-ring two"/><div className="art-line"/><span className="project-symbol">{project.symbol}</span><span className="art-corner">{project.number} / 04</span></div>
    <div className="project-content">
      <div className="project-eyebrow">{project.eyebrow}</div>
      <div className="project-name-row"><h3>{project.name}</h3><span className="project-number">{project.number}</span></div>
      <p className="project-summary">{project.description}</p>
      <div className="project-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
      <div className="project-footer"><span className="project-type"><ShieldCheck size={15}/>{project.type}</span>{link ? <a href={link} target="_blank" rel="noopener noreferrer" className="case-link">Case study <ArrowUpRight size={16}/></a> : <span className="case-link disabled" title="Configure your GitHub username in src/config.js">Case study soon <ArrowUpRight size={16}/></span>}</div>
    </div>
  </article>;
}
function Projects() {
  const [filter, setFilter] = useState('all');
  const visible = projects.filter(p => filter === 'all' || p.category===filter);
  return <section className="section projects-section" id="work"><div className="shell"><Label>01 / SELECTED WORK</Label>
    <div className="section-head"><div><h2>Built for real-world <em>workflows.</em></h2><p>A selection of commercial projects. Source code is private; public case studies describe purpose, features, and my contribution.</p></div><div className="project-filter" role="group" aria-label="Filter projects">{[['all','All projects'],['ai','AI systems'],['apps','Applications']].map(([id,label])=><button type="button" aria-pressed={filter===id} className={filter===id ? 'active':''} key={id} onClick={()=>setFilter(id)}>{label}</button>)}</div></div>
    <div className="project-grid">{visible.map(p=><ProjectCard project={p} key={p.id}/>)}</div>
    <div className="privacy-note"><ShieldCheck size={17}/><span>Commercial confidentiality matters. These are public-facing summaries, not source code or internal implementation documentation.</span></div>
  </div></section>;
}
function Expertise() {
  return <section className="section expertise-section" id="expertise"><div className="shell"><Label>02 / WHAT I DO</Label><div className="section-head"><div><h2>Web engineering.<br/><em>Business thinking.</em></h2><p>My strongest tools are Node.js and React, supported by experience with databases, integrations, and applied AI.</p></div></div>
    <div className="expertise-grid">
      <div className="expertise-tile main-tile"><div className="expertise-icon"><Code2 size={22}/></div><span className="skill-index">01 / PRIMARY FOCUS</span><h3>Full-stack development</h3><p>Building maintainable web interfaces, backend services, and API-driven business workflows.</p><div className="skill-badges"><span>Node.js</span><span>React</span><span>JavaScript</span><span>REST APIs</span></div></div>
      <div className="expertise-tile"><div className="expertise-icon alt"><Layers3 size={22}/></div><span className="skill-index">02 / DATA SYSTEMS</span><h3>Databases & integrations</h3><p>Connecting software workflows with business data and existing operational systems.</p><div className="skill-badges"><span>SQL Server</span><span>MySQL</span><span>MongoDB</span></div></div>
      <div className="expertise-tile"><div className="expertise-icon third"><Sparkles size={22}/></div><span className="skill-index">03 / ADDITIONAL EXPERIENCE</span><h3>Applied AI</h3><p>Developing AI-assisted interactions with business data and domain-specific knowledge. FastAPI for smaller Python services.</p><div className="skill-badges"><span>AI Integration</span><span>RAG</span><span>FastAPI</span></div></div>
      <div className="expertise-tile"><div className="expertise-icon"><ArrowDownRight size={22}/></div><span className="skill-index">04 / AUTOMATION</span><h3>n8n workflow automation</h3><p>Designing n8n workflows that automate operations and connect services through reliable API integrations.</p><div className="skill-badges"><span>n8n</span><span>Workflow Automation</span><span>Service Integration</span><span>API Orchestration</span></div></div>
    </div>
  </div></section>;
}
function About() {
  return <section className="section about-section" id="about"><div className="shell"><Label>03 / MY BACKGROUND</Label><div className="about-grid"><div><h2>Developer by practice.<br/><em>Engineer in progress.</em></h2><p className="about-description">I combine professional software work with ongoing university studies. I enjoy turning demanding business requirements into usable systems — and learning through building, testing, and improving real applications.</p><a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="inline-link">See professional profile <ArrowUpRight size={17}/></a></div>
    <div className="timeline"><div className="timeline-item"><span className="timeline-marker"/><div className="timeline-date">AUG 2025 — PRESENT</div><h3>{profile.title || 'Software Engineer'}</h3><p>{profile.company || 'Alkhazen Soft'}</p><small>Software development and business-system integrations</small></div><div className="timeline-item"><span className="timeline-marker"/><div className="timeline-date">NOV 2024 — EXPECTED SEP 2028</div><h3>{profile.education || 'Add your education'}</h3><p>Yarmouk Private University</p><small>Computer Software Engineering</small></div></div></div></div></section>;
}
function Contact() {
  return <section className="contact-section" id="contact"><div className="shell contact-wrap"><div className="contact-glow"/><Label>04 / LET'S CONNECT</Label><h2>Let's build something <em>useful.</em></h2><p>Interested in Node.js, React, backend development, or practical AI solutions? I'd be glad to connect.</p><div className="contact-actions"><a href={`mailto:${config.email}`} className="btn btn-light"><Mail size={18}/> Email me <ArrowUpRight size={18}/></a><a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><Linkedin size={18}/> LinkedIn <ArrowUpRight size={18}/></a></div></div></section>;
}
export function App() {
  return <><a className="skip-link" href="#work">Skip to projects</a><Header/><main><Hero/><Projects/><Expertise/><About/><Contact/></main><footer><div className="shell footer-inner"><div><strong>AD<span>.</span></strong> <span>© {new Date().getFullYear()} Ahmad Darwish. Project source code remains private.</span></div><a href="#top">Back to top <ArrowRight size={14}/></a></div></footer></>;
}
