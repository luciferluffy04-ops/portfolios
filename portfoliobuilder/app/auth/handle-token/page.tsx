'use client'

import { useEffect } from 'react'
import { createBrowserClient } from '@/lib/supabase'

export default function HandleTokenPage() {
  const supabase = createBrowserClient()

  useEffect(() => {
    async function handleSession() {
      // Wait a moment for Supabase to process the hash token
      await new Promise(resolve => setTimeout(resolve, 1000))

      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        window.location.href = '/dashboard'
        return
      }

      // Try to get session from URL hash manually
      const hash = window.location.hash
      if (hash && hash.includes('access_token')) {
        // Give Supabase more time to process
        await new Promise(resolve => setTimeout(resolve, 2000))
        const { data: { session: session2 } } = await supabase.auth.getSession()
        if (session2) {
          window.location.href = '/dashboard'
          return
        }
      }

      window.location.href = '/login'
    }

    handleSession()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text