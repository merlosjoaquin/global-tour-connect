export function TravelIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Globe gradient */}
        <radialGradient id="globeGrad" cx="0.4" cy="0.35" r="0.65">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="60%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0f766e" />
        </radialGradient>
        {/* Globe highlight */}
        <radialGradient id="globeHighlight" cx="0.3" cy="0.25" r="0.4">
          <stop offset="0%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        {/* Shadow */}
        <radialGradient id="shadowGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#0f766e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
        </radialGradient>
        {/* Person body gradient */}
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0fdfa" />
          <stop offset="100%" stopColor="#99f6e4" />
        </linearGradient>
        {/* Backpack gradient */}
        <linearGradient id="backpackGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="95" cy="178" rx="60" ry="8" fill="url(#shadowGrad)" />

      {/* Globe */}
      <circle cx="88" cy="95" r="52" fill="url(#globeGrad)" />
      {/* Globe highlight */}
      <circle cx="88" cy="95" r="52" fill="url(#globeHighlight)" />

      {/* Simplified continents */}
      {/* Americas-like shape */}
      <path
        d="M68 60 Q72 55, 78 58 Q82 62, 80 70 Q78 78, 72 82 Q68 85, 65 80 Q60 72, 63 65 Z"
        fill="#0d9488"
        opacity="0.6"
      />
      {/* Europe/Africa-like shape */}
      <path
        d="M95 65 Q100 60, 105 63 Q110 68, 108 78 Q106 88, 100 95 Q96 100, 92 95 Q88 88, 90 78 Q92 70, 95 65 Z"
        fill="#0d9488"
        opacity="0.6"
      />
      {/* Small island */}
      <ellipse cx="115" cy="85" rx="5" ry="3" fill="#0d9488" opacity="0.5" />

      {/* Globe equator line */}
      <ellipse cx="88" cy="98" rx="50" ry="14" stroke="#99f6e4" strokeWidth="0.8" fill="none" opacity="0.4" />

      {/* Globe rim shine */}
      <path
        d="M42 75 Q55 45, 88 43 Q120 45, 134 75"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        opacity="0.15"
        strokeLinecap="round"
      />

      {/* --- Character standing beside globe --- */}
      {/* Character shadow */}
      <ellipse cx="155" cy="178" rx="18" ry="4" fill="url(#shadowGrad)" />

      {/* Legs */}
      <rect x="148" y="155" width="7" height="22" rx="3.5" fill="#0f766e" />
      <rect x="159" y="155" width="7" height="22" rx="3.5" fill="#0d9488" />

      {/* Shoes */}
      <ellipse cx="151.5" cy="176" rx="5" ry="3" fill="#134e4a" />
      <ellipse cx="162.5" cy="176" rx="5" ry="3" fill="#115e59" />

      {/* Body */}
      <rect x="144" y="125" width="26" height="34" rx="10" fill="url(#bodyGrad)" />

      {/* Backpack */}
      <rect x="168" y="128" width="12" height="22" rx="5" fill="url(#backpackGrad)" />
      <rect x="170" y="132" width="8" height="4" rx="2" fill="#fcd34d" opacity="0.6" />
      {/* Backpack strap */}
      <path d="M168 132 Q164 130, 162 135" stroke="#d97706" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Head */}
      <circle cx="157" cy="115" r="14" fill="#fde68a" />
      {/* Hair */}
      <path
        d="M143 112 Q145 100, 157 98 Q169 100, 171 112"
        fill="#92400e"
        opacity="0.8"
      />
      {/* Eyes */}
      <circle cx="152" cy="115" r="2" fill="#1e293b" />
      <circle cx="162" cy="115" r="2" fill="#1e293b" />
      {/* Eye highlights */}
      <circle cx="152.7" cy="114.3" r="0.7" fill="white" />
      <circle cx="162.7" cy="114.3" r="0.7" fill="white" />
      {/* Smile */}
      <path d="M153 120 Q157 124, 161 120" stroke="#92400e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Cheek blush */}
      <circle cx="149" cy="119" r="2.5" fill="#fca5a5" opacity="0.4" />
      <circle cx="165" cy="119" r="2.5" fill="#fca5a5" opacity="0.4" />

      {/* Arm waving */}
      <path d="M144 132 Q130 120, 128 108" stroke="#fde68a" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Hand */}
      <circle cx="127" cy="106" r="4" fill="#fde68a" />

      {/* Decorative elements — small floating dots/stars */}
      <circle cx="30" cy="45" r="2.5" fill="#5eead4" opacity="0.5" />
      <circle cx="160" cy="50" r="2" fill="#99f6e4" opacity="0.6" />
      <circle cx="45" cy="160" r="1.8" fill="#5eead4" opacity="0.4" />

      {/* Small airplane */}
      <g transform="translate(25, 32) rotate(-15)">
        <path d="M0 3 L12 0 L12 6 Z" fill="#99f6e4" opacity="0.7" />
        <rect x="4" y="1.5" width="5" height="3" rx="1.5" fill="#5eead4" opacity="0.7" />
      </g>
    </svg>
  )
}

