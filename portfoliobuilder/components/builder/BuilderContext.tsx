'use client'

import {
  createContext, useContext, useState, useCallback, ReactNode
} from 'react'
import { BuilderState, UserDetails, Role, TemplateId, Plan } from '@/lib/types'
import { DEFAULT_DETAILS } from '@/lib/constants'

const initialState: BuilderState = {
  step: 1,
  role: 'frontend',
  templateId: 'minimal',
  details: DEFAULT_DETAILS as UserDetails,
  subdomain: '',
  accentColor: '#534AB7',
  fontStyle: 'sans',
  plan: 'free',
}

interface BuilderContextValue {
  state: BuilderState
  setStep: (step: number) => void
  setRole: (role: Role) => void
  setTemplateId: (id: TemplateId) => void
  setDetails: (details: Partial<UserDetails>) => void
  setSubdomain: (s: string) => void
  setAccentColor: (c: string) => void
  setFontStyle: (f: 'sans' | 'serif' | 'mono') => void
  setPlan: (p: Plan) => void
  goNext: () => void
  goBack: () => void
}

const BuilderContext = createContext<BuilderContextValue | null>(null)

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BuilderState>(initialState)

  const setStep = useCallback((step: number) => {
    setState(s => ({ ...s, step }))
  }, [])

  const setRole = useCallback((role: Role) => {
    setState(s => ({ ...s, role }))
  }, [])

  const setTemplateId = useCallback((templateId: TemplateId) => {
    setState(s => ({ ...s, templateId }))
  }, [])

  const setDetails = useCallback((details: Partial<UserDetails>) => {
    setState(s => ({ ...s, details: { ...s.details, ...details } }))
  }, [])

  const setSubdomain = useCallback((subdomain: string) => {
    setState(s => ({ ...s, subdomain }))
  }, [])

  const setAccentColor = useCallback((accentColor: string) => {
    setState(s => ({ ...s, accentColor }))
  }, [])

  const setFontStyle = useCallback((fontStyle: 'sans' | 'serif' | 'mono') => {
    setState(s => ({ ...s, fontStyle }))
  }, [])

  const setPlan = useCallback((plan: Plan) => {
    setState(s => ({ ...s, plan }))
  }, [])

  const goNext = useCallback(() => {
    setState(s => ({ ...s, step: Math.min(s.step + 1, 4) }))
  }, [])

  const goBack = useCallback(() => {
    setState(s => ({ ...s, step: Math.max(s.step - 1, 1) }))
  }, [])

  return (
    <BuilderContext.Provider value={{
      state,
      setStep, setRole, setTemplateId, setDetails,
      setSubdomain, setAccentColor, setFontStyle, setPlan,
      goNext, goBack,
    }}>
      {children}
    </BuilderContext.Provider>
  )
}

export function useBuilder() {
  const ctx = useContext(BuilderContext)
  if (!ctx) throw new Error('useBuilder must be used inside BuilderProvider')
  return ctx
}
