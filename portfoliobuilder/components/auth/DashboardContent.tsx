'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Layers, Plus, Trash2, Edit3, LogOut, Eye } from 'lucide-react'
import { createBrowserClient, Portfolio } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthContext'

export default function DashboardContent() {
  const { user, signOut } = useAuth()
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient()

  useEffect(() => {
    if (!user) return
    loadPortfolios()
  }, [user])

  async function loadPortfolios() {
    const { data } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', user!.id)
      .order('updated_at', { ascending: false })
    setPortfolios(data || [])
    setLoading(false)
  }

  async function deletePortfolio(id: string) {
    if (!confirm('Delete this portfolio? This cannot be undone.')) return
    await supabase.from('portfolios').delete().eq('id', id)
    setPortfolios(p => p.filter(x => x.id !== id))
  }

  const initials =
    user?.user_metadata?.full_name
      ?.split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ||
    user?.email?.[0].toUpperCase() ||
    'U'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
              <Layers size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-gray-900 text-[15px]">
              Portfol.io
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-xs font-semibold text-brand-700">
                {initials}
              </div>
              <span className="text-sm text-gray-600 hidden sm:block">
                {user?.user_metadata?.full_name || user?.email}
              </span>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              My portfolios
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {portfolios.length === 0
                ? 'Build your first portfolio — takes 5 minutes'
                : `${portfolios.length} portfolio${portfolios.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <Link
            href="/builder"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            <Plus size={15} /> New portfolio
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : portfolios.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
              <Layers size={28} className="text-brand-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              No portfolios yet
            </h2>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              Create your first portfolio in minutes. Upload your resume and
              we'll do the rest.
            </p>
            <Link
              href="/builder"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors"
            >
              <Plus size={15} /> Build my portfolio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolios.map(p => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
              >
                <div className="h-36 bg-gray-50 border-b border-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-gray-200 mb-1">
                      {p.name?.split(' ')[0] || 'Portfolio'}
                    </div>
                    <div className="text-xs text-gray-300 capitalize">
                      {p.template} template
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {p.name || 'Untitled'}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5 capitalize">
                        {p.role} · {p.template}
                      </p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      p.published
                        ? 'bg-teal-50 text-teal-600 border border-teal-100'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {p.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">

                      href={`/u/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <Eye size={12} /> View
                    </a>
                    <Link
                      href={`/builder?edit=${p.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <Edit3 size={12} /> Edit
                    </Link>
                    <button
                      onClick={() => deletePortfolio(p.id)}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-red-400 hover:border-red-200 transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}