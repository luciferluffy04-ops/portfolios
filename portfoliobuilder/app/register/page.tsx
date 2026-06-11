export const dynamic = 'force-dynamic'

import ClientLayout from '../client-layout'
import RegisterForm from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <ClientLayout>
      <RegisterForm />
    </ClientLayout>
  )
}