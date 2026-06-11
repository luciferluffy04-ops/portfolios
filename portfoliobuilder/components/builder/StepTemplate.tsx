'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'
import { useBuilder } from './BuilderContext'
import { TEMPLATES, ROLES } from '@/lib/constants'
import { TemplateId } from '@/lib/types'
import { TemplateThumb } from './TemplateThumb'

export function StepTemplate() {
  const { state, setTemplateId, goNext, goBack } = useBuilder()
  const roleLabel = ROLES.find(r => r.id === state.role)?.label ?? 'developers'

  return (
    <div className="animate-fade-up">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Pick a template</h2>
      <p className="text-sm text-gray-500 mb-6">
        Designed specifically for <span className="text-gray-700 font-medium">{roleLabel}</span>.
        Colours and fonts are customisable.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {TEMPLATES.map(t => {
          const selected = state.templateId === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTemplateId(t.id as TemplateId)}
              className={clsx(
                'rounded-xl border overflow-hidden text-left transition-all',
                selected
                  ? 'border-brand-500 ring-1 ring-brand-500'
                  : 'border-gray-200 hover:border-gray-300',
              )}
            >
              <div className="overflow-hidden">
                <TemplateThumb id={t.id as TemplateId} accent={state.accentColor} />
              </div>
              <div className="p-3 border-t border-gray-100 bg-white relative">
                {t.badge && (
                  <span
                    className="absolute top-2.5 right-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                    style={{ background: t.badgeColor }}
                  >
                    {t.badge}
                  </span>
                )}
                <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.description}</p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <button
          onClick={goNext}
          disabled={!state.templateId}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Add your details <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
