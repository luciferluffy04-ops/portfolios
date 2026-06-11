import dynamic from 'next/dynamic'

const DashboardPage = dynamic(() => import('@/components/auth/DashboardContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

export default DashboardPage