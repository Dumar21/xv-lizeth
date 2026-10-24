type IconProps = { className?: string; style?: React.CSSProperties };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

export function CalendarIcon({ className, style }: IconProps) {
  return (
    <svg {...stroke} className={className} style={style}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function PinIcon({ className, style }: IconProps) {
  return (
    <svg {...stroke} className={className} style={style}>
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function HeartIcon({ className, style }: IconProps) {
  return (
    <svg {...stroke} className={className} style={style}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.6-7 10-7 10z" />
    </svg>
  );
}

export function CheckIcon({ className, style }: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} className={className} style={style}>
      <path className="draw" pathLength={1} d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function SparkleIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className} style={style}>
      <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" fill="none" aria-hidden className={`h-6 w-60 text-oro ${className}`}>
      <defs>
        <linearGradient id="dv-l" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#d4af37" stopOpacity="0" />
          <stop offset="1" stopColor="#d4af37" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="dv-r" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#d4af37" stopOpacity="0.9" />
          <stop offset="1" stopColor="#d4af37" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 12H100" stroke="url(#dv-l)" />
      <path d="M140 12H240" stroke="url(#dv-r)" />
      <path d="M120 3l7 9-7 9-7-9z" fill="currentColor" />
      <circle cx="107" cy="12" r="1.8" fill="currentColor" />
      <circle cx="133" cy="12" r="1.8" fill="currentColor" />
    </svg>
  );
}

/** Wide ornamental divider that fills more horizontal space */
export function WideOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 48" fill="none" aria-hidden className={`h-12 w-full max-w-2xl text-oro ${className}`}>
      <defs>
        <linearGradient id="wo-l" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#d4af37" stopOpacity="0" />
          <stop offset="1" stopColor="#d4af37" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="wo-r" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#d4af37" stopOpacity="0.7" />
          <stop offset="1" stopColor="#d4af37" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Left branch */}
      <path d="M0 24H240" stroke="url(#wo-l)" strokeWidth="0.5" />
      <path d="M180 24 Q210 10 240 24 Q210 38 180 24Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.5" />
      {/* Right branch */}
      <path d="M360 24H600" stroke="url(#wo-r)" strokeWidth="0.5" />
      <path d="M420 24 Q390 10 360 24 Q390 38 420 24Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.5" />
      {/* Center motif */}
      <path d="M300 8l12 16-12 16-12-16z" fill="currentColor" fillOpacity="0.3" />
      <path d="M300 12l8 12-8 12-8-12z" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="0.7" />
      <circle cx="300" cy="24" r="3" fill="currentColor" fillOpacity="0.5" />
      {/* Flourish dots */}
      <circle cx="250" cy="24" r="2" fill="currentColor" fillOpacity="0.4" />
      <circle cx="260" cy="24" r="1.2" fill="currentColor" fillOpacity="0.3" />
      <circle cx="350" cy="24" r="2" fill="currentColor" fillOpacity="0.4" />
      <circle cx="340" cy="24" r="1.2" fill="currentColor" fillOpacity="0.3" />
      {/* Corner curls */}
      <path d="M240 24 Q255 14 270 18" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.5" />
      <path d="M240 24 Q255 34 270 30" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.5" />
      <path d="M360 24 Q345 14 330 18" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.5" />
      <path d="M360 24 Q345 34 330 30" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.5" />
    </svg>
  );
}

/** Side flourish that sits on left or right edges to fill empty space */
export function SideFlourish({ side, className = "" }: { side: "left" | "right"; className?: string }) {
  const flip = side === "right" ? "scale(-1, 1)" : undefined;
  return (
    <svg
      viewBox="0 0 120 400"
      fill="none"
      aria-hidden
      className={`pointer-events-none text-oro ${className}`}
      style={{ transform: flip }}
    >
      <defs>
        <linearGradient id={`sf-${side}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d4af37" stopOpacity="0" />
          <stop offset="0.3" stopColor="#d4af37" stopOpacity="0.3" />
          <stop offset="0.7" stopColor="#d4af37" stopOpacity="0.3" />
          <stop offset="1" stopColor="#d4af37" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Vertical vine */}
      <path d="M60 0V400" stroke={`url(#sf-${side})`} strokeWidth="0.5" />
      {/* Leaves / Curls */}
      <path d="M60 80 Q30 60 20 80 Q30 100 60 80" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.5" />
      <path d="M60 140 Q90 120 100 140 Q90 160 60 140" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.15" strokeWidth="0.5" />
      <path d="M60 200 Q30 180 15 200 Q30 220 60 200" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.5" />
      <path d="M60 260 Q90 240 105 260 Q90 280 60 260" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.15" strokeWidth="0.5" />
      <path d="M60 320 Q30 300 20 320 Q30 340 60 320" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.5" />
      {/* Diamonds */}
      <path d="M60 110l5 8-5 8-5-8z" fill="currentColor" fillOpacity="0.15" />
      <path d="M60 230l4 6-4 6-4-6z" fill="currentColor" fillOpacity="0.12" />
      {/* Tiny dots */}
      <circle cx="60" cy="170" r="2" fill="currentColor" fillOpacity="0.2" />
      <circle cx="60" cy="290" r="2" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

/** "XV" monogram badge */
export function XVBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" aria-hidden className="h-full w-full">
        <defs>
          <linearGradient id="xv-g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#f6e7a8" />
            <stop offset="0.5" stopColor="#d4af37" />
            <stop offset="1" stopColor="#9a7a1e" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="46" stroke="url(#xv-g)" strokeWidth="1" />
        <circle cx="50" cy="50" r="42" stroke="url(#xv-g)" strokeWidth="0.5" strokeDasharray="4 3" />
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fill="url(#xv-g)"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: 32, fontWeight: 300, fontStyle: "italic" }}
        >
          XV
        </text>
      </svg>
    </div>
  );
}