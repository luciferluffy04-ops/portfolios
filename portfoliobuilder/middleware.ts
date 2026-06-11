import { NextRequest, NextResponse } from 'next/server'

const PROTECTED = ['/builder', '/dashboard']
const PUBLIC = ['/', '/login', '/register', '/verify-email', '/u', '/auth', '/api']

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

  const token = req.cookies.get('sb-access-token')?.value ||
    req.cookies.get(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0]}-auth-token`)?.value

  if (!token) {
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