import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://josrhzyubkdbxefppdwu.supabase.co'

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvc3Joenl1YmtkYnhlZnBwZHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNDc2ODksImV4cCI6MjA5NjcyMzY4OX0.e-2ohTNUs29XZreWUvFWWPNfWlTcLR5C8YoHUvM-Hhc'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/dashboard'
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(origin + '/login?error=' + encodeURIComponent(error))
  }

  if (code) {
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { flowType: 'pkce' },
      })
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (!exchangeError && data.session) {
        const response = NextResponse.redirect(origin + next)

        // Derive project ref from URL: https://<ref>.supabase.co
        const projectRef = SUPABASE_URL.split('//')[1]?.split('.')[0] || 'supabase'
        const cookieName = `sb-${projectRef}-auth-token`

        response.cookies.set(cookieName, JSON.stringify(data.session), {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        })

        return response
      }

      console.error('Exchange error:', exchangeError)
    } catch (err) {
      console.error('Callback error:', err)
    }
  }

  // No code or exchange failed — process hash token in the browser
  return NextResponse.redirect(origin + '/auth/handle-token')
}
