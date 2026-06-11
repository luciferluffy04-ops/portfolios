'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Layers, Mail, RefreshCw } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthContext'

export default function VerifyEmailForm() {
  const { user } = useAuth()
  const [resent, setResent] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createBrowserClient()

  async function handleResend() {
    if (!user?.email) return
    setLoading(true)
    await supabase.auth.resend({
      type: 'signup',
      email: user.email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    setResent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <Layers size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-gray-900 text-lg">
            Portfol.io
          </span>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm text-center">
          <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-5">
            <Mail size={26} className="text-brand-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Verify your email
          </h1>
          <p className="text-sm text-gray-500 mb-2">
            We sent a verification link to
          </p>
          <p className="text-sm font-semibold text-gray-800 mb-5">
            {user?.email || 'your email address'}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Click the link in the email to activate your account.
            Check your spam folder if you do not see it.
          </p>
          {resent ? (
            <div className="py-2.5 rounded-lg bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-4">
              Email resent successfully!
            </div>
          ) : (
            <button
              onClick={handleResend}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors mb-4"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Sending...' : 'Resend verification email'}
            </button>
          )}
          <Link
            href="/login"
            className="text-sm text-brand-600 hover:text-brand-700 font-medium"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}