'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Code2,
  Server,
  Database,
  BarChart3,
  Layers,
  Cloud,
  Zap,
  Upload,
  Eye,
  Check,
  Star,
  Crown,
} from 'lucide-react'

type RoleItem = {
  icon: React.ElementType
  label: string
  color: string
  bg: string
}

type StepItem = {
  icon: React.ElementType
  n: string
  title: string
  desc: string
}

const ROLES: RoleItem[] = [
  { icon: Code2,     label: 'Frontend dev',   color: '#534AB7', bg: '#EEEDFE' },
  { icon: Server,    label: 'Backend dev',    color: '#0F6E56', bg: '#E1F5EE' },
  { icon: Database,  label: 'Data engineer',  color: '#854F0B', bg: '#FAEEDA' },
  { icon: BarChart3, label: 'Data scientist', color: '#993C1D', bg: '#FAECE7' },
  { icon: Layers,    label: 'Full stack',     color: '#185FA5', bg: '#E6F1FB' },
  { icon: Cloud,     label: 'DevOps',         color: '#993556', bg: '#FBEAF0' },
]

const STEPS: StepItem[] = [
  {
    icon: Layers,
    n: '01',
    title: 'Pick your role',
    desc: 'Choose from 6 developer roles. Each unlocks templates designed specifically for your field.',
  },
  {
    icon: Upload,
    n: '02',
    title: 'Add your details',
    desc: 'Upload your resume and we extract everything automatically, or fill in the form yourself.',
  },
  {
    icon: Eye,
    n: '03',
    title: 'Preview and customise',
    desc: 'See your portfolio live. Change accent colour, font, and layout until it feels like you.',
  },
  {
    icon: Zap,
    n: '04',
    title: 'Publish in one click',
    desc: 'Go live instantly. Or download the HTML and self-host anywhere.',
  },
]

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    icon: Star,
    color: '#6b7280',
    features: ['1 portfolio', '2 templates', 'Resume auto-fill', 'Download HTML', 'Publish to portfol.io'],
    cta: 'Get started',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$9/mo',
    icon: Zap,
    color: '#185FA5',
    features: ['5 portfolios', 'All 4 templates', 'Font style picker', 'Custom subdomain', 'Portfolio analytics', 'Remove badge'],
    cta: 'Start free trial',
    href: '/register?plan=pro',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$19/mo',
    icon: Crown,
    color: '#854F0B',
    features: ['Unlimited portfolios', 'All Pro features', 'Recruiter view tracking', 'Priority support', 'Early feature access'],
    cta: 'Go Premium',
    href: '/register?plan=premium',
    highlight: false,
  },
]

function RoleCard({ role }: { role: RoleItem }) {
  const Icon = role.icon
  return (
    <Link
      href="/register"
      className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-center"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: role.bg }}
      >
        <Icon size={18} style={{ color: role.color }} />
      </div>
      <span className="text-sm font-medium text-gray-700 leading-tight">{role.label}</span>
    </Link>
  )
}

function StepCard({ step }: { step: StepItem }) {
  const Icon = step.icon
  return (
    <div className="flex flex-col gap-4">
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
}

export default function HomePageContent() {
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
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <Link href="/login" className="hover:text-gray-900 transition-colors">Sign in</Link>
          </div>
          <Link
            href="/register"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            Get started <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-sm font-medium mb-8">
          <Zap size={13} />
          <span>Portfolio ready in under 5 minutes</span>
        </div>
        <h1 className="font-display font-bold text-5xl md:text-7xl text-gray-900 leading-tight mb-6">
          <span>Your portfolio,</span>
          <br />
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
            <span>Build mine free</span>
            <ArrowRight size={16} />
          </Link>
          <a
            href="#how"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:border-gray-300 transition-colors text-sm"
          >
            <span>See how it works</span>
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-5">Free · No credit card needed · Own your HTML</p>
      </section>

      <section id="roles" className="max-w-6xl mx-auto px-6 pb-24">
        <p className="text-center text-xs font-semibold tracking-widest text-gray-400 uppercase mb-10">
          Templates for every dev role
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ROLES.map(function(r) {
            return <RoleCard key={r.label} role={r} />
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
              return <StepCard key={step.n} step={step} />
            })}
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Pricing</p>
          <h2 className="font-display font-bold text-4xl text-gray-900 mb-3">
            Start free, scale when ready
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            All plans include a live portfolio. Upgrade for analytics, multiple portfolios, and recruiter features.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {PLANS.map(plan => {
            const Icon = plan.icon
            return (
              <div
                key={plan.name}
                className="relative rounded-2xl border p-6 flex flex-col gap-4"
                style={{
                  borderColor: plan.highlight ? plan.color + '55' : '#e5e7eb',
                  boxShadow: plan.highlight ? '0 4px 24px ' + plan.color + '18' : undefined,
                }}
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{ background: plan.color }}
                  >
                    Most popular
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: plan.color + '15' }}
                  >
                    <Icon size={15} style={{ color: plan.color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{plan.name}</p>
                    <p className="text-xs font-bold" style={{ color: plan.color }}>{plan.price}</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <Check size={12} style={{ color: plan.color }} className="flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className="mt-auto block text-center py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  style={
                    plan.highlight
                      ? { background: plan.color, color: '#fff' }
                      : { background: '#f3f4f6', color: '#374151' }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            )
          })}
        </div>
        <p className="text-center text-sm text-gray-400">
          Need the full comparison?{' '}
          <Link href="/pricing" className="text-brand-600 hover:text-brand-700 font-medium">
            See all features →
          </Link>
        </p>
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
          <span>Start building</span>
          <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Layers size={14} className="text-brand-600" />
            <span className="font-medium text-gray-600">Portfol.io</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="hover:text-gray-600 transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-gray-600 transition-colors">Sign in</Link>
            <p>Build your portfolio, own your code.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
