import { UserDetails } from './types'

export function parseResumeText(text: string): Partial<UserDetails> {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)

  const result: Partial<UserDetails> = {
    skills: [],
    projects: [],
    experience: [],
  }

  // Extract email
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}/i)
  if (emailMatch) result.email = emailMatch[0]

  // Extract GitHub
  const githubMatch = text.match(/github\.com\/[\w-]+/i)
  if (githubMatch) result.github = 'https://' + githubMatch[0]

  // Extract LinkedIn
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i)
  if (linkedinMatch) result.linkedin = 'https://' + linkedinMatch[0]

  // Extract phone (not stored but skip detection)

  // Name heuristic: first non-empty line that's not an email/url and short
  for (const line of lines) {
    if (
      !line.includes('@') &&
      !line.includes('http') &&
      !line.includes('github') &&
      !line.includes('linkedin') &&
      line.split(' ').length <= 5 &&
      line.length > 2 &&
      line.length < 50 &&
      /^[A-Za-z\s.'-]+$/.test(line)
    ) {
      result.name = line
      break
    }
  }

  // Title heuristic: look for common role keywords
  const titleKeywords = [
    'engineer', 'developer', 'designer', 'scientist', 'analyst',
    'manager', 'lead', 'architect', 'consultant', 'specialist'
  ]
  for (const line of lines.slice(0, 10)) {
    const lower = line.toLowerCase()
    if (titleKeywords.some(k => lower.includes(k)) && line.length < 80) {
      result.title = line
      break
    }
  }

  // Skills: look for section headers then collect comma/bullet separated items
  const skillsSection = extractSection(text, ['skills', 'technologies', 'tech stack', 'tools'])
  if (skillsSection) {
    const raw = skillsSection
      .replace(/skills|technologies|tech stack|tools/gi, '')
      .split(/[,\n•\|\/·–—]/)
      .map(s => s.trim())
      .filter(s => s.length > 1 && s.length < 30 && !/^\d+$/.test(s))
    result.skills = [...new Set(raw)].slice(0, 16)
  }

  // Experience: look for work experience section
  const expSection = extractSection(text, ['experience', 'employment', 'work history'])
  if (expSection) {
    const expBlocks = expSection.split(/\n{2,}/)
    result.experience = expBlocks
      .slice(0, 3)
      .map(block => {
        const blines = block.split('\n').map(l => l.trim()).filter(Boolean)
        return {
          company: blines[0] || '',
          role: blines[1] || '',
          period: blines.find(l => /\d{4}/.test(l)) || '',
          bullets: blines.slice(2, 5).filter(l => l.length > 10),
        }
      })
      .filter(e => e.company.length > 0)
  }

  // Projects: look for projects section
  const projSection = extractSection(text, ['projects', 'portfolio', 'personal projects'])
  if (projSection) {
    const projBlocks = projSection.split(/\n{2,}/)
    result.projects = projBlocks
      .slice(0, 3)
      .map(block => {
        const blines = block.split('\n').map(l => l.trim()).filter(Boolean)
        return {
          name: blines[0] || '',
          description: blines.slice(1).join(' ').substring(0, 200),
          tech: [],
          url: '',
        }
      })
      .filter(p => p.name.length > 0)
  }

  // Bio: look for summary section
  const bioSection = extractSection(text, ['summary', 'objective', 'about', 'profile'])
  if (bioSection) {
    result.bio = bioSection
      .replace(/summary|objective|about|profile/gi, '')
      .trim()
      .substring(0, 300)
  }

  return result
}

function extractSection(text: string, headers: string[]): string | null {
  const lower = text.toLowerCase()
  for (const header of headers) {
    const idx = lower.indexOf(header)
    if (idx === -1) continue
    // Find start after header line
    const afterHeader = text.indexOf('\n', idx)
    if (afterHeader === -1) continue
    // Find next section (another header-like line)
    const nextSection = lower.indexOf('\n\n', afterHeader + 1)
    const end = nextSection > 0 ? nextSection : afterHeader + 1000
    return text.slice(afterHeader, end).trim()
  }
  return null
}
