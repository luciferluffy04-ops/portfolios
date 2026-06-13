'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Layers, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const supabase = createBrowserClient()

  // Supabase sends the user to this page with a hash containing the recovery token.
  // We need to let Supabase process it via onAuthStateChange before we can update the password.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User is now in a recovery session — they can update their password
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.updateUser({ password })
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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Password updated!</h2>
            <p className="text-sm text-gray-500 mb-5">
              Your password has been changed successfully.
            </p>
            <Link
              href="/login"
              className="inline-block w-full py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors text-center"
            >
              Sign in
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
          <h1 className="text-xl font-semibold text-gray-900 mb-1">Set new password</h1>
          <p className="text-sm text-gray-500 mb-6">Choose a strong password for your account.</p>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm mb-4">
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                New password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white placeholder-gray-300 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-200 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Updating...' : 'Update password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
