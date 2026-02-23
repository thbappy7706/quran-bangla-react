import { Link } from 'react-router-dom'
import { BookOpen, Search, Bookmark, ChevronRight, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { GlowOrb, DoubleOrnament, StarField } from '../components/Decorative'
import { useLastRead } from '../hooks'

const QUICK_LINKS = [
  { label: 'সূরা আল-ফাতিহা', no: 1,   desc: 'The Opening' },
  { label: 'সূরা আল-বাকারা', no: 2,   desc: 'The Cow' },
  { label: 'সূরা ইয়াসীন',   no: 36,  desc: 'Ya Sin' },
  { label: 'সূরা আল-মুলক',  no: 67,  desc: 'The Sovereignty' },
  { label: 'সূরা আল-কাহফ',  no: 18,  desc: 'The Cave' },
  { label: 'সূরা আর-রহমান', no: 55,  desc: 'The Beneficent' },
]

export default function HomePage() {
  const { get: getLastRead } = useLastRead()
  const lastRead = getLastRead()

  return (
    <div className="relative min-h-screen">
      <StarField className="opacity-[0.03]" />
      <GlowOrb className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]" />

      <div className="max-w-3xl mx-auto px-4 py-12 pb-28 md:pb-12">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-display tracking-[0.3em] text-amber-700/60 uppercase mb-6">
            পবিত্র গ্রন্থ
          </p>

          <h1 className="text-7xl md:text-8xl font-arabic text-amber-300 mb-4 leading-none">
            القرآن الكريم
          </h1>

          <DoubleOrnament className="max-w-xs mx-auto my-6" />

          <h2 className="text-2xl md:text-3xl font-display text-amber-400/90 tracking-wider mb-3">
            AL-QUR'AN
          </h2>
          <p className="text-stone-400 font-bangla text-lg">
            বাংলা অনুবাদ সহ পবিত্র কুরআন শরীফ
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link to="/quran" className="btn-gold font-display tracking-wider px-8 py-3 text-base">
            <BookOpen size={18} />
            কুরআন পড়ুন
          </Link>
          <Link to="/search" className="btn-ghost px-8 py-3 text-base font-bangla">
            <Search size={18} />
            সূরা খুঁজুন
          </Link>
        </motion.div>

        {/* Last read */}
        {lastRead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mb-8"
          >
            <Link
              to={`/quran/${lastRead}`}
              className="card flex items-center gap-4 px-5 py-4 border-amber-800/30 bg-amber-900/10 hover:bg-amber-900/20 max-w-sm mx-auto"
            >
              <Clock size={18} className="text-amber-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-stone-500 font-bangla mb-0.5">শেষবার পড়েছেন</p>
                <p className="text-amber-300 font-display tracking-wide text-sm">সূরা নং {lastRead}</p>
              </div>
              <ChevronRight size={16} className="text-stone-600" />
            </Link>
          </motion.div>
        )}

        {/* Quick access */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-xs font-display tracking-widest text-amber-700/70 uppercase text-center mb-5">
            জনপ্রিয় সূরা
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {QUICK_LINKS.map(({ label, no, desc }, i) => (
              <motion.div
                key={no}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.05 }}
              >
                <Link
                  to={`/quran/${no}`}
                  className="card flex items-center gap-3 px-4 py-3 hover:-translate-y-0.5"
                >
                  <span className="w-8 h-8 rounded-lg bg-amber-900/30 border border-amber-800/30 flex items-center justify-center text-xs font-bold text-amber-500 font-display flex-shrink-0">
                    {no}
                  </span>
                  <div className="min-w-0">
                    <p className="text-amber-200 text-sm font-bangla truncate">{label}</p>
                    <p className="text-stone-600 text-xs truncate">{desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-stone-700 ml-auto flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid grid-cols-3 gap-6 text-center border-t border-amber-900/20 pt-10"
        >
          {[
            { value: '১১৪', label: 'সূরা' },
            { value: '৬২৩৬', label: 'আয়াত' },
            { value: '৩০', label: 'পারা' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-arabic text-amber-400 mb-1">{value}</p>
              <p className="text-xs text-stone-500 font-bangla">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
