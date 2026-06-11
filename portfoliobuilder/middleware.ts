import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Routes that require login
const PROTECTED_ROUTES = ['/builder', '/dashboard']

// Routes that are always public (no login needed)
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/verify-email',
  '/u',
]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always allow public portfolio pages (/u/anything)
  if (pathname.startsWith('/u/')) {
    return NextResponse.next()
  }

  // Always allow API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Always allow public pages
  if (PUBLIC_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'))) {
    return NextResponse.next()
  }

  // Check if route needs protection
  const needsAuth = PROTECTED_ROUTES.some(r =>
    pathname === r || pathname.startsWith(r + '/')
  )

  if (!needsAuth) return NextResponse.next()

  // Verify session from cookie
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const accessToken = req.cookies.get('sb-access-token')?.value

  if (!accessToken) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    })

    const { data: { user }, error } = await supabase.auth.getUser(accessToken)

    if (error || !user) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (!user.email_confirmed_at) {
      return NextResponse.redirect(new URL('/verify-email', req.url))
    }

    return NextResponse.next()
  } catch {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
}