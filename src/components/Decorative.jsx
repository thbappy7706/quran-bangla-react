// ── Islamic geometric ornaments ──────────────────────────────────────────────

export function Ornament({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : {}}
      aria-hidden="true"
    >
      <path d="M0 12 Q60 2 120 12 Q180 22 240 12" stroke="#92400e" strokeWidth="1" fill="none" />
      <path d="M0 12 Q60 5 120 12 Q180 19 240 12" stroke="#b45309" strokeWidth="0.5" fill="none" opacity="0.5" />
      <circle cx="120" cy="12" r="3.5" fill="#b45309" opacity="0.9" />
      <circle cx="60"  cy="7"  r="2"   fill="#b45309" opacity="0.5" />
      <circle cx="180" cy="17" r="2"   fill="#b45309" opacity="0.5" />
      <circle cx="20"  cy="12" r="1.5" fill="#92400e" opacity="0.4" />
      <circle cx="220" cy="12" r="1.5" fill="#92400e" opacity="0.4" />
    </svg>
  )
}

export function DoubleOrnament({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Ornament className="flex-1" />
      <svg viewBox="0 0 32 32" className="w-6 h-6 flex-shrink-0" aria-hidden>
        <polygon points="16,2 30,9 30,23 16,30 2,23 2,9" fill="#1c1008" stroke="#92400e" strokeWidth="1.5" />
        <polygon points="16,6 27,12 27,20 16,26 5,20 5,12" fill="none" stroke="#b45309" strokeWidth="0.5" />
        <circle cx="16" cy="16" r="3" fill="#b45309" opacity="0.8" />
      </svg>
      <Ornament className="flex-1" flip />
    </div>
  )
}

export function StarField({ className = '' }) {
  return (
    <svg
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id="starPat" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <polygon
            points="50,5 56,35 86,35 63,54 72,84 50,65 28,84 37,54 14,35 44,35"
            fill="#fbbf24"
            opacity="0.04"
          />
          <circle cx="10" cy="10" r="0.8" fill="#fbbf24" opacity="0.06" />
          <circle cx="80" cy="70" r="0.6" fill="#fbbf24" opacity="0.04" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#starPat)" />
    </svg>
  )
}

export function HexBadge({ number, size = 'md' }) {
  const sizes = {
    sm: { outer: 40, stroke: 1.2, fontSize: 11 },
    md: { outer: 52, stroke: 1.5, fontSize: 13 },
    lg: { outer: 64, stroke: 2,   fontSize: 16 },
  }
  const s = sizes[size]
  return (
    <div className="relative flex-shrink-0 flex items-center justify-center" style={{ width: s.outer, height: s.outer }}>
      <svg viewBox="0 0 60 60" style={{ width: s.outer, height: s.outer }}>
        <polygon points="30,3 55,16.5 55,43.5 30,57 5,43.5 5,16.5" fill="#1c1008" stroke="#92400e" strokeWidth={s.stroke} />
        <polygon points="30,8 50,19.5 50,40.5 30,52 10,40.5 10,19.5" fill="none" stroke="#b45309" strokeWidth="0.5" opacity="0.6" />
      </svg>
      <span
        className="absolute font-bold text-amber-400"
        style={{ fontSize: s.fontSize, fontFamily: 'Cinzel, serif' }}
      >
        {number}
      </span>
    </div>
  )
}

export function GlowOrb({ className = '' }) {
  return (
    <div
      className={`pointer-events-none rounded-full bg-amber-900/20 blur-3xl animate-glow-pulse ${className}`}
      aria-hidden="true"
    />
  )
}
