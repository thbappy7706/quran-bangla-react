import { useState, useMemo } from 'react'
import { Search, X, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SurahCard } from '../components/SurahCard'
import { PageSpinner, ErrorState, Chip, EmptyState } from '../components/UI'
import { Ornament, StarField } from '../components/Decorative'
import { useQuranList, useBookmarks } from '../hooks'
import { cn } from '../utils/cn'

const FILTERS = [
  { label: 'সব', value: 'all' },
  { label: 'মক্কি', value: 'Mecca' },
  { label: 'মাদানি', value: 'Medina' },
  { label: 'বুকমার্ক', value: 'bookmarked' },
]

export default function QuranListPage() {
  const { surahs, loading, error } = useQuranList()
  const { toggle, has }            = useBookmarks()
  const [query, setQuery]          = useState('')
  const [filter, setFilter]        = useState('all')

  const filtered = useMemo(() => {
    let list = surahs
    if (filter === 'Mecca' || filter === 'Medina')
      list = list.filter(s => s.revelationPlace === filter)
    if (filter === 'bookmarked')
      list = list.filter(s => has(s.surahNo))
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(s =>
        s.surahName?.toLowerCase().includes(q) ||
        s.surahNameTranslation?.toLowerCase().includes(q) ||
        s.surahNameArabic?.includes(query) ||
        String(s.surahNo) === q,
      )
    }
    return list
  }, [surahs, filter, query, has])

  if (loading) return <PageSpinner />
  if (error)   return <ErrorState message={`ডেটা লোড করতে সমস্যা: ${error}`} />

  return (
    <div className="relative min-h-screen">
      <StarField className="opacity-[0.025]" />
      <div className="max-w-3xl mx-auto px-4 py-8 pb-28 md:pb-8">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-xs font-display tracking-[0.25em] text-amber-700/60 uppercase mb-2">পবিত্র কুরআন</p>
          <h1 className="text-4xl font-arabic text-amber-300 mb-2">سُوَر القُرآن</h1>
          <Ornament className="w-40 mx-auto my-3" />
          <p className="text-stone-500 text-sm font-bangla">{surahs.length} টি সূরার তালিকা</p>
        </motion.div>

        {/* Search + filter */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 space-y-3"
        >
          {/* Search bar */}
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-800/60" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="সূরার নাম বা নম্বর দিয়ে খুঁজুন…"
              className="w-full bg-stone-900/60 border border-amber-900/30 focus:border-amber-700/60 rounded-2xl pl-11 pr-10 py-3.5 text-sm text-stone-200 placeholder:text-stone-600 outline-none transition-colors font-bangla"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors">
                <X size={15} />
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={13} className="text-amber-800/50" />
            {FILTERS.map(f => (
              <Chip key={f.value} active={filter === f.value} onClick={() => setFilter(f.value)}>
                {f.label}
              </Chip>
            ))}
          </div>

          {/* Result count */}
          {(query || filter !== 'all') && (
            <p className="text-xs text-stone-500 font-bangla">
              {filtered.length} টি সূরা পাওয়া গেছে
            </p>
          )}
        </motion.div>

        {/* List */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <EmptyState message="কোনো সূরা পাওয়া যায়নি" />
          ) : (
            <div className="space-y-2.5">
              {filtered.map((surah, i) => (
                <SurahCard
                  key={surah.surahNo}
                  surah={surah}
                  index={i}
                  hasBookmark={has(surah.surahNo)}
                  onToggleBookmark={toggle}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
