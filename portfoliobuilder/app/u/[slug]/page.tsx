import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const portfolio = await getPortfolio(params.slug)
  if (!portfolio) return { title: 'Portfolio not found' }
  return {
    title: `${portfolio.name} — Portfolio`,
    description: `View ${portfolio.name}'s developer portfolio`,
  }
}

async function getPortfolio(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
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
  params: { slug: string }
}) {
  const portfolio = await getPortfolio(params.slug)
  if (!portfolio) notFound()

  return (
    <div
      style={{ all: 'unset' }}
      dangerouslySetInnerHTML={{ __html: portfolio.html }}
    />
  )
}