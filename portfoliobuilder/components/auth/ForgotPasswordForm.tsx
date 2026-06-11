'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Layers, CheckCircle } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const supabase = createBrowserClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/auth/reset-password',
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setDone(true)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <Layers size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-gray-900 text-lg">Portfol.io</span>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm text-center">
            <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-teal-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h2>
            <p className="text-sm text-gray-500 mb-5">
              We sent a password reset link to
            </p>
            <p className="text-sm font-medium text-gray-800 mb-5">{email}</p>
            <Link
              href="/login"
              className="inline-block w-full py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors text-center"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <Layers size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-gray-900 text-lg">Portfol.io</span>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">Reset password</h1>
          <p className="text-sm text-gray-500 mb-6">
            Enter your email and we will send you a reset link.
          </p>
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white placeholder-gray-300 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-200 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Remember your password?{' '}
            <Link href="/login" className="text-brand-600 font-medium hover:text-brand-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}