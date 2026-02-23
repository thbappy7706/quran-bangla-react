import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, Music, Music2, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSurahDetail, useBookmarks, useLastRead } from '../hooks'
import { RECITERS } from '../utils/constants'
import { VerseCard } from '../components/VerseCard'
import { ReciterSelector } from '../components/ReciterSelector'
import { ChapterPlayer } from '../components/AudioPlayer'
import { PageSpinner, ErrorState } from '../components/UI'
import { DoubleOrnament, StarField, HexBadge } from '../components/Decorative'
import { cn } from '../utils/cn'

export default function SurahDetailPage() {
  const { surahNo } = useParams()
  const no = Number(surahNo)
  const navigate = useNavigate()
  const { data, loading, error } = useSurahDetail(no)
  const { toggle, has } = useBookmarks()
  const { save } = useLastRead()

  const [selectedReciter, setSelectedReciter] = useState(1)
  const [showReciterPanel, setShowReciterPanel] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [highlightedVerse, setHighlightedVerse] = useState(null)

  const isBookmarked = has(no)

  // Save last read
  useEffect(() => { if (no) save(no) }, [no])

  if (loading) return <PageSpinner />
  if (error) return <ErrorState message={`সূরা লোড করতে সমস্যা: ${error}`} />
  if (!data) return null

  const isMecca = data.revelationPlace === 'Mecca'
  const hasPrev = no > 1
  const hasNext = no < 114

  const chapterAudioUrl = data.audio?.[selectedReciter]?.url
  const reciterName = RECITERS[selectedReciter]?.nameBn || RECITERS[selectedReciter]?.name

  const getVerseAudioUrl = (idx) =>
    data.verseAudio?.[selectedReciter]?.audios?.[idx]?.url || null

  return (
    <div className="relative min-h-screen">
      <StarField className="opacity-[0.02]" />

      {/* Sticky top bar */}
      <div className="glass sticky top-0 md:top-14 z-30 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link to="/quran" className="flex items-center gap-1.5 text-amber-600 hover:text-amber-400 transition-colors text-sm flex-shrink-0">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline font-bangla">সূরার তালিকা</span>
          </Link>

          <div className="flex-1 text-center">
            <p className="text-amber-200 font-display tracking-wide text-sm leading-tight">
              {data.surahName}
            </p>
            <p className="text-stone-500 text-xs font-bangla leading-tight">
              {data.totalAyah} আয়াত
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Bookmark */}
            <button
              onClick={() => toggle(no)}
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                isBookmarked ? 'text-amber-400 bg-amber-900/30' : 'text-stone-500 hover:text-amber-500',
              )}
            >
              {isBookmarked ? <BookmarkCheck size={16} fill="currentColor" /> : <Bookmark size={16} />}
            </button>

            {/* Audio toggle — prominent pill button */}
            {chapterAudioUrl && (
              <button
                onClick={() => setShowPlayer(v => !v)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-bangla transition-all duration-200 border',
                  showPlayer
                    ? 'bg-amber-600/20 text-amber-300 border-amber-600/40 hover:bg-amber-600/30'
                    : 'bg-amber-500 text-stone-950 border-amber-400 hover:bg-amber-400 shadow-md shadow-amber-900/30',
                )}
              >
                {showPlayer ? <Music2 size={13} /> : <Music size={13} />}
                {showPlayer ? 'বন্ধ করুন' : 'সূরা শুনুন'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 pb-36 md:pb-16">

        {/* Surah header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <HexBadge number={no} size="lg" />
          </div>
          <h1 className="text-5xl md:text-6xl font-arabic text-amber-300 mb-2 leading-tight">
            {data.surahNameArabicLong || data.surahNameArabic}
          </h1>
          <p className="text-stone-300 text-lg mb-1 font-bangla">{data.surahNameTranslation}</p>
          <div className="flex items-center justify-center gap-3 text-xs text-stone-500 font-bangla mt-2">
            <span className={cn('px-2.5 py-0.5 rounded-full border', isMecca ? 'bg-amber-900/30 text-amber-500 border-amber-800/40' : 'bg-emerald-900/30 text-emerald-500 border-emerald-800/40')}>
              {isMecca ? 'মক্কি' : 'মাদানি'}
            </span>
            <span>·</span>
            <span>{data.totalAyah} আয়াত</span>
            <span>·</span>
            <span>সূরা {no}</span>
          </div>
          <DoubleOrnament className="max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Reciter panel toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowReciterPanel(v => !v)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-amber-900/20 bg-stone-900/30 hover:bg-stone-900/50 transition-all text-sm text-stone-400 hover:text-stone-200"
          >
            <span className="font-bangla">তেলাওয়াতকারী: <span className="text-amber-400">{reciterName}</span></span>
            <ChevronDown size={16} className={cn('transition-transform', showReciterPanel && 'rotate-180')} />
          </button>
          <AnimatePresence>
            {showReciterPanel && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-3">
                  <ReciterSelector selected={selectedReciter} onChange={v => { setSelectedReciter(v); setShowReciterPanel(false) }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bismillah */}
        {no !== 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-8 mb-6 border border-amber-900/20 rounded-2xl bg-stone-900/30"
          >
            <p className="text-3xl md:text-4xl font-arabic text-amber-300 leading-loose">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-stone-500 text-sm mt-2 font-bangla">
              পরম করুণাময় অতি দয়ালু আল্লাহর নামে
            </p>
          </motion.div>
        )}

        {/* Verses */}
        <div className="space-y-3">
          {(data.arabic1 || data.arabic2 || []).map((arabicText, i) => (
            <VerseCard
              key={i}
              index={i}
              arabic={arabicText}
              bengali={(data.bengali || [])[i]}
              english={(data.english || [])[i]}
              audioUrl={getVerseAudioUrl(i)}
              reciterName={reciterName}
              isHighlighted={highlightedVerse === i}
            />
          ))}
        </div>

        {/* Prev/Next navigation */}
        <div className="flex items-center justify-between mt-12 gap-4">
          {hasPrev ? (
            <Link
              to={`/quran/${no - 1}`}
              className="btn-ghost flex-1 justify-start font-bangla"
            >
              <ArrowLeft size={16} />
              সূরা {no - 1}
            </Link>
          ) : <div className="flex-1" />}

          {hasNext ? (
            <Link
              to={`/quran/${no + 1}`}
              className="btn-ghost flex-1 justify-end font-bangla"
            >
              সূরা {no + 1}
              <ArrowRight size={16} />
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>

      {/* Chapter audio player */}
      <AnimatePresence>
        {showPlayer && chapterAudioUrl && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <ChapterPlayer
              url={chapterAudioUrl}
              surahName={`সূরা ${data.surahName}`}
              reciterName={reciterName}
              onClose={() => setShowPlayer(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
