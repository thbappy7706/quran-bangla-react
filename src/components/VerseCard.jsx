import { useState } from 'react'
import { Headphones, Copy, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MiniAudioPlayer } from './AudioPlayer'
import { cn } from '../utils/cn'

export function VerseCard({ index, arabic, bengali, english, audioUrl, reciterName, isHighlighted }) {
  const [showAudio, setShowAudio] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyText = async () => {
    try {
      const text = [arabic, bengali, english].filter(Boolean).join('\n')
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.6) }}
      className={cn(
        'group border rounded-2xl overflow-hidden transition-all duration-300',
        isHighlighted
          ? 'border-amber-700/50 bg-amber-900/20 shadow-lg shadow-amber-900/20'
          : 'border-amber-900/20 hover:border-amber-800/40 bg-stone-900/30 hover:bg-stone-900/50',
      )}
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        {/* Verse number */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 40 40" className="w-8 h-8 absolute inset-0">
              <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" fill="#1c1008" stroke="#92400e" strokeWidth="1.5" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-amber-400 font-display">
              {index + 1}
            </span>
          </div>
          <span className="text-xs text-stone-600 font-bangla">আয়াত {index + 1}</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={copyText}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-500 hover:text-amber-400 hover:bg-amber-900/20 transition-colors"
            title="কপি করুন"
          >
            {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
          </button>
          {audioUrl && (
            <button
              onClick={() => setShowAudio(v => !v)}
              className={cn(
                'w-7 h-7 flex items-center justify-center rounded-lg transition-colors',
                showAudio
                  ? 'text-amber-400 bg-amber-900/30'
                  : 'text-stone-500 hover:text-amber-400 hover:bg-amber-900/20',
              )}
              title="শুনুন"
            >
              <Headphones size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Verse content */}
      <div className="px-5 pb-4 space-y-3">

        {/* Arabic text */}
        {arabic && (
          <p
            className={cn(
              'text-right text-2xl md:text-3xl leading-[2.2] transition-colors duration-300',
              isHighlighted ? 'text-amber-200' : 'text-amber-300/90',
            )}
            style={{ fontFamily: "'Amiri', serif" }}
            dir="rtl"
          >
            {arabic}
          </p>
        )}

        {/* Divider */}
        {arabic && (bengali || english) && (
          <div className="border-t border-amber-900/20" />
        )}

        {/* Bengali translation */}
        {bengali && (
          <p
            className={cn(
              'text-base leading-[1.9] transition-colors duration-300',
              isHighlighted ? 'text-amber-100' : 'text-stone-200',
            )}
            style={{ fontFamily: "'Noto Serif Bengali', serif" }}
          >
            {bengali}
          </p>
        )}

        {/* English translation (subtle) */}
        {english && (
          <p className="text-sm leading-relaxed text-stone-500 italic">
            {english}
          </p>
        )}

        {/* Audio panel */}
        <AnimatePresence>
          {showAudio && audioUrl && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-1">
                <MiniAudioPlayer url={audioUrl} label={reciterName} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
