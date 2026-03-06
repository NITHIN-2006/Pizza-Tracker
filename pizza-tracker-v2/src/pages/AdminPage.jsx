import { useState } from 'react'
import { Search, ShieldCheck, Loader2, Package, User, Phone, MapPin, Pizza, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import StatusBadge from '@/components/StatusBadge'
import StatusProgress from '@/components/StatusProgress'
import { getOrder, updateOrderStatus } from '@/lib/api'
import { toast } from '@/hooks/useToast'

const STATUSES = ['Order placed', 'Preparing', 'Baking', 'Quality Check', 'Ready']

function normalizeOrderItems(order) {
  const raw = order?.pizzas || order?.items || []

  if (raw.length === 0) return []

  if (typeof raw[0] === 'object' && raw[0] !== null) {
    return raw.map((item) => ({
      name: item.pizza || item.name || item.type || 'Pizza',
      size: item.size || '',
      instructions: item.instructions || '',
    }))
  }

  const sizes = order?.sizes || []
  const instructions = order?.instructions || []
  return raw.map((name, i) => ({
    name: String(name),
    size: sizes[i] || '',
    instructions: instructions[i] || '',
  }))
}

export default function AdminPage() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [searched, setSearched] = useState(false)

  const handleFetch = async () => {
    if (!orderId.trim()) {
      toast({ title: 'Enter Order ID', description: 'Please enter an order ID.', variant: 'destructive' })
      return
    }
    setLoading(true)
    setSearched(true)
    try {
      const data = await getOrder(orderId.trim())
      setOrder(data)
      setNewStatus(data.status)
    } catch {
      setOrder(null)
      toast({ title: 'Order not found', description: 'No order found with that ID.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    if (!newStatus || newStatus === order?.status) {
      toast({ title: 'No change', description: 'Please select a different status.', variant: 'destructive' })
      return
    }
    setUpdating(true)
    try {
      const updated = await updateOrderStatus(orderId.trim(), newStatus)
      setOrder((prev) => ({ ...prev, status: newStatus, ...updated }))
      toast({ title: 'Status updated!', description: `Order is now: ${newStatus}`, variant: 'success' })
    } catch (err) {
      toast({ title: 'Update failed', description: err?.response?.data?.message || 'Could not update status.', variant: 'destructive' })
    } finally {
      setUpdating(false)
    }
  }

  const items = order ? normalizeOrderItems(order) : []

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div className="animate-fade-in">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <h1 className="font-display text-3xl font-800 text-slate-900">Admin Panel</h1>
        </div>
        <p className="text-slate-500">Manage and update order statuses</p>
      </div>

      <Card className="shadow-sm animate-fade-in border-2 border-slate-900/10 bg-slate-900/[0.02]" style={{ animationDelay: '0.1s' }}>
        <CardContent className="p-6">
          <div className="flex gap-3">
            <div className="flex-1 space-y-1.5">
              <Label>Order ID</Label>
              <div className="relative">
                <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  className="pl-10 font-mono"
                  placeholder="Enter order ID to manage..."
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleFetch}
                disabled={loading}
                className="gap-2 h-11 bg-slate-900 text-white hover:bg-slate-800"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                Fetch
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <div className="flex items-center justify-center py-12 gap-3 text-slate-500 animate-fade-in">
          <Loader2 className="h-6 w-6 animate-spin text-slate-700" />
          <span className="font-medium">Loading order...</span>
        </div>
      )}

      {!loading && order && (
        <div className="space-y-4 animate-fade-in">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardDescription>Order ID</CardDescription>
                  <CardTitle className="font-mono text-lg mt-0.5">{order.id || order._id || orderId}</CardTitle>
                </div>
                <StatusBadge status={order.status} size="lg" />
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <StatusProgress currentStatus={order.status} />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                    <User className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-600">Name</p>
                    <p className="text-sm font-700 text-slate-800">{order.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                    <Phone className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-600">Phone</p>
                    <p className="text-sm font-700 text-slate-800">{order.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                    <MapPin className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-600">Address</p>
                    <p className="text-sm font-700 text-slate-800 truncate">{order.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
              <CardDescription>Change the current order status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select new status..." />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleUpdate}
                  disabled={updating || !newStatus || newStatus === order.status}
                  className="gap-2 shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  {updating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>{items.length} pizza{items.length !== 1 ? 's' : ''}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                    <Pizza className="h-4 w-4 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-700 text-sm text-slate-900">{item.name}</span>
                      {item.size && (
                        <span className="text-xs font-600 text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                          {item.size}
                        </span>
                      )}
                    </div>
                    {item.instructions && (
                      <p className="text-xs text-slate-500 mt-0.5 italic">"{item.instructions}"</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {!loading && searched && !order && (
        <div className="flex flex-col items-center justify-center py-12 gap-2 animate-fade-in text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 mb-2">
            <ShieldCheck className="h-7 w-7 text-slate-400" />
          </div>
          <p className="font-700 text-slate-700">Order not found</p>
          <p className="text-sm text-slate-500">Verify the order ID and try again</p>
        </div>
      )}
    </div>
  )
}
