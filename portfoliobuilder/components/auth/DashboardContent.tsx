'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Layers, Plus, Trash2, Edit3, LogOut, Eye,
  Crown, Zap, Star, ArrowRight, Loader
} from 'lucide-react'
import { createBrowserClient, Portfolio } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthContext'

const PLAN_META = {
  free:    { label: 'Free',    color: '#6b7280', bg: '#f3f4f6', icon: Star },
  pro:     { label: 'Pro',     color: '#185FA5', bg: '#E6F1FB', icon: Zap },
  premium: { label: 'Premium', color: '#854F0B', bg: '#FAEEDA', icon: Crown },
}

export default function DashboardContent() {
  const { user, loading: authLoading, signOut } = useAuth()
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const router = useRouter()
  const supabase = createBrowserClient()

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!user) return
    supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .then(({ data }) => {
        setPortfolios(data || [])
        setLoadingData(false)
      })
  }, [user])

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size={24} className="text-brand-600 animate-spin" />
      </div>
    )
  }

  const displayName = user.user_metadata?.full_name || user.email || 'User'
  const initials = (user.user_metadata?.full_name || user.email || 'U')
    .split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

  const userPlan: 'free' | 'pro' | 'premium' =
    portfolios.some(p => p.plan === 'premium') ? 'premium' :
    portfolios.some(p => p.plan === 'pro') ? 'pro' : 'free'

  const plan = PLAN_META[userPlan]
  const PlanIcon = plan.icon

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
              <Layers size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-gray-900 text-sm">Portfol.io</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold hover:opacity-80 transition-opacity"
              style={{ color: plan.color, background: plan.bg }}
            >
              <PlanIcon size={11} />
              {plan.label}
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-xs font-bold text-white">
                {initials}
              </div>
              <span className="text-sm text-gray-700 hidden sm:block font-medium">{displayName}</span>
            </div>

            <button
              onClick={signOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-5 py-10">

        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-xl font-semibold mb-1">
                Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'there'} 👋
              </h1>
              <p className="text-brand-100 text-sm">
                {portfolios.length === 0
                  ? 'Ready to build your first portfolio? Pick a role, choose a template, go live.'
                  : `You have ${portfolios.length} portfolio${portfolios.length > 1 ? 's' : ''}. Create another or edit an existing one.`}
              </p>
            </div>
            <Link
              href="/builder"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-brand-700 text-sm font-semibold hover:bg-brand-50 transition-colors flex-shrink-0"
            >
              <Plus size={15} />
              New portfolio
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Upgrade nudge */}
        {userPlan === 'free' && portfolios.length >= 1 && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 mb-6">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Crown size={16} className="text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Unlock more with Pro</p>
              <p className="text-xs text-gray-500">5 portfolios, analytics, font picker, custom subdomain — $9/mo.</p>
            </div>
            <Link href="/pricing" className="flex-shrink-0 px-4 py-2 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors">
              Upgrade
            </Link>
          </div>
        )}

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">My portfolios</h2>
          <Link href="/builder" className="flex items-center gap-1.5 text-sm text-brand-600 font-medium hover:text-brand-700 transition-colors">
            <Plus size={14} /> New
          </Link>
        </div>

        {loadingData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => <div key={i} className="h-52 bg-gray-100 rounded-2xl animate-pulse" />)}
          </div>
        )}

        {!loadingData && portfolios.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
              <Layers size={28} className="text-brand-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No portfolios yet</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              Pick a role, choose a template, fill in your details — live in minutes.
            </p>
            <Link href="/builder" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors">
              <Plus size={15} /> Build my first portfolio
            </Link>
          </div>
        )}

        {!loadingData && portfolios.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolios.map(p => {
              const pm = PLAN_META[p.plan as 'free' | 'pro' | 'premium'] || PLAN_META.free
              return (
                <div key={p.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all">
                  <div className="h-36 flex items-center justify-center border-b border-gray-100" style={{ background: 'linear-gradient(135deg,#f9fafb,#f3f4f6)' }}>
                    <div className="text-center px-4">
                      <div className="text-2xl font-bold text-gray-200 mb-1 truncate max-w-[160px]">{p.name?.split(' ')[0] || 'Portfolio'}</div>
                      <div className="text-xs text-gray-300 capitalize">{p.template} template</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-gray-800 truncate">{p.name || 'Untitled'}</h3>
                        <p className="text-xs text-gray-400 mt-0.5 capitalize">{p.role} · {p.template}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ color: pm.color, background: pm.bg }}>{pm.label}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 border border-teal-100">{p.published ? 'Live' : 'Draft'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={'/u/' + p.slug} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                        <Eye size={12} /> View
                      </a>
                      <Link href={'/builder?edit=' + p.id} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                        <Edit3 size={12} /> Edit
                      </Link>
                      <button onClick={() => deletePortfolio(p.id)} className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-red-400 hover:border-red-200 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
