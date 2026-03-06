import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function PizzaItem({ index, item, pizzaTypes, pizzaSizes, onChange, onRemove, canRemove }) {
  return (
    <div className="animate-fade-in rounded-xl border-2 border-slate-100 bg-slate-50/60 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-xs font-800 text-white">
            {index + 1}
          </span>
          <span className="text-sm font-700 text-slate-700">Pizza #{index + 1}</span>
        </div>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Pizza Type</Label>
          <Select
            value={item.pizza}
            onValueChange={(val) => onChange(index, 'pizza', val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent>
              {pizzaTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Size</Label>
          <Select
            value={item.size}
            onValueChange={(val) => onChange(index, 'size', val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size..." />
            </SelectTrigger>
            <SelectContent>
              {pizzaSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Special Instructions <span className="normal-case text-slate-400 font-500">(optional)</span></Label>
        <Textarea
          placeholder="e.g. extra cheese, no onions, well done..."
          value={item.instructions}
          onChange={(e) => onChange(index, 'instructions', e.target.value)}
          className="min-h-[60px]"
        />
      </div>
    </div>
  )
}
