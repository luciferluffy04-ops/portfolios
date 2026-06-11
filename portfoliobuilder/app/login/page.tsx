export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import ClientLayout from '../client-layout'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <ClientLayout>
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </ClientLayout>
  )
}