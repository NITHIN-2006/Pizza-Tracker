import { Pizza, ChevronRight } from 'lucide-react'

const navLinks = [
  { id: 'order', label: 'Order Pizza' },
  { id: 'track', label: 'Track Order' },
  { id: 'admin', label: 'Admin' },
]

export default function Navbar({ activePage, onNavigate }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => onNavigate('order')}
            className="flex items-center gap-2.5 group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-md shadow-brand-200 group-hover:shadow-lg transition-all duration-200">
              <Pizza className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-slate-900">
              Pizza<span className="text-brand-500">Track</span>
            </span>
          </button>

          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative px-4 py-2 rounded-xl text-sm font-600 transition-all duration-200 ${
                  activePage === link.id
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
                {activePage === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-500" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex sm:hidden gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-600 transition-all duration-150 ${
                  activePage === link.id
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {link.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
