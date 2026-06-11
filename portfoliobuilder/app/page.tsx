'use client'

import Link from 'next/link'
import { ArrowRight, Code2, Server, Database, BarChart3, Layers, Cloud, Zap, Upload, Eye } from 'lucide-react'

const ROLES = [
  { icon: Code2,     label: 'Frontend dev',   color: '#534AB7', bg: '#EEEDFE' },
  { icon: Server,    label: 'Backend dev',    color: '#0F6E56', bg: '#E1F5EE' },
  { icon: Database,  label: 'Data engineer',  color: '#854F0B', bg: '#FAEEDA' },
  { icon: BarChart3, label: 'Data scientist', color: '#993C1D', bg: '#FAECE7' },
  { icon: Layers,    label: 'Full stack',     color: '#185FA5', bg: '#E6F1FB' },
  { icon: Cloud,     label: 'DevOps / Cloud', color: '#993556', bg: '#FBEAF0' },
]

const STEPS = [
  { icon: Layers, n: '01', title: 'Pick your role',        desc: 'Choose from 6 developer roles. Each unlocks templates designed specifically for your field.' },
  { icon: Upload, n: '02', title: 'Add your details',      desc: 'Upload your resume and we extract everything automatically, or fill in the form yourself.' },
  { icon: Eye,    n: '03', title: 'Preview and customise', desc: 'See your portfolio live. Change accent colour, font, and layout until it feels like you.' },
  { icon: Zap,    n: '04', title: 'Publish in one click',  desc: 'Go live instantly. Or download the HTML and self-host anywhere.' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
              <Layers size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-gray-900 text-sm">Portfol.io</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <a href="#how" className="hover:text-gray-900 transition-colors">How it works</a>
            <a href="#roles" className="hover:text-gray-900 transition-colors">Roles</a>
            <Link href="/login" className="hover:text-gray-900 transition-colors">Sign in</Link>
          </div>
          <Link
            href="/register"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            Get started free <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-sm font-medium mb-8">
          <Zap size={13} />
          Portfolio ready in under 5 minutes
        </div>
        <h1 className="font-display font-bold text-5xl md:text-7xl text-gray-900 leading-tight mb-6">
          Your portfolio,<br />
          <span className="text-brand-600">built for your role</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
          Upload your resume. Pick a template tailored to your role.
          Get a polished portfolio website live in minutes.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/register"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors text-sm"
          >
            Build mine free <ArrowRight size={16} />
          </Link>
          
            href="#how"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:border-gray-300 transition-colors text-sm"
          >
            See how it works
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-5">Free forever - No credit card needed - Own your HTML</p>
      </section>

      <section id="roles" className="max-w-6xl mx-auto px-6 pb-24">
        <p className="text-center text-xs font-semibold tracking-widest text-gray-400 uppercase mb-10">
          Templates for every dev role
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ROLES.map(function(r) {
            const Icon = r.icon
            return (
              <Link
                key={r.label}
                href="/register"
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-center"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: r.bg }}>
                  <Icon size={18} style={{ color: r.color }} />
                </div>
                <span className="text-sm font-medium text-gray-700 leading-tight">{r.label}</span>
              </Link>
            )
          })}
        </div>
      </section>

      <section id="how" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Process</p>
            <h2 className="font-display font-bold text-4xl text-gray-900">How it works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {STEPS.map(function(step) {
              const Icon = step.icon
              return (
                <div key={step.n} className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                      <Icon size={15} className="text-brand-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-300 tracking-wider">{step.n}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-28 text-center">
        <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-5">
          Ready to stand out?
        </h2>
        <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto">
          Takes 5 minutes. No design skills needed.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 text-white font-semibold text-lg hover:bg-brand-700 transition-colors"
        >
          Start building <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Layers size={14} className="text-brand-600" />
            <span className="font-medium text-gray-600">Portfol.io</span>
          </div>
          <p>Build your portfolio, own your code.</p>
        </div>
      </footer>

    </div>
  )
}
