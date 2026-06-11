export const dynamic = 'force-dynamic'

import ClientLayout from '../client-layout'
import { BuilderProvider } from '@/components/builder/BuilderContext'
import { BuilderShell } from '@/components/builder/BuilderShell'

export default function BuilderPage() {
  return (
    <ClientLayout>
      <BuilderProvider>
        <BuilderShell />
      </BuilderProvider>
    </ClientLayout>
  )
}