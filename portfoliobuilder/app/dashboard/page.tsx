export const dynamic = 'force-dynamic'

import ClientLayout from '../client-layout'
import DashboardContent from '@/components/auth/DashboardContent'

export default function DashboardPage() {
  return (
    <ClientLayout>
      <DashboardContent />
    </ClientLayout>
  )
}