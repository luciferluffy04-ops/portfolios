'use client'

import { Check } from 'lucide-react'
import { clsx } from 'clsx'
import { useBuilder } from './BuilderContext'

const STEPS = [
  { n: 1, label: 'Role' },
  { n: 2, label: 'Template' },
  { n: 3, label: 'Details' },
  { n: 4, label: 'Preview' },
]

export function Stepper() {
  const { state, setStep } = useBuilder()
  const { step } = state

  return (
    <div className="flex items-center gap-0">
      {STEPS.map((s, i) => {
        const done = step > s.n
        const active = step === s.n
        return (
          <div key={s.n} className="flex items-center">
            <button
              onClick={() => done && setStep(s.n)}
              className={clsx(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] transition-colors',
                active && 'bg-brand-50 text-brand-700 font-medium',
                done && 'text-teal-700 cursor-pointer hover:bg-teal-50',
                !active && !done && 'text-gray-400 cursor-default',
              )}
            >
              <span className={clsx(
                'w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0',
                active && 'bg-brand-600 text-white',
                done && 'bg-teal-100 text-teal-700',
                !active && !done && 'bg-gray-100 text-gray-400',
              )}>
                {done ? <Check size={10} strokeWidth={3} /> : s.n}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <span className="text-gray-200 text-sm px-0.5">›</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
