export const dynamic = 'force-dynamic'

import ClientLayout from '../client-layout'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <ClientLayout>
      <LoginForm />
    </ClientLayout>
  )
}