import { CheckCircle2, Copy, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from '@/hooks/useToast'

export default function OrderSuccess({ orderId, onTrack, onNewOrder }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(orderId)
    toast({ title: 'Copied!', description: 'Order ID copied to clipboard.', variant: 'success' })
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 animate-pop">
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        </div>
        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-xs font-800 text-white animate-bounce">
          🍕
        </span>
      </div>

      <h2 className="font-display text-2xl font-800 text-slate-900 mb-1">Order Placed!</h2>
      <p className="text-slate-500 text-sm mb-6">Your pizza is on its way to the kitchen</p>

      <Card className="w-full max-w-sm border-2 border-dashed border-brand-200 bg-brand-50">
        <CardContent className="p-5 text-center">
          <p className="text-xs font-700 uppercase tracking-wider text-brand-500 mb-2">Your Order ID</p>
          <div className="flex items-center justify-center gap-2">
            <span className="font-display text-2xl font-800 text-slate-900 tracking-wide">{orderId}</span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-400 hover:text-brand-500 hover:bg-brand-100 transition-colors"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">Save this to track your order</p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-sm">
        <Button onClick={onTrack} className="flex-1 gap-2">
          <Search className="h-4 w-4" />
          Track My Order
        </Button>
        <Button onClick={onNewOrder} variant="outline" className="flex-1">
          New Order
        </Button>
      </div>
    </div>
  )
}
