import { NextRequest, NextResponse } from 'next/server'
import { parseResumeText } from '@/lib/resumeParser'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    let text = ''

    if (file.name.endsWith('.pdf')) {
      // Dynamic import to avoid Edge runtime issues
      const pdfParse = (await import('pdf-parse')).default
      const data = await pdfParse(buffer)
      text = data.text
    } else if (file.name.endsWith('.docx')) {
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 })
    }

    // Use AI if ANTHROPIC_API_KEY is set, otherwise use local parser
    if (process.env.ANTHROPIC_API_KEY) {
      return await parseWithAI(text)
    }

    const parsed = parseResumeText(text)
    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Resume parse error:', err)
    return NextResponse.json({ error: 'Failed to parse resume' }, { status: 500 })
  }
}

async function parseWithAI(resumeText: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `Extract information from this resume and return ONLY a JSON object with this exact structure, no markdown:
{
  "name": "Full name",
  "title": "Job title",
  "bio": "2-3 sentence professional summary",
  "email": "email address",
  "github": "github URL or empty string",
  "linkedin": "linkedin URL or empty string",
  "location": "city, country or empty string",
  "skills": ["skill1", "skill2"],
  "projects": [
    { "name": "project name", "description": "description", "tech": ["tech1"], "url": "" }
  ],
  "experience": [
    { "company": "company", "role": "role title", "period": "2022-2024", "bullets": ["achievement"] }
  ],
  "education": "degree and institution"
}

Resume text:
${resumeText.slice(0, 4000)}`,
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`)
  }

  const data = await response.json()
  const content = data.content[0]?.text || '{}'

  try {
    const parsed = JSON.parse(content.replace(/```json|```/g, '').trim())
    return NextResponse.json(parsed)
  } catch {
    // Fallback to local parser
    const { parseResumeText } = await import('@/lib/resumeParser')
    return NextResponse.json(parseResumeText(content))
  }
}
