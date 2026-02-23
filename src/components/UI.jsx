import { cn } from '../utils/cn'

export function Spinner({ size = 'md', className = '' }) {
  const s = { sm: 'w-6 h-6', md: 'w-12 h-12', lg: 'w-16 h-16' }[size]
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn(s, 'rounded-full border-2 border-amber-900 border-t-amber-400 animate-spin')} />
    </div>
  )
}

export function PageSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <Spinner size="lg" />
      <p className="text-stone-500 text-sm font-bangla animate-pulse">লোড হচ্ছে…</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-red-900/20 border border-red-800/30 flex items-center justify-center">
        <span className="text-2xl">⚠</span>
      </div>
      <p className="text-red-400 font-bangla">{message || 'কিছু একটা ভুল হয়েছে।'}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-ghost text-red-400 border-red-900/40 hover:border-red-700/60 hover:text-red-300">
          পুনরায় চেষ্টা করুন
        </button>
      )}
    </div>
  )
}

export function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <p className="text-5xl font-arabic text-stone-700">لا نتائج</p>
      <p className="text-stone-500 text-sm font-bangla">{message || 'কোনো ফলাফল পাওয়া যায়নি'}</p>
    </div>
  )
}

export function Chip({ children, active, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 whitespace-nowrap',
        active
          ? 'bg-amber-700/30 border-amber-600/60 text-amber-300'
          : 'bg-stone-900/40 border-amber-900/20 text-stone-400 hover:border-amber-800/40 hover:text-stone-300',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function Badge({ children, variant = 'default' }) {
  return (
    <span
      className={cn(
        'badge',
        variant === 'mecca'  && 'badge-mecca',
        variant === 'medina' && 'badge-medina',
        variant === 'default' && 'bg-stone-800 text-stone-400 border border-stone-700',
      )}
    >
      {children}
    </span>
  )
}

export function Divider({ className = '' }) {
  return <hr className={cn('border-amber-900/20', className)} />
}

export function SectionTitle({ children, className = '' }) {
  return (
    <h2 className={cn('text-xs font-display tracking-widest uppercase text-amber-700/70', className)}>
      {children}
    </h2>
  )
}
