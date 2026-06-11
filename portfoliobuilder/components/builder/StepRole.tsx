'use client'

import { Code2, Server, Database, BarChart3, Layers, Cloud, ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'
import { useBuilder } from './BuilderContext'
import { ROLES, ACCENT_COLORS } from '@/lib/constants'
import { Role } from '@/lib/types'

const ICONS: Record<string, React.ElementType> = {
  Code2, Server, Database, BarChart3, Layers, Cloud,
}

export function StepRole() {
  const { state, setRole, setAccentColor, goNext } = useBuilder()

  function handleSelect(id: Role, accent: string) {
    setRole(id)
    setAccentColor(accent)
  }

  return (
    <div className="animate-fade-up">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">What's your role?</h2>
      <p className="text-sm text-gray-500 mb-6">
        We'll show you templates designed specifically for your field.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {ROLES.map(r => {
          const Icon = ICONS[r.icon]
          const selected = state.role === r.id
          return (
            <button
              key={r.id}
              onClick={() => handleSelect(r.id, r.accent)}
              className={clsx(
                'flex flex-col items-start gap-3 p-4 rounded-xl border text-left transition-all',
                selected
                  ? 'border-brand-500 ring-1 ring-brand-500 bg-brand-50/40'
                  : 'border-gray-200 hover:border-gray-300 bg-white',
              )}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: r.accent + '18' }}
              >
                {Icon && <Icon size={17} style={{ color: r.accent }} />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 leading-tight">{r.label}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-tight">{r.description}</p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-400">
          Selected: <span className="text-gray-700 font-medium">
            {ROLES.find(r => r.id === state.role)?.label}
          </span>
        </p>
        <button
          onClick={goNext}
          disabled={!state.role}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Choose template <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
