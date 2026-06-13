import { NextRequest, NextResponse } from 'next/server'

const PROTECTED = ['/builder', '/dashboard']
const PUBLIC = [
  '/',
  '/login',
  '/register',
  '/verify-email',
  '/forgot-password',
  '/pricing',
  '/u',
  '/auth',
  '/api',
]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isPublic = PUBLIC.some(r =>
    pathname === r || pathname.startsWith(r + '/')
  )

  if (isPublic) {
    return NextResponse.next()
  }

  const isProtected = PROTECTED.some(r =>
    pathname === r || pathname.startsWith(r + '/')
  )

  if (!isProtected) {
    return NextResponse.next()
  }

  // Supabase v2 stores session in cookies using the project ref
  const allCookies = req.cookies.getAll()
  const hasSession = allCookies.some(c =>
    c.name.includes('sb-') && c.name.includes('-auth-token')
  )

  if (!hasSession) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
}
