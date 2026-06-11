import { Role, TemplateId } from './types'

export const ROLES: {
  id: Role
  label: string
  description: string
  icon: string
  defaultSkills: string[]
  accent: string
}[] = [
  {
    id: 'frontend',
    label: 'Frontend developer',
    description: 'React, Vue, animations, UI/UX',
    icon: 'Code2',
    defaultSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'CSS', 'Figma'],
    accent: '#534AB7',
  },
  {
    id: 'backend',
    label: 'Backend developer',
    description: 'APIs, databases, architecture',
    icon: 'Server',
    defaultSkills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'REST'],
    accent: '#0F6E56',
  },
  {
    id: 'data-engineer',
    label: 'Data engineer',
    description: 'Pipelines, ETL, warehousing',
    icon: 'Database',
    defaultSkills: ['Spark', 'Airflow', 'dbt', 'Snowflake', 'Python', 'SQL'],
    accent: '#854F0B',
  },
  {
    id: 'data-scientist',
    label: 'Data scientist',
    description: 'ML models, notebooks, research',
    icon: 'BarChart3',
    defaultSkills: ['Python', 'PyTorch', 'scikit-learn', 'pandas', 'SQL', 'R'],
    accent: '#993C1D',
  },
  {
    id: 'fullstack',
    label: 'Full stack developer',
    description: 'End-to-end, frontend + backend',
    icon: 'Layers',
    defaultSkills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker', 'AWS'],
    accent: '#185FA5',
  },
  {
    id: 'devops',
    label: 'DevOps / Cloud engineer',
    description: 'CI/CD, infra, Kubernetes',
    icon: 'Cloud',
    defaultSkills: ['Kubernetes', 'Terraform', 'AWS', 'GitHub Actions', 'Docker', 'Linux'],
    accent: '#993556',
  },
]

export const TEMPLATES: {
  id: TemplateId
  name: string
  description: string
  badge?: string
  badgeColor?: string
}[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, text-first, lots of whitespace',
    badge: 'Popular',
    badgeColor: '#0F6E56',
  },
  {
    id: 'developer-dark',
    name: 'Developer dark',
    description: 'Terminal-inspired, code aesthetic',
    badge: 'New',
    badgeColor: '#534AB7',
  },
  {
    id: 'bold-visual',
    name: 'Bold visual',
    description: 'Project-focused, big cards, vivid',
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Career story, experience-led',
  },
]

export const ACCENT_COLORS = [
  { label: 'Violet',  value: '#534AB7' },
  { label: 'Teal',    value: '#0F6E56' },
  { label: 'Coral',   value: '#D85A30' },
  { label: 'Blue',    value: '#185FA5' },
  { label: 'Rose',    value: '#993556' },
  { label: 'Amber',   value: '#854F0B' },
]

export const DEFAULT_DETAILS = {
  name: '',
  title: '',
  bio: '',
  email: '',
  github: '',
  linkedin: '',
  website: '',
  location: '',
  skills: [],
  projects: [
    { name: '', description: '', url: '', tech: [] },
    { name: '', description: '', url: '', tech: [] },
  ],
  experience: [
    { company: '', role: '', period: '', bullets: [''] },
  ],
  education: '',
}
