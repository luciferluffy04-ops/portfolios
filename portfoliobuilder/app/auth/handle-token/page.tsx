'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/lib/supabase'

export default function HandleTokenPage() {
  const [status, setStatus] = useState('Signing you in...')
  const supabase = createBrowserClient()

  useEffect(() => {
    async function handleSession() {
      setStatus('Checking session...')

      // Supabase auto-processes hash tokens on page load
      // We just need to wait and check
      let attempts = 0
      const maxAttempts = 10

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 800))

        const { data: { session } } = await supabase.auth.getSession()

        if (session) {
          setStatus('Logged in! Redirecting...')
          window.location.replace('/dashboard')
          return
        }

        attempts++
        setStatus('Verifying... (' + attempts + '/' + maxAttempts + ')')
      }

      // If still no session after all attempts
      window.location.replace('/login?error=session_not_found')
    }

    handleSession()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F9FAFB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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