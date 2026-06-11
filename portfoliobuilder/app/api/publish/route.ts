import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(req: NextRequest) {
  try {
    const { subdomain, html } = await req.json()

    if (!subdomain || !html) {
      return NextResponse.json({ error: 'Missing subdomain or HTML' }, { status: 400 })
    }

    // Sanitise subdomain
    const safe = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 50)
    if (!safe) {
      return NextResponse.json({ error: 'Invalid subdomain' }, { status: 400 })
    }

    // Save to public/sites directory (local dev)
    // In production: upload to object storage (S3/R2) and configure subdomain routing
    const sitesDir = join(process.cwd(), 'public', 'sites', safe)
    await mkdir(sitesDir, { recursive: true })
    await writeFile(join(sitesDir, 'index.html'), html, 'utf-8')

    return NextResponse.json({
      success: true,
      url: `/${safe}`,
      message: `Portfolio published at ${safe}.portfol.io`,
    })
  } catch (err) {
    console.error('Publish error:', err)
    return NextResponse.json({ error: 'Failed to publish' }, { status: 500 })
  }
}
