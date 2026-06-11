export const dynamic = 'force-dynamic'

import ClientLayout from './client-layout'
import HomePageContent from '@/components/HomePageContent'

export default function HomePage() {
  return (
    <ClientLayout>
      <HomePageContent />
    </ClientLayout>
  )
}