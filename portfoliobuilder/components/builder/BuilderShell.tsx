'use client'

import Link from 'next/link'
import { Layers, LogOut, User } from 'lucide-react'
import { useBuilder } from './BuilderContext'
import { Stepper } from './Stepper'
import { StepRole } from './StepRole'
import { StepTemplate } from './StepTemplate'
import { StepDetails } from './StepDetails'
import { StepPreview } from './StepPreview'
import { useAuth } from '@/components/auth/AuthContext'

export function BuilderShell() {
  const { state } = useBuilder()
  const { user, signOut } = useAuth()

  const initials = user?.user_metadata?.full_name
    ?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    || user?.email?.[0].toUpperCase()
    || 'U'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
              <Layers size={14} className="text-white" />
            </div>
            <span className="font-display font-bold text-gray-900 text-[15px]">Portfol.io</span>
          </Link>
          <Stepper />
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden sm:block">
              Step {state.step} of 4
            </span>
            {user && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-xs font-semibold text-brand-700">
                  {initials}
                </div>
                <button
                  onClick={signOut}
                  className="hidden sm:flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  title="Sign out"
                >
                  <LogOut size={13} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center py-8 px-4">
        <div className={`
          w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8
          ${state.step === 4 ? 'max-w-5xl' : 'max-w-3xl'}
        `}>
          {state.step === 1 && <StepRole />}
          {state.step === 2 && <StepTemplate />}
          {state.step === 3 && <StepDetails />}
          {state.step === 4 && <StepPreview />}
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-gray-300">
        Portfol.io — your portfolio, your code
      </footer>
    </div>
  )
}