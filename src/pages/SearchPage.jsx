import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuranList, useBookmarks } from '../hooks'
import { SurahCard } from '../components/SurahCard'
import { PageSpinner, EmptyState } from '../components/UI'
import { Ornament } from '../components/Decorative'

export default function SearchPage() {
  const { surahs, loading }    = useQuranList()
  const { toggle, has }        = useBookmarks()
  const [query, setQuery]      = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return surahs.filter(s =>
      s.surahName?.toLowerCase().includes(q) ||
      s.surahNameTranslation?.toLowerCase().includes(q) ||
      s.surahNameArabic?.includes(query) ||
      String(s.surahNo) === q ||
      s.surahNameArabicLong?.includes(query),
    )
  }, [surahs, query])

  if (loading) return <PageSpinner />

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-28 md:pb-8">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <p className="text-xs font-display tracking-[0.25em] text-amber-700/60 uppercase mb-2">অনুসন্ধান</p>
        <h1 className="text-3xl font-display text-amber-400 mb-2 tracking-wider">সূরা খুঁজুন</h1>
        <Ornament className="w-32 mx-auto" />
      </motion.div>

      {/* Search input */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700/60" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="সূরার নাম, ইংরেজি বা আরবিতে খুঁজুন…"
            className="w-full bg-stone-900/60 border border-amber-900/30 focus:border-amber-700/60 rounded-2xl pl-12 pr-10 py-4 text-sm text-stone-200 placeholder:text-stone-600 outline-none transition-colors font-bangla"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors">
              <X size={16} />
            </button>
          )}
        </div>
        {query && (
          <p className="text-xs text-stone-500 font-bangla mt-2 pl-1">
            {results.length} টি ফলাফল পাওয়া গেছে
          </p>
        )}
      </motion.div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {!query ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-5xl font-arabic text-stone-800 mb-3">ابحث</p>
            <p className="text-stone-600 font-bangla text-sm">নাম বা নম্বর লিখুন</p>
          </motion.div>
        ) : results.length === 0 ? (
          <EmptyState message={`"${query}" এর জন্য কোনো ফলাফল নেই`} />
        ) : (
          <div className="space-y-2.5">
            {results.map((surah, i) => (
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
  )
}
