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
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          auth: {
            flowType: 'pkce',
          },
        }
      )
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (!exchangeError && data.session) {
        const response = NextResponse.redirect(origin + next)

        // Set session cookies so middleware can read them
        const cookieName = 'sb-' + process.env.NEXT_PUBLIC_SUPABASE_URL!.split('//')[1].split('.')[0] + '-auth-token'
        response.cookies.set(cookieName, JSON.stringify(data.session), {
          httpOnly: false,
          secure: true,
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

  // No code — handle hash token in browser
  return NextResponse.redirect(origin + '/auth/handle-token')
}