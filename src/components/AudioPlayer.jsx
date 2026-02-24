import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react'
import { formatTime } from '../utils/cn'
import { Spinner } from './UI'

export function MiniAudioPlayer({ url, label, onEnded }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loading, setLoading] = useState(false)
  const [curTime, setCurTime] = useState(0)

  useEffect(() => {
    const audio = new Audio(url)
    audioRef.current = audio
    audio.addEventListener('timeupdate', () => { setCurTime(audio.currentTime); setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0) })
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('ended', () => { setPlaying(false); onEnded?.() })
    audio.addEventListener('waiting', () => setLoading(true))
    audio.addEventListener('canplay', () => setLoading(false))
    return () => { audio.pause(); audio.src = '' }
  }, [url])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else { audioRef.current.play().catch(() => { }); setPlaying(true) }
  }

  const seek = (e) => {
    if (!audioRef.current?.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audioRef.current.currentTime = pct * audioRef.current.duration
  }

  return (
    <div className="flex items-center gap-3 bg-stone-900/70 border border-amber-900/30 rounded-xl px-4 py-3">
      {/* Play/Pause */}
      <button
        onClick={toggle}
        className="w-9 h-9 rounded-full bg-amber-600 hover:bg-amber-500 flex items-center justify-center transition-colors flex-shrink-0 shadow-lg shadow-amber-900/30"
      >
        {loading
          ? <Spinner size="sm" />
          : playing
            ? <Pause size={14} className="text-stone-950" fill="currentColor" />
            : <Play size={14} className="text-stone-950 ml-0.5" fill="currentColor" />
        }
      </button>

      {/* Label + progress */}
      <div className="flex-1 min-w-0">
        {label && <p className="text-xs text-amber-400/60 truncate mb-1.5 font-bangla">{label}</p>}
        <div
          className="h-1.5 bg-stone-600 rounded-full cursor-pointer group"
          onClick={seek}
        >
          <div
            className="h-full bg-gradient-to-r from-amber-700 to-amber-400 rounded-full relative transition-all"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity -mr-1.5" />
          </div>
        </div>
      </div>

      {/* Time */}
      <div className="text-xs text-stone-500 flex-shrink-0 tabular-nums">
        {formatTime(curTime)} / {formatTime(duration)}
      </div>
    </div>
  )
}

// ── Full-featured chapter audio bar ─────────────────────────────────────────
export function ChapterPlayer({ url, surahName, reciterName, onClose }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [curTime, setCurTime] = useState(0)
  const [loading, setLoading] = useState(false)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    const audio = new Audio(url)
    audioRef.current = audio
    audio.volume = volume
    audio.addEventListener('timeupdate', () => { setCurTime(audio.currentTime); setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0) })
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('ended', () => setPlaying(false))
    audio.addEventListener('waiting', () => setLoading(true))
    audio.addEventListener('canplay', () => setLoading(false))
    audio.play().catch(() => { })
    setPlaying(true)
    return () => { audio.pause(); audio.src = '' }
  }, [url])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else { audioRef.current.play().catch(() => { }); setPlaying(true) }
  }

  const seek = (pct) => {
    if (!audioRef.current?.duration) return
    audioRef.current.currentTime = (pct / 100) * audioRef.current.duration
  }

  const changeVolume = (v) => {
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  const skip = (secs) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.duration, audioRef.current.currentTime + secs))
  }

  return (
    <div className="glass border-t border-amber-900/30 px-4 py-3 shadow-2xl w-full">
      <div className="max-w-3xl mx-auto">
        {/* Top row */}
        <div className="flex items-center gap-3 mb-2">
          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] md:text-xs font-display tracking-wider text-amber-400 truncate uppercase">{surahName}</p>
            <p className="text-[11px] md:text-xs text-stone-500 truncate font-bangla">{reciterName}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <button onClick={() => skip(-10)} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-amber-400 transition-colors">
              <SkipBack size={16} />
            </button>
            <button
              onClick={toggle}
              className="w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-500 flex items-center justify-center transition-colors shadow-lg shadow-amber-900/30 flex-shrink-0"
            >
              {loading
                ? <Spinner size="sm" />
                : playing
                  ? <Pause size={15} className="text-stone-950" fill="currentColor" />
                  : <Play size={15} className="text-stone-950 ml-0.5" fill="currentColor" />
              }
            </button>
            <button onClick={() => skip(10)} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-amber-400 transition-colors">
              <SkipForward size={16} />
            </button>
          </div>

          {/* Volume + close */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-2 mr-1">
              <Volume2 size={14} className="text-stone-500" />
              <input
                type="range" min={0} max={1} step={0.05} value={volume}
                onChange={e => changeVolume(Number(e.target.value))}
                className="w-20 cursor-pointer"
              />
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-300 transition-colors text-lg">✕</button>
          </div>
        </div>

        {/* Seekbar */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] md:text-xs text-stone-500 tabular-nums w-10">{formatTime(curTime)}</span>
          <input
            type="range" min={0} max={100} step={0.1} value={progress}
            onChange={e => seek(Number(e.target.value))}
            className="flex-1 h-1 cursor-pointer"
          />
          <span className="text-[10px] md:text-xs text-stone-500 tabular-nums w-10 text-right">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}
