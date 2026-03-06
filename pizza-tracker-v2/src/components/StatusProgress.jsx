import { ClipboardList, ChefHat, Flame, ShieldCheck, CheckCircle2 } from 'lucide-react'

const steps = [
  { key: 'Order placed', icon: ClipboardList, label: 'Placed' },
  { key: 'Preparing', icon: ChefHat, label: 'Preparing' },
  { key: 'Baking', icon: Flame, label: 'Baking' },
  { key: 'Quality Check', icon: ShieldCheck, label: 'Quality Check' },
  { key: 'Ready', icon: CheckCircle2, label: 'Ready!' },
]

export default function StatusProgress({ currentStatus }) {
  const currentIndex = steps.findIndex((s) => s.key === currentStatus)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-slate-200 z-0" />
        <div
          className="absolute left-0 top-5 h-0.5 bg-brand-400 z-0 transition-all duration-700"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          const isPending = index > currentIndex

          return (
            <div key={step.key} className="flex flex-col items-center gap-2 z-10">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                  isCompleted
                    ? 'bg-brand-500 border-brand-500 text-white'
                    : isCurrent
                    ? 'bg-white border-brand-500 text-brand-500 shadow-md shadow-brand-100'
                    : 'bg-white border-slate-200 text-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {isCurrent && (
                  <span className="absolute h-10 w-10 rounded-full bg-brand-400 opacity-20 animate-pulse-ring" />
                )}
              </div>
              <span
                className={`text-xs font-600 text-center leading-tight ${
                  isCompleted || isCurrent ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
