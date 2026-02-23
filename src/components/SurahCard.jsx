import { Link } from 'react-router-dom'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { HexBadge } from './Decorative'
import { Badge } from './UI'
import { REVELATION_BN } from '../utils/constants'
import { cn } from '../utils/cn'

export function SurahCard({ surah, index = 0, hasBookmark, onToggleBookmark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.5) }}
    >
      <Link
        to={`/quran/${surah.surahNo}`}
        className="card flex items-center gap-4 p-4 group block hover:shadow-lg hover:shadow-amber-900/10 hover:-translate-y-0.5 transition-all duration-300"
      >
        {/* Number hex */}
        <HexBadge number={surah.surahNo} size="md" />

        {/* Names */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <h3 className="text-amber-200 font-semibold text-sm leading-tight font-display tracking-wide">
                {surah.surahName}
              </h3>
              <p className="text-stone-400 text-xs mt-0.5 font-bangla">
                {surah.surahNameTranslation}
              </p>
            </div>
            <p className="text-amber-400 text-xl font-arabic flex-shrink-0 leading-tight">
              {surah.surahNameArabic}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={surah.revelationPlace === 'Mecca' ? 'mecca' : 'Madina'}>
              {REVELATION_BN[surah.revelationPlace] || surah.revelationPlace}
            </Badge>
            <span className="text-stone-600 text-xs font-bangla">
              {surah.totalAyah} আয়াত
            </span>
          </div>
        </div>

        {/* Bookmark button */}
        <button
          onClick={e => { e.preventDefault(); onToggleBookmark?.(surah.surahNo) }}
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
            hasBookmark
              ? 'text-amber-400 bg-amber-900/30 hover:bg-amber-900/50'
              : 'text-stone-600 hover:text-amber-500 hover:bg-amber-900/20 opacity-0 group-hover:opacity-100',
          )}
          title={hasBookmark ? 'বুকমার্ক সরান' : 'বুকমার্ক করুন'}
        >
          {hasBookmark
            ? <BookmarkCheck size={16} fill="currentColor" />
            : <Bookmark      size={16} />
          }
        </button>
      </Link>
    </motion.div>
  )
}