export function BookingIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Phone gradient */}
        <linearGradient id="phoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        {/* Screen gradient */}
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>
        {/* Check circle gradient */}
        <linearGradient id="checkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        {/* Shadow */}
        <radialGradient id="bookShadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#d97706" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
        </radialGradient>
        {/* Star gradient */}
        <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* Floor shadow */}
      <ellipse cx="100" cy="180" rx="55" ry="7" fill="url(#bookShadow)" />

      {/* Phone body */}
      <rect x="55" y="30" width="70" height="140" rx="14" fill="url(#phoneGrad)" />
      {/* Phone inner shadow for depth */}
      <rect x="55" y="30" width="70" height="140" rx="14" stroke="#d97706" strokeWidth="1" fill="none" opacity="0.3" />

      {/* Screen */}
      <rect x="62" y="45" width="56" height="108" rx="6" fill="url(#screenGrad)" />

      {/* Screen content — calendar grid */}
      {/* Month header */}
      <rect x="68" y="50" width="44" height="8" rx="2" fill="#fbbf24" opacity="0.3" />
      <rect x="74" y="52" width="32" height="4" rx="1" fill="#d97706" opacity="0.5" />

      {/* Calendar day cells — 3 rows x 5 cols */}
      {[0, 1, 2].map(row =>
        [0, 1, 2, 3, 4].map(col => {
          const x = 68 + col * 10
          const y = 63 + row * 10
          const isHighlighted = row === 1 && col === 2
          return (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width="8"
              height="8"
              rx="2"
              fill={isHighlighted ? '#f59e0b' : '#fef3c7'}
              opacity={isHighlighted ? 1 : 0.6}
            />
          )
        })
      )}

      {/* Confirmation card on screen */}
      <rect x="66" y="98" width="48" height="28" rx="5" fill="white" />
      <rect x="66" y="98" width="48" height="28" rx="5" stroke="#e5e7eb" strokeWidth="0.5" fill="none" />
      {/* Card text lines */}
      <rect x="71" y="103" width="28" height="3" rx="1" fill="#d4d4d8" />
      <rect x="71" y="109" width="20" height="2.5" rx="1" fill="#e5e7eb" />
      <rect x="71" y="114" width="24" height="2.5" rx="1" fill="#e5e7eb" />
      {/* Mini checkmark in card */}
      <circle cx="106" cy="112" r="5" fill="url(#checkGrad)" />
      <path d="M103.5 112 L105.5 114 L109 110" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Bottom bar on screen */}
      <rect x="66" y="134" width="48" height="14" rx="4" fill="#fbbf24" opacity="0.2" />
      <rect x="76" y="138.5" width="28" height="5" rx="2.5" fill="#d97706" opacity="0.4" />

      {/* Camera notch */}
      <rect x="82" y="35" width="16" height="4" rx="2" fill="#d97706" opacity="0.2" />

      {/* Floating check circle — top right */}
      <g transform="translate(135, 40)">
        <circle cx="0" cy="0" r="18" fill="url(#checkGrad)" />
        <circle cx="0" cy="0" r="18" fill="white" opacity="0.1" />
        <path d="M-8 0 L-3 5 L8 -5" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Check circle shadow ring */}
      <circle cx="135" cy="40" r="20" stroke="#34d399" strokeWidth="1" fill="none" opacity="0.2" />

      {/* Decorative sparkles */}
      {/* Star 1 — top left */}
      <g transform="translate(35, 55)">
        <path d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z" fill="url(#starGrad)" opacity="0.6" />
      </g>
      {/* Star 2 — bottom right */}
      <g transform="translate(155, 130)">
        <path d="M0 -5 L1.2 -1.2 L5 0 L1.2 1.2 L0 5 L-1.2 1.2 L-5 0 L-1.2 -1.2 Z" fill="url(#starGrad)" opacity="0.5" />
      </g>
      {/* Star 3 — mid left */}
      <g transform="translate(38, 140)">
        <path d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z" fill="#fbbf24" opacity="0.4" />
      </g>

      {/* Small floating dots */}
      <circle cx="155" cy="85" r="3" fill="#fde68a" opacity="0.5" />
      <circle cx="30" cy="95" r="2" fill="#fcd34d" opacity="0.4" />
      <circle cx="165" cy="155" r="2.5" fill="#fbbf24" opacity="0.3" />

      {/* Subtle ring decorations */}
      <circle cx="42" cy="35" r="6" stroke="#fde68a" strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="160" cy="165" r="4" stroke="#fcd34d" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  )
}
