import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Bookmark, Search, Home } from 'lucide-react'
import { cn } from '../utils/cn'

const NAV = [
  { to: '/',          icon: Home,     label: 'হোম'       },
  { to: '/quran',     icon: BookOpen, label: 'কুরআন'     },
  { to: '/bookmarks', icon: Bookmark, label: 'বুকমার্ক'  },
  { to: '/search',    icon: Search,   label: 'খুঁজুন'    },
]

export function Navbar() {
  const loc = useLocation()

  return (
    <>
      {/* Desktop top nav */}
      <header className="glass sticky top-0 z-40 hidden md:block">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="text-2xl font-arabic text-amber-400 leading-none">ق</span>
            <div>
              <span className="font-display text-amber-400 text-sm tracking-widest">AL-QUR'AN</span>
              <span className="text-stone-600 text-xs ml-2 font-bangla">বাংলা</span>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {NAV.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all duration-200 font-bangla',
                  loc.pathname === to || (to !== '/' && loc.pathname.startsWith(to))
                    ? 'bg-amber-900/30 text-amber-400 border border-amber-800/40'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50',
                )}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-amber-900/20 px-2 pb-safe">
        <div className="flex items-center justify-around h-16">
          {NAV.map(({ to, icon: Icon, label }) => {
            const active = loc.pathname === to || (to !== '/' && loc.pathname.startsWith(to))
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200',
                  active ? 'text-amber-400' : 'text-stone-500 hover:text-stone-300',
                )}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                <span className="text-[10px] font-bangla leading-none">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
