'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase'

export default function HandleTokenPage() {
  const [status, setStatus] = useState('Completing sign in...')
  const supabase = createBrowserClient()

  useEffect(() => {
    async function handleSession() {
      // Listen for auth state change - Supabase fires this when it processes the hash
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          subscription.unsubscribe()
          setStatus('Signed in! Taking you to your dashboard...')
          setTimeout(() => {
            window.location.replace('/dashboard')
          }, 500)
        }
      })

      // Also check immediately in case session already exists
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        subscription.unsubscribe()
        setStatus('Signed in! Taking you to your dashboard...')
        window.location.replace('/dashboard')
        return
      }

      // Timeout fallback after 15 seconds
      setTimeout(() => {
        subscription.unsubscribe()
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) {
            window.location.replace('/dashboard')
          } else {
            window.location.replace('/login?error=session_timeout')
          }
        })
      }, 15000)
    }

    handleSession()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F9FAFB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '3px solid #E5E7EB',
          borderTopColor: '#534AB7',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 20px'
        }} />
        <p style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
          {status}
        </p>
        <p style={{ fontSize: '13px', color: '#9CA3AF' }}>
          Please do not close this page
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}