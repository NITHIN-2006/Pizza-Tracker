import { Badge } from '@/components/ui/badge'
import { ClipboardList, ChefHat, Flame, ShieldCheck, CheckCircle2 } from 'lucide-react'

const statusConfig = {
  'Order placed': {
    variant: 'placed',
    icon: ClipboardList,
    label: 'Order Placed',
  },
  'Preparing': {
    variant: 'preparing',
    icon: ChefHat,
    label: 'Preparing',
  },
  'Baking': {
    variant: 'baking',
    icon: Flame,
    label: 'Baking',
  },
  'Quality Check': {
    variant: 'quality',
    icon: ShieldCheck,
    label: 'Quality Check',
  },
  'Ready': {
    variant: 'ready',
    icon: CheckCircle2,
    label: 'Ready!',
  },
}

export default function StatusBadge({ status, size = 'md' }) {
  const config = statusConfig[status] || statusConfig['Order placed']
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={`gap-1.5 font-700 ${size === 'lg' ? 'text-sm px-4 py-1.5' : ''}`}>
      <Icon className={size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'} />
      {config.label}
    </Badge>
  )
}

export { statusConfig }
