export const dynamic = 'force-dynamic'

import ClientLayout from '../client-layout'
import VerifyEmailForm from '@/components/auth/VerifyEmailForm'

export default function VerifyEmailPage() {
  return (
    <ClientLayout>
      <VerifyEmailForm />
    </ClientLayout>
  )
}