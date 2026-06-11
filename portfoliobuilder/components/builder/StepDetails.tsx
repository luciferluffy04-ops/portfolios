'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, X, Plus } from 'lucide-react'
import { useBuilder } from './BuilderContext'
import { ResumeUpload } from './ResumeUpload'
import { ROLES } from '@/lib/constants'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}

const inputCls = "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white placeholder-gray-300 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-200 transition"

export function StepDetails() {
  const { state, setDetails, goNext, goBack } = useBuilder()
  const { details } = state
  const [newSkill, setNewSkill] = useState('')
  const roleData = ROLES.find(r => r.id === state.role)

  function updateField(key: string, value: string) {
    setDetails({ [key]: value } as any)
  }

  function addSkill() {
    const s = newSkill.trim()
    if (s && !details.skills.includes(s)) {
      setDetails({ skills: [...details.skills, s] })
    }
    setNewSkill('')
  }

  function removeSkill(skill: string) {
    setDetails({ skills: details.skills.filter(s => s !== skill) })
  }

  function updateProject(i: number, key: string, value: string) {
    const projects = [...details.projects]
    projects[i] = { ...projects[i], [key]: value }
    setDetails({ projects })
  }

  function updateProjectTech(i: number, value: string) {
    const projects = [...details.projects]
    projects[i] = { ...projects[i], tech: value.split(',').map(t => t.trim()).filter(Boolean) }
    setDetails({ projects })
  }

  function updateExp(i: number, key: string, value: string) {
    const experience = [...details.experience]
    experience[i] = { ...experience[i], [key]: value }
    setDetails({ experience })
  }

  // Pre-fill skills from role defaults if empty
  function handleFocusSkills() {
    if (details.skills.length === 0 && roleData?.defaultSkills) {
      setDetails({ skills: roleData.defaultSkills })
    }
  }

  return (
    <div className="animate-fade-up">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Add your details</h2>
      <p className="text-sm text-gray-500 mb-6">
        Upload your resume to auto-fill, or type everything in below.
      </p>

      {/* Resume upload */}
      <div className="mb-6">
        <ResumeUpload />
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs text-gray-400">or fill in manually</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left col */}
        <div className="flex flex-col gap-4">
          <Field label="Full name">
            <input className={inputCls} placeholder="Alex Johnson"
              value={details.name} onChange={e => updateField('name', e.target.value)} />
          </Field>
          <Field label="Job title">
            <input className={inputCls} placeholder="Senior Frontend Developer"
              value={details.title} onChange={e => updateField('title', e.target.value)} />
          </Field>
          <Field label="Short bio">
            <textarea className={inputCls} rows={3} placeholder="I build fast, accessible web apps…"
              value={details.bio} onChange={e => updateField('bio', e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Email">
              <input className={inputCls} placeholder="you@example.com" type="email"
                value={details.email} onChange={e => updateField('email', e.target.value)} />
            </Field>
            <Field label="Location">
              <input className={inputCls} placeholder="London, UK"
                value={details.location || ''} onChange={e => updateField('location', e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="GitHub URL">
              <input className={inputCls} placeholder="github.com/user"
                value={details.github || ''} onChange={e => updateField('github', e.target.value)} />
            </Field>
            <Field label="LinkedIn URL">
              <input className={inputCls} placeholder="linkedin.com/in/user"
                value={details.linkedin || ''} onChange={e => updateField('linkedin', e.target.value)} />
            </Field>
          </div>

          {/* Skills */}
          <Field label="Skills">
            <div className="flex flex-wrap gap-1.5 p-2 min-h-[40px] rounded-lg border border-gray-200 bg-white" onFocus={handleFocusSkills}>
              {details.skills.map(s => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200"
                >
                  {s}
                  <button onClick={() => removeSkill(s)} className="hover:text-red-400 transition-colors">
                    <X size={10} />
                  </button>
                </span>
              ))}
              <input
                className="flex-1 min-w-[100px] text-xs outline-none bg-transparent placeholder-gray-300 px-1"
                placeholder="Type skill, press Enter"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                onBlur={addSkill}
              />
            </div>
            {details.skills.length === 0 && roleData && (
              <button
                onClick={() => setDetails({ skills: roleData.defaultSkills })}
                className="text-xs text-brand-500 hover:text-brand-700 text-left mt-0.5"
              >
                + Fill with suggested {roleData.label} skills
              </button>
            )}
          </Field>
        </div>

        {/* Right col */}
        <div className="flex flex-col gap-5">
          {/* Projects */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Featured projects</p>
            {details.projects.slice(0, 3).map((p, i) => (
              <div key={i} className="mb-4 p-3 rounded-xl border border-gray-100 bg-gray-50 flex flex-col gap-2">
                <div className="text-xs font-semibold text-gray-400 mb-1">Project {i + 1}</div>
                <input className={inputCls} placeholder="Project name"
                  value={p.name} onChange={e => updateProject(i, 'name', e.target.value)} />
                <textarea className={inputCls} rows={2} placeholder="What did you build? What was the impact?"
                  value={p.description} onChange={e => updateProject(i, 'description', e.target.value)} />
                <input className={inputCls} placeholder="Tech used (comma separated): React, Node.js"
                  value={p.tech.join(', ')} onChange={e => updateProjectTech(i, e.target.value)} />
                <input className={inputCls} placeholder="Live URL (optional)"
                  value={p.url || ''} onChange={e => updateProject(i, 'url', e.target.value)} />
              </div>
            ))}
          </div>

          {/* Experience */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Experience</p>
            {details.experience.slice(0, 2).map((e, i) => (
              <div key={i} className="mb-4 p-3 rounded-xl border border-gray-100 bg-gray-50 flex flex-col gap-2">
                <div className="text-xs font-semibold text-gray-400 mb-1">Role {i + 1}</div>
                <div className="grid grid-cols-2 gap-2">
                  <input className={inputCls} placeholder="Company"
                    value={e.company} onChange={ev => updateExp(i, 'company', ev.target.value)} />
                  <input className={inputCls} placeholder="Period (2022–2024)"
                    value={e.period} onChange={ev => updateExp(i, 'period', ev.target.value)} />
                </div>
                <input className={inputCls} placeholder="Your role / title"
                  value={e.role} onChange={ev => updateExp(i, 'role', ev.target.value)} />
                <textarea className={inputCls} rows={2} placeholder="Key achievements (one per line)"
                  value={e.bullets.join('\n')}
                  onChange={ev => {
                    const experience = [...details.experience]
                    experience[i] = { ...experience[i], bullets: ev.target.value.split('\n') }
                    setDetails({ experience })
                  }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-5 mt-2 border-t border-gray-100">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <button
          onClick={goNext}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          Preview portfolio <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
