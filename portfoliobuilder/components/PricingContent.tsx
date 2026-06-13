'use client'

import Link from 'next/link'
import { Check, X, Layers, ArrowRight, Zap, Crown, Star } from 'lucide-react'

type PlanFeature = {
  label: string
  free: boolean | string
  pro: boolean | string
  premium: boolean | string
}

const FEATURES: PlanFeature[] = [
  { label: 'Portfolio websites',         free: '1',          pro: '5',          premium: 'Unlimited' },
  { label: 'Role-specific templates',    free: '2 templates', pro: 'All 4',     premium: 'All 4 + upcoming' },
  { label: 'Custom accent colour',       free: true,         pro: true,         premium: true },
  { label: 'Font style picker',          free: false,        pro: true,         premium: true },
  { label: 'Resume auto-fill (AI)',       free: true,         pro: true,         premium: true },
  { label: 'Download HTML',              free: true,         pro: true,         premium: true },
  { label: 'Publish to portfol.io',      free: true,         pro: true,         premium: true },
  { label: 'Custom subdomain',           free: false,        pro: true,         premium: true },
  { label: 'Portfolio analytics',        free: false,        pro: true,         premium: true },
  { label: 'Remove "Built with" badge',  free: false,        pro: true,         premium: true },
  { label: 'Recruiter view tracking',    free: false,        pro: false,        premium: true },
  { label: 'Priority support',           free: false,        pro: false,        premium: true },
  { label: 'Early access to features',   free: false,        pro: false,        premium: true },
]

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to get started.',
    icon: Star,
    color: '#6b7280',
    bg: '#f9fafb',
    border: '#e5e7eb',
    cta: 'Get started free',
    ctaHref: '/register',
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9',
    period: 'per month',
    description: 'For serious job seekers who want to stand out.',
    icon: Zap,
    color: '#185FA5',
    bg: '#EBF4FF',
    border: '#BFDBFE',
    cta: 'Start Pro free trial',
    ctaHref: '/register?plan=pro',
    highlight: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$19',
    period: 'per month',
    description: 'Recruiter-grade insights and unlimited everything.',
    icon: Crown,
    color: '#854F0B',
    bg: '#FFFBEB',
    border: '#FDE68A',
    cta: 'Go Premium',
    ctaHref: '/register?plan=premium',
    highlight: false,
  },
]

function FeatureVal({ val }: { val: boolean | string }) {
  if (typeof val === 'string') {
    return <span className="text-xs font-medium text-gray-700">{val}</span>
  }
  if (val) {
    return <Check size={15} className="text-teal-500 mx-auto" />
  }
  return <X size={15} className="text-gray-300 mx-auto" />
}

export default function PricingContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
              <Layers size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-gray-900 text-sm">Portfol.io</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <Link href="/#how" className="hover:text-gray-900 transition-colors">How it works</Link>
            <Link href="/#roles" className="hover:text-gray-900 transition-colors">Roles</Link>
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

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-14 text-center">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Pricing</p>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-lg text-gray-500 max-w-lg mx-auto">
          Start free. Upgrade when you're ready to stand out more.
        </p>
      </section>

      {/* Plan cards */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map(plan => {
            const Icon = plan.icon
            return (
              <div
                key={plan.id}
                className="relative rounded-2xl border p-6 flex flex-col gap-5"
                style={{
                  borderColor: plan.highlight ? plan.color + '66' : plan.border,
                  background: plan.highlight ? plan.bg : '#fff',
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
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: plan.color + '15' }}
                  >
                    <Icon size={17} style={{ color: plan.color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{plan.name}</p>
                    <p className="text-xs text-gray-400">{plan.description}</p>
                  </div>
                </div>

                <div>
                  <span className="font-display font-bold text-4xl text-gray-900">{plan.price}</span>
                  <span className="text-sm text-gray-400 ml-1">{plan.period}</span>
                </div>

                <Link
                  href={plan.ctaHref}
                  className="block text-center py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  style={
                    plan.highlight
                      ? { background: plan.color, color: '#fff' }
                      : { background: '#f3f4f6', color: '#374151' }
                  }
                >
                  {plan.cta}
                </Link>

                <ul className="flex flex-col gap-2.5">
                  {FEATURES.slice(0, 7).map(f => {
                    const val = f[plan.id as 'free' | 'pro' | 'premium']
                    const active = val === true || typeof val === 'string'
                    return (
                      <li key={f.label} className="flex items-center gap-2.5 text-sm">
                        {active
                          ? <Check size={14} className="flex-shrink-0" style={{ color: plan.color }} />
                          : <X size={14} className="flex-shrink-0 text-gray-200" />
                        }
                        <span className={active ? 'text-gray-700' : 'text-gray-400'}>
                          {typeof val === 'string' ? `${f.label}: ${val}` : f.label}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Full feature comparison table */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="font-display font-bold text-2xl text-gray-900 text-center mb-10">
          Full feature comparison
        </h2>
        <div className="rounded-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-100">
            <div className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Feature</div>
            {PLANS.map(p => (
              <div key={p.id} className="p-4 text-center">
                <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                <p className="text-xs text-gray-400">{p.price}/{p.period === 'forever' ? 'mo' : 'mo'}</p>
              </div>
            ))}
          </div>
          {/* Rows */}
          {FEATURES.map((f, i) => (
            <div
              key={f.label}
              className={`grid grid-cols-4 border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              <div className="p-4 text-sm text-gray-700">{f.label}</div>
              <div className="p-4 text-center"><FeatureVal val={f.free} /></div>
              <div className="p-4 text-center"><FeatureVal val={f.pro} /></div>
              <div className="p-4 text-center"><FeatureVal val={f.premium} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <h2 className="font-display font-bold text-2xl text-gray-900 text-center mb-10">
          Common questions
        </h2>
        <div className="flex flex-col gap-5">
          {[
            {
              q: 'Can I try Pro before paying?',
              a: 'Yes — every new account gets a 14-day Pro trial, no credit card required.',
            },
            {
              q: 'What happens when I downgrade to Free?',
              a: 'Your portfolios stay live. You just lose access to Pro features like analytics and custom subdomain. The HTML you downloaded always remains yours.',
            },
            {
              q: 'Do you store my resume?',
              a: 'No. Your resume is processed in memory only during parsing and is never stored on our servers.',
            },
            {
              q: 'Can I use my own domain?',
              a: 'Custom domain support is on our roadmap. For now, portfolios are hosted at your-name.portfol.io, or you can download the HTML and host it anywhere.',
            },
          ].map(item => (
            <div key={item.q} className="border-b border-gray-100 pb-5">
              <p className="font-semibold text-gray-900 mb-2">{item.q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 border-t border-gray-100 py-20 text-center">
        <h2 className="font-display font-bold text-3xl text-gray-900 mb-4">Start building for free</h2>
        <p className="text-gray-500 mb-8">No credit card. No time limit. Just your portfolio.</p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
        >
          Create my portfolio <ArrowRight size={16} />
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
