export const dynamic = 'force-dynamic'

import ClientLayout from '../../client-layout'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <ClientLayout>
      <ResetPasswordForm />
    </ClientLayout>
  )
}
