import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://josrhzyubkdbxefppdwu.supabase.co'

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvc3Joenl1YmtkYnhlZnBwZHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNDc2ODksImV4cCI6MjA5NjcyMzY4OX0.e-2ohTNUs29XZreWUvFWWPNfWlTcLR5C8YoHUvM-Hhc'

export async function POST(req: NextRequest) {
  try {
    const { subdomain, html, role, template, name, plan } = await req.json()

    if (!subdomain || !html) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const slug = subdomain
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .slice(0, 50)

    if (!slug) {
      return NextResponse.json({ error: 'Invalid subdomain' }, { status: 400 })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

    // Resolve user from auth header
    const authHeader = req.headers.get('authorization')
    let userId: string | null = null

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      const { data: { user } } = await supabase.auth.getUser(token)
      userId = user?.id || null
    }

    // Check slug availability — only block if owned by a *different* user
    const { data: existing } = await supabase
      .from('portfolios')
      .select('id, user_id')
      .eq('slug', slug)
      .single()

    if (existing && existing.user_id !== userId) {
      return NextResponse.json(
        { error: 'This URL is already taken. Try a different name.' },
        { status: 409 }
      )
    }

    // Plan tier — Free users get 1 portfolio, Pro/Premium get more
    const portfolioPlan: 'free' | 'pro' | 'premium' =
      plan === 'premium' ? 'premium' : plan === 'pro' ? 'pro' : 'free'

    // For Free plan, enforce 1-portfolio limit (skip if updating existing)
    if (portfolioPlan === 'free' && userId && !existing) {
      const { count } = await supabase
        .from('portfolios')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)

      if ((count ?? 0) >= 1) {
        return NextResponse.json(
          {
            error:
              'Free plan allows 1 portfolio. Upgrade to Pro or Premium for unlimited portfolios.',
            upgradeRequired: true,
          },
          { status: 403 }
        )
      }
    }

    const { error: upsertError } = await supabase.from('portfolios').upsert(
      {
        slug,
        html,
        role: role || 'frontend',
        template: template || 'minimal',
        name: name || slug,
        published: true,
        user_id: userId,
        plan: portfolioPlan,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'slug' }
    )

    if (upsertError) {
      console.error('Supabase upsert error:', upsertError)
      return NextResponse.json({ error: upsertError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, url: '/u/' + slug, slug })
  } catch (err: any) {
    console.error('Publish error:', err)
    return NextResponse.json({ error: err.message || 'Failed to publish' }, { status: 500 })
  }
}
