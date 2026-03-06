import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import OrderPage from '@/pages/OrderPage'
import TrackPage from '@/pages/TrackPage'
import AdminPage from '@/pages/AdminPage'
import { Toaster } from '@/components/ui/toaster'

export default function App() {
  const [page, setPage] = useState('order')
  const [trackOrderId, setTrackOrderId] = useState('')

  const handleNavigateToTrack = (orderId) => {
    setTrackOrderId(orderId)
    setPage('track')
  }

  const handleNavigate = (newPage) => {
    setPage(newPage)
    if (newPage !== 'track') setTrackOrderId('')
  }

  return (
    <div className="min-h-screen">
      <Navbar activePage={page} onNavigate={handleNavigate} />

      <main className="pb-16">
        {page === 'order' && <OrderPage onNavigateToTrack={handleNavigateToTrack} />}
        {page === 'track' && <TrackPage prefillOrderId={trackOrderId} />}
        {page === 'admin' && <AdminPage />}
      </main>

      <Toaster />
    </div>
  )
}
