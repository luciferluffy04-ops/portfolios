export const dynamic = 'force-dynamic'

import ClientLayout from '../client-layout'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <ClientLayout>
      <ForgotPasswordForm />
    </ClientLayout>
  )
}