import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://josrhzyubkdbxefppdwu.supabase.co'

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvc3Joenl1YmtkYnhlZnBwZHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNDc2ODksImV4cCI6MjA5NjcyMzY4OX0.e-2ohTNUs29XZreWUvFWWPNfWlTcLR5C8YoHUvM-Hhc'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const portfolio = await getPortfolio(slug)
  if (!portfolio) return { title: 'Portfolio not found' }
  return {
    title: `${portfolio.name} — Portfolio`,
    description: `View ${portfolio.name}'s developer portfolio`,
  }
}

async function getPortfolio(slug: string) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  const { data } = await supabase
    .from('portfolios')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return data
}

export default async function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const portfolio = await getPortfolio(slug)
  if (!portfolio) notFound()

  return (
    <div
      style={{ all: 'unset' }}
      dangerouslySetInnerHTML={{ __html: portfolio.html }}
    />
  )
}
