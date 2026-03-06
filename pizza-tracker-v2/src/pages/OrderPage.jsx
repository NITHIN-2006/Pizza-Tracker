import { useState, useEffect } from 'react'
import { Plus, ShoppingBag, User, Phone, MapPin, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PizzaItem from '@/components/order/PizzaItem'
import OrderSuccess from '@/components/order/OrderSuccess'
import { getOptions, createOrder } from '@/lib/api'
import { toast } from '@/hooks/useToast'

const defaultPizzaItem = () => ({ pizza: '', size: '', instructions: '' })

export default function OrderPage({ onNavigateToTrack }) {
  const [options, setOptions] = useState({ pizzaTypes: [], pizzaSizes: [] })
  const [loadingOptions, setLoadingOptions] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
  })

  const [pizzaItems, setPizzaItems] = useState([defaultPizzaItem()])

  useEffect(() => {
    getOptions()
      .then(setOptions)
      .catch(() => toast({ title: 'Error', description: 'Failed to load menu options.', variant: 'destructive' }))
      .finally(() => setLoadingOptions(false))
  }, [])

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handlePizzaChange = (index, field, value) => {
    setPizzaItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const addPizza = () => {
    if (pizzaItems.length >= 10) return
    setPizzaItems((prev) => [...prev, defaultPizzaItem()])
  }

  const removePizza = (index) => {
    setPizzaItems((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast({ title: 'Missing info', description: 'Please fill in your name, phone, and address.', variant: 'destructive' })
      return
    }

    const invalidPizzas = pizzaItems.filter((p) => !p.pizza || !p.size)
    if (invalidPizzas.length > 0) {
      toast({ title: 'Incomplete pizza', description: 'Please select a type and size for each pizza.', variant: 'destructive' })
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        pizzas: pizzaItems.map((p) => p.pizza),
        sizes: pizzaItems.map((p) => p.size),
        instructions: pizzaItems.map((p) => p.instructions.trim()),
      }
      const result = await createOrder(payload)
      const extractedId = result?.id || result?.orderId || result?._id || result?.order?.id || result?.order?._id
      setOrderId(String(extractedId))
    } catch (err) {
      toast({ title: 'Order failed', description: err?.response?.data?.message || 'Something went wrong. Try again.', variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleNewOrder = () => {
    setOrderId(null)
    setForm({ name: '', phone: '', address: '' })
    setPizzaItems([defaultPizzaItem()])
  }

  if (orderId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <OrderSuccess
              orderId={orderId}
              onTrack={() => onNavigateToTrack(orderId)}
              onNewOrder={handleNewOrder}
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-3xl font-800 text-slate-900">Order Pizza</h1>
        <p className="text-slate-500 mt-1">Fresh out of the oven in 30 minutes or less</p>
      </div>

      <Card className="shadow-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle>Your Details</CardTitle>
          <CardDescription>We'll use this to deliver your order</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Full Name</Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                className="pl-10"
                placeholder="John Smith"
                value={form.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                className="pl-10"
                placeholder="+1 (555) 000-0000"
                type="tel"
                value={form.phone}
                onChange={(e) => handleFormChange('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Delivery Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                className="pl-10"
                placeholder="123 Main Street, City, State"
                value={form.address}
                onChange={(e) => handleFormChange('address', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Pizzas</CardTitle>
              <CardDescription>Add up to 10 pizzas per order</CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPizza}
              disabled={loadingOptions || pizzaItems.length >= 10}
              className="gap-1.5"
            >
              <Plus className="h-4 w-4" />
              Add Pizza
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {loadingOptions ? (
            <div className="flex items-center justify-center py-10 gap-3 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-medium">Loading menu...</span>
            </div>
          ) : (
            pizzaItems.map((item, index) => (
              <PizzaItem
                key={index}
                index={index}
                item={item}
                pizzaTypes={options.pizzaTypes}
                pizzaSizes={options.pizzaSizes}
                onChange={handlePizzaChange}
                onRemove={() => removePizza(index)}
                canRemove={pizzaItems.length > 1}
              />
            ))
          )}
        </CardContent>
      </Card>

      <div className="animate-fade-in pb-4" style={{ animationDelay: '0.3s' }}>
        <Button
          size="xl"
          className="w-full gap-3 text-base"
          onClick={handleSubmit}
          disabled={submitting || loadingOptions}
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Placing Order...
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" />
              Place Order — {pizzaItems.length} Pizza{pizzaItems.length > 1 ? 's' : ''}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
