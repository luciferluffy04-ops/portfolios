export const dynamic = 'force-dynamic'

import { BuilderProvider } from '@/components/builder/BuilderContext'
import { BuilderShell } from '@/components/builder/BuilderShell'

export default function BuilderPage() {
  return (
    <BuilderProvider>
      <BuilderShell />
    </BuilderProvider>
  )
}
