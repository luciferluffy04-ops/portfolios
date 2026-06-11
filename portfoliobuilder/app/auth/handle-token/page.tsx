'use client'

import { useEffect } from 'react'
import { createBrowserClient } from '@/lib/supabase'

export default function HandleTokenPage() {
  const supabase = createBrowserClient()

  useEffect(() => {
    async function handleSession() {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const { data } = await supabase.auth.getSession()

      if (data.session) {
        window.location.href = '/dashboard'
        return
      }

      await new Promise(resolve => setTimeout(resolve, 2000))

      const { data: data2 } = await supabase.auth.getSession()

      if (data2.session) {
        window.location.href = '/dashboard'
        return
      }

      window.location.href = '/login'
    }

    handleSession()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '2px solid #534AB7',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }} />
        <p style={{ fontSize: '14px', color: '#6B7280' }}>Signing you in...</p>
        <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '8px' }}>Please wait a moment</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}