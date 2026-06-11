'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Layers, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createBrowserClient()

  function getNext() {
    if (typeof window === 'undefined') return '/dashboard'
    const params = new URLSearchParams(window.location.search)
    return params.get('next') || '/dashboard'
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data.session) {
      window.location.href = getNext()
    } else {
      setError('Login failed. Please try again.')
      setLoading(false)
    }
  }

  async function handleGoogleLogin() {
    const next = getNext()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback?next=' + next,
      },
    })
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

        <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Sign in to manage your portfolio
          </p>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm mb-4">
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-brand-500 hover:text-brand-700"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="........"
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
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400">or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-brand-600 font-medium hover:text-brand-700"
            >
              Sign up free
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing you agree to our Terms and Privacy Policy
        </p>
      </div>
    </div>
  )
}