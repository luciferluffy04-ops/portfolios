import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { subdomain, html, role, template, name } = await req.json()

    if (!subdomain || !html) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const slug = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 50)
    if (!slug) {
      return NextResponse.json({ error: 'Invalid subdomain' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get user from auth header
    const authHeader = req.headers.get('authorization')
    let userId: string | null = null

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      const { data: { user } } = await supabase.auth.getUser(token)
      userId = user?.id || null
    }

    // Check slug availability
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

    // Save portfolio
    const { error } = await supabase
      .from('portfolios')
      .upsert({
        slug,
        html,
        role: role || 'frontend',
        template: template || 'minimal',
        name: name || slug,
        published: true,
        user_id: userId,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'slug' })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, url: '/u/' + slug, slug })
  } catch (err: any) {
    console.error('Publish error:', err)
    return NextResponse.json({ error: err.message || 'Failed to publish' }, { status: 500 })
  }
}