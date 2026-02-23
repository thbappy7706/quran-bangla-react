import { motion } from 'framer-motion'
import { Bookmark } from 'lucide-react'
import { useQuranList, useBookmarks } from '../hooks'
import { SurahCard } from '../components/SurahCard'
import { PageSpinner } from '../components/UI'
import { Ornament } from '../components/Decorative'

export default function BookmarksPage() {
  const { surahs, loading } = useQuranList()
  const { toggle, has, bookmarks } = useBookmarks()

  if (loading) return <PageSpinner />

  const bookmarked = surahs.filter(s => has(s.surahNo))

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-28 md:pb-8">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <p className="text-xs font-display tracking-[0.25em] text-amber-700/60 uppercase mb-2">সংরক্ষিত</p>
        <h1 className="text-3xl font-display text-amber-400 mb-2 tracking-wider">বুকমার্ক</h1>
        <Ornament className="w-32 mx-auto" />
        <p className="text-stone-500 text-sm font-bangla mt-3">{bookmarked.length} টি সূরা সংরক্ষিত</p>
      </motion.div>

      {bookmarked.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark size={40} className="text-stone-700 mx-auto mb-4" />
          <p className="text-stone-500 font-bangla">কোনো বুকমার্ক নেই।</p>
          <p className="text-stone-600 text-sm font-bangla mt-1">সূরার তালিকা থেকে বুকমার্ক করুন।</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {bookmarked.map((surah, i) => (
            <SurahCard
              key={surah.surahNo}
              surah={surah}
              index={i}
              hasBookmark={true}
              onToggleBookmark={toggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}
