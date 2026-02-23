import { useState, useEffect, useRef, useCallback } from 'react'
import { API_BASE } from '../utils/constants'

// ── useQuranList ─────────────────────────────────────────────────────────────
export function useQuranList() {
  const [surahs, setSurahs]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE}/bengali.json`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(data => {
        const list = Array.isArray(data) ? data : Object.values(data)
        setSurahs(list.sort((a, b) => a.surahNo - b.surahNo))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { surahs, loading, error }
}

// ── useSurahDetail ───────────────────────────────────────────────────────────
export function useSurahDetail(surahNo) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!surahNo) return
    setLoading(true)
    setData(null)

    fetch(`${API_BASE}/${surahNo}.json`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(d => { setData(d); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [surahNo])

  return { data, loading, error }
}

// ── useAudioPlayer ───────────────────────────────────────────────────────────
export function useAudioPlayer() {
  const audioRef              = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration]       = useState(0)
  const [loading, setLoading] = useState(false)
  const [url, setUrl]         = useState(null)

  // Initialise audio element once
  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime)
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    })
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('ended', () => setPlaying(false))
    audio.addEventListener('waiting', () => setLoading(true))
    audio.addEventListener('canplay', () => setLoading(false))
    audio.addEventListener('error', () => setLoading(false))

    return () => audio.pause()
  }, [])

  const load = useCallback((newUrl) => {
    if (!audioRef.current) return
    if (newUrl === url) {
      // toggle
      if (playing) { audioRef.current.pause(); setPlaying(false) }
      else         { audioRef.current.play();  setPlaying(true)  }
      return
    }
    audioRef.current.pause()
    audioRef.current.src = newUrl
    audioRef.current.load()
    audioRef.current.play()
    setUrl(newUrl)
    setPlaying(true)
    setProgress(0)
    setCurrentTime(0)
  }, [url, playing])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setPlaying(false)
  }, [])

  const seek = useCallback((pct) => {
    if (!audioRef.current?.duration) return
    audioRef.current.currentTime = (pct / 100) * audioRef.current.duration
  }, [])

  return { playing, progress, currentTime, duration, loading, url, load, pause, seek }
}

// ── useBookmarks ─────────────────────────────────────────────────────────────
export function useBookmarks() {
  const KEY = 'quran_bookmarks'
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]') }
    catch { return [] }
  })

  const toggle = useCallback((surahNo) => {
    setBookmarks(prev => {
      const next = prev.includes(surahNo)
        ? prev.filter(n => n !== surahNo)
        : [...prev, surahNo]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const has = useCallback((surahNo) => bookmarks.includes(surahNo), [bookmarks])

  return { bookmarks, toggle, has }
}

// ── useLastRead ───────────────────────────────────────────────────────────────
export function useLastRead() {
  const KEY = 'quran_last_read'

  const save = useCallback((surahNo) => {
    localStorage.setItem(KEY, String(surahNo))
  }, [])

  const get = useCallback(() => {
    const v = localStorage.getItem(KEY)
    return v ? Number(v) : null
  }, [])

  return { save, get }
}
