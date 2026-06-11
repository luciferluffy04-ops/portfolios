import { UserDetails, TemplateId, Role } from './types'

interface GenerateOptions {
  details: UserDetails
  templateId: TemplateId
  role: Role
  accentColor: string
  fontStyle: 'sans' | 'serif' | 'mono'
}

export function generatePortfolioHTML(opts: GenerateOptions): string {
  const { details, templateId, accentColor, fontStyle } = opts

  const fontLink =
    fontStyle === 'mono'
      ? `<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">`
      : fontStyle === 'serif'
      ? `<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=Inter:wght@400;500&display=swap" rel="stylesheet">`
      : `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@700&display=swap" rel="stylesheet">`

  const bodyFont =
    fontStyle === 'mono' ? "'JetBrains Mono', monospace"
    : fontStyle === 'serif' ? "'Lora', Georgia, serif"
    : "'Inter', system-ui, sans-serif"

  const displayFont =
    fontStyle === 'mono' ? "'JetBrains Mono', monospace"
    : fontStyle === 'serif' ? "'Lora', Georgia, serif"
    : "'Sora', 'Inter', sans-serif"

  if (templateId === 'developer-dark') {
    return generateDarkTemplate(details, accentColor, bodyFont, displayFont, fontLink)
  }
  if (templateId === 'bold-visual') {
    return generateBoldTemplate(details, accentColor, bodyFont, displayFont, fontLink)
  }
  if (templateId === 'timeline') {
    return generateTimelineTemplate(details, accentColor, bodyFont, displayFont, fontLink)
  }
  // Default: minimal
  return generateMinimalTemplate(details, accentColor, bodyFont, displayFont, fontLink)
}

// ─────────────────────────────────────────────────────────────
// MINIMAL TEMPLATE
// ─────────────────────────────────────────────────────────────
function generateMinimalTemplate(
  d: UserDetails, accent: string, bodyFont: string, displayFont: string, fontLink: string
): string {
  const skillTags = d.skills.map(s =>
    `<span style="display:inline-block;padding:4px 14px;border-radius:20px;border:1px solid ${accent}33;color:${accent};font-size:13px;margin:3px">${s}</span>`
  ).join('')

  const projects = d.projects.filter(p => p.name).map(p => `
    <div style="border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin-bottom:16px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <h3 style="font-size:17px;font-weight:600;color:#111">${p.name}</h3>
        ${p.url ? `<a href="${p.url}" style="color:${accent};font-size:13px;text-decoration:none">View →</a>` : ''}
      </div>
      <p style="color:#6b7280;font-size:14px;line-height:1.7;margin-bottom:12px">${p.description}</p>
      <div>${p.tech.map(t => `<span style="font-size:12px;padding:3px 10px;background:${accent}11;color:${accent};border-radius:20px;margin-right:4px">${t}</span>`).join('')}</div>
    </div>
  `).join('')

  const experience = d.experience.filter(e => e.company).map(e => `
    <div style="margin-bottom:28px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
        <h3 style="font-size:16px;font-weight:600;color:#111">${e.role}</h3>
        <span style="font-size:13px;color:#9ca3af">${e.period}</span>
      </div>
      <p style="font-size:14px;color:${accent};margin-bottom:10px;font-weight:500">${e.company}</p>
      <ul style="padding-left:16px;margin:0">${e.bullets.map(b => `<li style="color:#6b7280;font-size:14px;line-height:1.7;margin-bottom:4px">${b}</li>`).join('')}</ul>
    </div>
  `).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.name} — Portfolio</title>
