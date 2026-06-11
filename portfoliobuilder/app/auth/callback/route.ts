import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/dashboard'
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(origin + '/login?error=' + error)
  }

  if (code) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      if (!exchangeError) {
        return NextResponse.redirect(origin + next)
      }
      console.error('Exchange error:', exchangeError)
    } catch (err) {
      console.error('Callback error:', err)
    }
  }

  return NextResponse.redirect(origin + '/auth/handle-token')
}