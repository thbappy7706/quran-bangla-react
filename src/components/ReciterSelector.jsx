import { RECITERS } from '../utils/constants'
import { cn } from '../utils/cn'

export function ReciterSelector({ selected, onChange, className = '' }) {
  return (
    <div className={cn('space-y-2', className)}>
      <p className="text-xs text-amber-700/70 tracking-widest uppercase font-display">
        তেলাওয়াতকারী
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {Object.entries(RECITERS).map(([id, r]) => {
          const active = selected === Number(id)
          return (
            <button
              key={id}
              onClick={() => onChange(Number(id))}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-200',
                active
                  ? 'bg-amber-900/30 border-amber-700/60 text-amber-200'
                  : 'bg-stone-900/40 border-amber-900/20 text-stone-400 hover:border-amber-800/40 hover:text-stone-300 hover:bg-stone-800/40',
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold font-display transition-colors',
                active ? 'bg-amber-700 text-stone-950' : 'bg-stone-800 text-stone-500',
              )}>
                {id}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium leading-tight truncate">{r.name}</p>
                <p className={cn('text-[10px] font-arabic leading-tight truncate', active ? 'text-amber-500/70' : 'text-stone-600')}>
                  {r.nameAr}
                </p>
              </div>
              {active && (
                <div className="ml-auto w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 shadow-sm shadow-amber-400/50" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