${fontLink}
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:${bodyFont};background:#fff;color:#111;line-height:1.6}
  a{color:inherit;text-decoration:none}
  .container{max-width:720px;margin:0 auto;padding:0 24px}
  nav{position:sticky;top:0;background:rgba(255,255,255,0.92);backdrop-filter:blur(8px);border-bottom:1px solid #f3f4f6;padding:16px 0;z-index:100}
  .nav-inner{display:flex;align-items:center;justify-content:space-between}
  .nav-logo{font-family:${displayFont};font-weight:700;font-size:18px;color:#111}
  .nav-links{display:flex;gap:24px;font-size:14px;color:#6b7280}
  .nav-links a:hover{color:${accent}}
  header{padding:96px 0 72px}
  .eyebrow{font-size:13px;color:${accent};font-weight:500;letter-spacing:.06em;text-transform:uppercase;margin-bottom:16px}
  h1{font-family:${displayFont};font-size:clamp(36px,5vw,56px);font-weight:700;line-height:1.1;color:#111;margin-bottom:20px}
  .bio{font-size:18px;color:#6b7280;line-height:1.7;max-width:540px;margin-bottom:32px}
  .cta-row{display:flex;gap:12px;flex-wrap:wrap}
  .btn{padding:12px 24px;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;transition:opacity .15s}
  .btn-primary{background:${accent};color:#fff;border:none}
  .btn-primary:hover{opacity:.88}
  .btn-outline{background:transparent;color:#111;border:1px solid #d1d5db}
  .btn-outline:hover{border-color:${accent};color:${accent}}
  section{padding:64px 0;border-top:1px solid #f3f4f6}
  .section-label{font-size:12px;color:#9ca3af;font-weight:500;letter-spacing:.1em;text-transform:uppercase;margin-bottom:32px}
  footer{padding:48px 0;border-top:1px solid #f3f4f6;text-align:center;font-size:13px;color:#9ca3af}
  @media(max-width:600px){.nav-links{display:none}header{padding:64px 0 48px}.bio{font-size:16px}}
</style>
</head>
<body>
<nav>
  <div class="container nav-inner">
    <span class="nav-logo">${d.name.split(' ')[0]}</span>
    <div class="nav-links">
      <a href="#work">Work</a>
      <a href="#experience">Experience</a>
      <a href="#contact">Contact</a>
    </div>
    ${d.email ? `<a href="mailto:${d.email}" class="btn btn-primary" style="padding:8px 18px;font-size:13px">Hire me</a>` : ''}
  </div>
</nav>

<div class="container">
  <header>
    <p class="eyebrow">${d.title || 'Developer'}</p>
    <h1>Hi, I'm ${d.name || 'Name'} 👋</h1>
    <p class="bio">${d.bio || 'Developer and builder. I create things for the web.'}</p>
    <div class="cta-row">
      ${d.github ? `<a href="${d.github}" class="btn btn-outline" target="_blank">GitHub</a>` : ''}
      ${d.linkedin ? `<a href="${d.linkedin}" class="btn btn-outline" target="_blank">LinkedIn</a>` : ''}
      ${d.email ? `<a href="mailto:${d.email}" class="btn btn-primary">Get in touch</a>` : ''}
    </div>
  </header>

  <section id="skills">
    <p class="section-label">Skills</p>
    <div>${skillTags}</div>
  </section>

  ${d.projects.some(p => p.name) ? `
  <section id="work">
    <p class="section-label">Featured work</p>
    ${projects}
  </section>` : ''}

  ${d.experience.some(e => e.company) ? `
  <section id="experience">
    <p class="section-label">Experience</p>
    ${experience}
  </section>` : ''}

  <section id="contact">
    <p class="section-label">Contact</p>
    <h2 style="font-family:${displayFont};font-size:32px;font-weight:700;margin-bottom:12px">Let's work together</h2>
    <p style="color:#6b7280;font-size:16px;margin-bottom:24px">Open to opportunities, collaborations, and interesting projects.</p>
    ${d.email ? `<a href="mailto:${d.email}" class="btn btn-primary" style="display:inline-block">${d.email}</a>` : ''}
  </section>
</div>

<footer>
  <p>Built with Portfol.io · ${new Date().getFullYear()}</p>
</footer>
</body>
</html>`
}

// ─────────────────────────────────────────────────────────────
// DEVELOPER DARK TEMPLATE
// ─────────────────────────────────────────────────────────────
function generateDarkTemplate(
  d: UserDetails, accent: string, bodyFont: string, _displayFont: string, fontLink: string
): string {
  const skills = d.skills.map(s =>
    `<span style="display:inline-block;padding:4px 12px;border-radius:6px;background:${accent}22;color:${accent};font-size:13px;border:1px solid ${accent}44;margin:3px;font-family:'JetBrains Mono',monospace">${s}</span>`
  ).join('')

  const projects = d.projects.filter(p => p.name).map((p, i) => `
    <div style="border:1px solid #2d3748;border-radius:8px;padding:24px;background:#1a202c;margin-bottom:12px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="color:${accent};font-family:monospace;font-size:13px">// project_${String(i + 1).padStart(2, '0')}</span>
      </div>
      <h3 style="font-size:18px;font-weight:600;color:#e2e8f0;margin-bottom:8px">${p.name}</h3>
      <p style="color:#718096;font-size:14px;line-height:1.7;margin-bottom:14px">${p.description}</p>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div>${p.tech.map(t => `<span style="font-size:11px;padding:2px 8px;background:#2d3748;color:#a0aec0;border-radius:4px;margin-right:4px">${t}</span>`).join('')}</div>
        ${p.url ? `<a href="${p.url}" style="color:${accent};font-size:13px">view →</a>` : ''}
      </div>
    </div>
  `).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.name} — Portfolio</title>
${fontLink}
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:${bodyFont};background:#0f1117;color:#e2e8f0;line-height:1.6}
  .container{max-width:760px;margin:0 auto;padding:0 24px}
  nav{padding:20px 0;border-bottom:1px solid #1a202c;position:sticky;top:0;background:#0f1117;z-index:100}
  .nav-inner{display:flex;align-items:center;justify-content:space-between}
  .nav-logo{font-family:'JetBrains Mono',monospace;font-size:15px;color:${accent}}
  .nav-links{display:flex;gap:24px;font-size:13px;color:#718096;font-family:'JetBrains Mono',monospace}
  .nav-links a:hover{color:${accent}}
  header{padding:80px 0 64px}
  .terminal-prompt{font-family:'JetBrains Mono',monospace;font-size:13px;color:#718096;margin-bottom:16px}
  .terminal-prompt span{color:${accent}}
  h1{font-family:'JetBrains Mono',monospace;font-size:clamp(28px,4vw,44px);font-weight:600;color:#e2e8f0;line-height:1.2;margin-bottom:16px}
  h1 em{color:${accent};font-style:normal}
  .bio{font-size:16px;color:#718096;line-height:1.7;max-width:520px;margin-bottom:28px}
  .links-row{display:flex;gap:12px;flex-wrap:wrap}
  .link-btn{display:flex;align-items:center;gap:6px;padding:9px 18px;border-radius:6px;font-size:13px;font-family:'JetBrains Mono',monospace;border:1px solid #2d3748;color:#a0aec0;background:transparent;text-decoration:none;transition:border-color .15s,color .15s}
  .link-btn:hover{border-color:${accent};color:${accent}}
  .link-btn.primary{background:${accent};border-color:${accent};color:#fff}
  section{padding:56px 0;border-top:1px solid #1a202c}
  .section-header{font-family:'JetBrains Mono',monospace;font-size:12px;color:#4a5568;margin-bottom:24px;letter-spacing:.08em}
  .section-header span{color:${accent}}
  footer{padding:40px 0;border-top:1px solid #1a202c;text-align:center;font-family:'JetBrains Mono',monospace;font-size:12px;color:#4a5568}
</style>
</head>
<body>
<nav>
  <div class="container nav-inner">
    <span class="nav-logo">~/${(d.name || 'portfolio').toLowerCase().replace(/\s/g, '-')}</span>
    <div class="nav-links">
      <a href="#projects">projects</a>
      <a href="#experience">experience</a>
      <a href="#contact">contact</a>
    </div>
  </div>
</nav>

<div class="container">
  <header>
    <p class="terminal-prompt"><span>❯</span> whoami</p>
    <h1>I'm <em>${d.name || 'Developer'}</em>,<br>${d.title || 'building for the web'}</h1>
    <p class="bio">${d.bio || 'Developer. Builder. Problem solver.'}</p>
    <div class="links-row">
      ${d.github ? `<a href="${d.github}" class="link-btn" target="_blank">GitHub</a>` : ''}
      ${d.linkedin ? `<a href="${d.linkedin}" class="link-btn" target="_blank">LinkedIn</a>` : ''}
      ${d.email ? `<a href="mailto:${d.email}" class="link-btn primary">Contact me</a>` : ''}
    </div>
  </header>

  <section id="skills">
    <p class="section-header"><span>//</span> skills &amp; tools</p>
    <div>${skills}</div>
  </section>

  ${d.projects.some(p => p.name) ? `
  <section id="projects">
    <p class="section-header"><span>//</span> projects</p>
    ${projects}
  </section>` : ''}

  ${d.experience.some(e => e.company) ? `
  <section id="experience">
    <p class="section-header"><span>//</span> experience</p>
    ${d.experience.filter(e => e.company).map((e, i) => `
      <div style="margin-bottom:24px;padding-left:16px;border-left:2px solid ${i === 0 ? accent : '#2d3748'}">
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <h3 style="font-size:16px;font-weight:600;color:#e2e8f0">${e.role}</h3>
          <span style="font-size:12px;color:#4a5568;font-family:'JetBrains Mono',monospace">${e.period}</span>
        </div>
        <p style="color:${accent};font-size:13px;margin:4px 0 10px;font-family:'JetBrains Mono',monospace">${e.company}</p>
        ${e.bullets.map(b => `<p style="color:#718096;font-size:14px;margin-bottom:4px">→ ${b}</p>`).join('')}
      </div>
    `).join('')}
  </section>` : ''}

  <section id="contact">
    <p class="section-header"><span>//</span> contact</p>
    <p style="font-family:'JetBrains Mono',monospace;font-size:15px;color:#a0aec0;margin-bottom:20px">let's build something together</p>
    ${d.email ? `<a href="mailto:${d.email}" class="link-btn primary" style="display:inline-flex">${d.email}</a>` : ''}
  </section>
</div>

<footer><p>// built with Portfol.io</p></footer>
</body>
</html>`
}

// ─────────────────────────────────────────────────────────────
// BOLD VISUAL TEMPLATE
// ─────────────────────────────────────────────────────────────
function generateBoldTemplate(
  d: UserDetails, accent: string, bodyFont: string, displayFont: string, fontLink: string
): string {
  const projects = d.projects.filter(p => p.name).map((p, i) => `
    <div style="background:${i % 2 === 0 ? accent + '0f' : '#fff'};border:1px solid ${accent}22;border-radius:16px;padding:32px">
      <h3 style="font-size:22px;font-weight:700;font-family:${displayFont};color:#111;margin-bottom:10px">${p.name}</h3>
      <p style="color:#6b7280;font-size:15px;line-height:1.7;margin-bottom:18px">${p.description}</p>
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
        <div>${p.tech.map(t => `<span style="font-size:12px;padding:4px 12px;background:${accent};color:#fff;border-radius:20px;margin-right:4px;font-weight:500">${t}</span>`).join('')}</div>
        ${p.url ? `<a href="${p.url}" style="font-size:14px;font-weight:600;color:${accent};text-decoration:none">View project →</a>` : ''}
      </div>
    </div>
  `).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.name} — Portfolio</title>
${fontLink}
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:${bodyFont};background:#fafafa;color:#111;line-height:1.6}
  .container{max-width:800px;margin:0 auto;padding:0 24px}
  nav{padding:20px 0;background:#fff;border-bottom:1px solid #f3f4f6;position:sticky;top:0;z-index:100}
  .nav-inner{display:flex;align-items:center;justify-content:space-between}
  .initials{width:36px;height:36px;border-radius:8px;background:${accent};color:#fff;font-weight:700;font-size:15px;display:flex;align-items:center;justify-content:center;font-family:${displayFont}}
  .nav-links{display:flex;gap:24px;font-size:14px;color:#9ca3af}
  .nav-links a:hover{color:${accent}}
  .hero{background:${accent};padding:80px 0 64px;margin-bottom:0}
  .hero h1{font-family:${displayFont};font-size:clamp(40px,6vw,68px);font-weight:700;color:#fff;line-height:1.05;margin-bottom:20px}
  .hero p{font-size:18px;color:${accent}bb;max-width:480px;line-height:1.6;margin-bottom:32px;color:rgba(255,255,255,.75)}
  .hero-links{display:flex;gap:12px}
  .hero-btn{padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none}
  .hero-btn-light{background:#fff;color:${accent}}
  .hero-btn-ghost{background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3)}
  section{padding:72px 0}
  .section-tag{display:inline-block;padding:4px 14px;background:${accent}15;color:${accent};border-radius:20px;font-size:12px;font-weight:600;letter-spacing:.05em;margin-bottom:20px;text-transform:uppercase}
  .section-title{font-family:${displayFont};font-size:32px;font-weight:700;color:#111;margin-bottom:32px}
  .projects-grid{display:grid;gap:16px}
  .skills-cloud{display:flex;flex-wrap:wrap;gap:10px}
  .skill-pill{padding:10px 20px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;font-size:14px;font-weight:500;color:#374151;transition:border-color .15s}
  .skill-pill:hover{border-color:${accent};color:${accent}}
  footer{padding:48px 0;background:#fff;border-top:1px solid #f3f4f6;text-align:center;font-size:13px;color:#9ca3af}
</style>
</head>
<body>
<nav>
  <div class="container nav-inner">
    <div class="initials">${(d.name || 'P').split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
    <div class="nav-links">
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </div>
    ${d.email ? `<a href="mailto:${d.email}" style="font-size:13px;font-weight:600;color:${accent};text-decoration:none">Hire me →</a>` : ''}
  </div>
</nav>

<div class="hero">
  <div class="container">
    <h1>${d.name || 'Your Name'}</h1>
    <p>${d.bio || d.title || 'Developer and creator.'}</p>
    <div class="hero-links">
      ${d.email ? `<a href="mailto:${d.email}" class="hero-btn hero-btn-light">Get in touch</a>` : ''}
      ${d.github ? `<a href="${d.github}" class="hero-btn hero-btn-ghost" target="_blank">GitHub</a>` : ''}
    </div>
  </div>
</div>

<div class="container">
  ${d.skills.length > 0 ? `
  <section id="about">
    <span class="section-tag">Skills</span>
    <div class="skills-cloud">
      ${d.skills.map(s => `<div class="skill-pill">${s}</div>`).join('')}
    </div>
  </section>` : ''}

  ${d.projects.some(p => p.name) ? `
  <section id="projects">
    <span class="section-tag">Work</span>
    <h2 class="section-title">Featured projects</h2>
    <div class="projects-grid">${projects}</div>
  </section>` : ''}

  ${d.experience.some(e => e.company) ? `
  <section id="experience">
    <span class="section-tag">Career</span>
    <h2 class="section-title">Experience</h2>
    ${d.experience.filter(e => e.company).map(e => `
      <div style="padding:24px;background:#fff;border-radius:12px;margin-bottom:12px;border:1px solid #f3f4f6">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
          <h3 style="font-size:17px;font-weight:700;font-family:${displayFont}">${e.role}</h3>
          <span style="font-size:13px;color:#9ca3af">${e.period}</span>
        </div>
        <p style="color:${accent};font-weight:600;font-size:14px;margin-bottom:10px">${e.company}</p>
        <ul style="padding-left:16px">${e.bullets.map(b => `<li style="color:#6b7280;font-size:14px;margin-bottom:4px;line-height:1.6">${b}</li>`).join('')}</ul>
      </div>
    `).join('')}
  </section>` : ''}

  <section id="contact" style="text-align:center;padding:80px 0">
    <span class="section-tag">Contact</span>
    <h2 style="font-family:${displayFont};font-size:40px;font-weight:700;color:#111;margin:16px 0 12px">Ready to work together?</h2>
    <p style="color:#9ca3af;font-size:16px;margin-bottom:32px">Let's discuss your next project.</p>
    ${d.email ? `<a href="mailto:${d.email}" style="display:inline-block;padding:16px 40px;background:${accent};color:#fff;border-radius:10px;font-size:16px;font-weight:700;text-decoration:none;font-family:${displayFont}">${d.email}</a>` : ''}
  </section>
</div>

<footer>Built with Portfol.io · ${new Date().getFullYear()}</footer>
</body>
</html>`
}

// ─────────────────────────────────────────────────────────────
// TIMELINE TEMPLATE
// ─────────────────────────────────────────────────────────────
function generateTimelineTemplate(
  d: UserDetails, accent: string, bodyFont: string, displayFont: string, fontLink: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.name} — Portfolio</title>
${fontLink}
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:${bodyFont};background:#fff;color:#111;line-height:1.6}
  .container{max-width:680px;margin:0 auto;padding:0 24px}
  nav{padding:20px 0;border-bottom:1px solid #f3f4f6;position:sticky;top:0;background:rgba(255,255,255,.95);backdrop-filter:blur(8px);z-index:100}
  .nav-inner{display:flex;align-items:center;justify-content:space-between}
  .nav-name{font-family:${displayFont};font-size:16px;font-weight:700}
  .nav-links{display:flex;gap:20px;font-size:13px;color:#9ca3af}
  .nav-links a:hover{color:${accent}}
  header{padding:80px 0 64px;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center}
  .header-text h1{font-family:${displayFont};font-size:clamp(32px,4vw,48px);font-weight:700;color:#111;margin-bottom:8px}
  .header-text p{font-size:16px;color:${accent};font-weight:500;margin-bottom:16px}
  .header-text .bio{font-size:15px;color:#6b7280;line-height:1.7;max-width:440px}
  .avatar-block{text-align:center}
  .avatar{width:80px;height:80px;border-radius:50%;background:${accent}22;border:3px solid ${accent}33;display:flex;align-items:center;justify-content:center;font-family:${displayFont};font-size:28px;font-weight:700;color:${accent}}
  .contact-chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px}
  .chip{display:flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;border:1px solid #e5e7eb;font-size:13px;color:#6b7280;text-decoration:none}
  .chip:hover{border-color:${accent};color:${accent}}
  .timeline-section{padding:48px 0;border-top:1px solid #f3f4f6}
  .timeline-label{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af;margin-bottom:28px}
  .timeline{position:relative;padding-left:24px}
  .timeline::before{content:'';position:absolute;left:4px;top:0;bottom:0;width:1px;background:#e5e7eb}
  .timeline-item{position:relative;margin-bottom:28px;padding-left:20px}
  .timeline-item::before{content:'';position:absolute;left:-20px;top:6px;width:8px;height:8px;border-radius:50%;background:${accent};border:2px solid #fff;box-shadow:0 0 0 1px ${accent}}
  .timeline-item h3{font-size:16px;font-weight:600;color:#111;margin-bottom:2px}
  .timeline-item .meta{font-size:13px;color:${accent};font-weight:500}
  .timeline-item .period{font-size:12px;color:#9ca3af;margin-bottom:8px}
  .timeline-item p{font-size:14px;color:#6b7280;line-height:1.6}
  .skills-wrap{display:flex;flex-wrap:wrap;gap:8px}
  .s-tag{padding:6px 14px;border-radius:6px;background:#f9fafb;border:1px solid #f3f4f6;font-size:13px;color:#374151}
  footer{padding:40px 0;border-top:1px solid #f3f4f6;text-align:center;font-size:13px;color:#d1d5db}
  @media(max-width:540px){header{grid-template-columns:1fr}.avatar-block{display:none}}
</style>
</head>
<body>
<nav>
  <div class="container nav-inner">
    <span class="nav-name">${d.name || 'Portfolio'}</span>
    <div class="nav-links">
      <a href="#timeline">Career</a>
      <a href="#projects">Projects</a>
    </div>
    ${d.email ? `<a href="mailto:${d.email}" style="font-size:13px;color:${accent};font-weight:500;text-decoration:none">Say hello →</a>` : ''}
  </div>
</nav>

<div class="container">
  <header>
    <div class="header-text">
      <h1>${d.name || 'Your Name'}</h1>
      <p>${d.title || 'Developer'}</p>
      <p class="bio">${d.bio || 'Developer and builder.'}</p>
      <div class="contact-chips">
        ${d.location ? `<span class="chip">${d.location}</span>` : ''}
        ${d.github ? `<a href="${d.github}" class="chip" target="_blank">GitHub</a>` : ''}
        ${d.linkedin ? `<a href="${d.linkedin}" class="chip" target="_blank">LinkedIn</a>` : ''}
      </div>
    </div>
    <div class="avatar-block">
      <div class="avatar">${(d.name || 'P').split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
    </div>
  </header>

  ${d.experience.some(e => e.company) ? `
  <div class="timeline-section" id="timeline">
    <p class="timeline-label">Career</p>
    <div class="timeline">
      ${d.experience.filter(e => e.company).map(e => `
        <div class="timeline-item">
          <h3>${e.role}</h3>
          <p class="meta">${e.company}</p>
          <p class="period">${e.period}</p>
          ${e.bullets.map(b => `<p>• ${b}</p>`).join('')}
        </div>
      `).join('')}
    </div>
  </div>` : ''}

  ${d.projects.some(p => p.name) ? `
  <div class="timeline-section" id="projects">
    <p class="timeline-label">Projects</p>
    <div class="timeline">
      ${d.projects.filter(p => p.name).map(p => `
        <div class="timeline-item">
          <h3>${p.name}</h3>
          <p class="period">${p.tech.join(' · ')}</p>
          <p>${p.description}</p>
          ${p.url ? `<a href="${p.url}" style="font-size:13px;color:${accent};text-decoration:none;margin-top:6px;display:inline-block">View →</a>` : ''}
        </div>
      `).join('')}
    </div>
  </div>` : ''}

  ${d.skills.length > 0 ? `
  <div class="timeline-section">
    <p class="timeline-label">Skills</p>
    <div class="skills-wrap">
      ${d.skills.map(s => `<span class="s-tag">${s}</span>`).join('')}
    </div>
  </div>` : ''}

  ${d.email ? `
  <div class="timeline-section" id="contact">
    <p class="timeline-label">Contact</p>
    <h2 style="font-family:${displayFont};font-size:28px;font-weight:700;margin-bottom:12px">Want to connect?</h2>
    <a href="mailto:${d.email}" style="color:${accent};font-size:16px;font-weight:500;text-decoration:none">${d.email}</a>
  </div>` : ''}
</div>

<footer>Built with Portfol.io</footer>
</body>
</html>`
}
