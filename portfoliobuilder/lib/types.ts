export type Role =
  | 'frontend'
  | 'backend'
  | 'data-engineer'
  | 'data-scientist'
  | 'fullstack'
  | 'devops'

export type TemplateId =
  | 'minimal'
  | 'developer-dark'
  | 'bold-visual'
  | 'timeline'

export interface Project {
  name: string
  description: string
  url?: string
  tech: string[]
}

export interface Experience {
  company: string
  role: string
  period: string
  bullets: string[]
}

export interface UserDetails {
  name: string
  title: string
  bio: string
  email: string
  github?: string
  linkedin?: string
  website?: string
  location?: string
  skills: string[]
  projects: Project[]
  experience: Experience[]
  education?: string
}

export interface BuilderState {
  step: number
  role: Role | null
  templateId: TemplateId | null
  details: UserDetails
  subdomain: string
  accentColor: string
  fontStyle: 'sans' | 'serif' | 'mono'
}
