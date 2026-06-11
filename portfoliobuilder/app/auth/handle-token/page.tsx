'use client'

import { useEffect } from 'react'
import { createBrowserClient } from '@/lib/supabase'

export default function HandleTokenPage() {
  const supabase = createBrowserClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        window.location.href = '/dashboard'
      } else {
        window.location.href = '/login'
      }
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-500">Signing you in...</p>
      </div>
    </div>
  )
}