export function TravelIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background buildings (gray, simple) */}
      <rect x="10" y="50" width="38" height="190" rx="3" fill="#e5e7eb" />
      <rect x="16" y="62" width="7" height="9" rx="1.5" fill="#d1d5db" />
      <rect x="27" y="62" width="7" height="9" rx="1.5" fill="#d1d5db" />
      <rect x="16" y="78" width="7" height="9" rx="1.5" fill="#d1d5db" />
      <rect x="27" y="78" width="7" height="9" rx="1.5" fill="#d1d5db" />
      <rect x="16" y="94" width="7" height="9" rx="1.5" fill="#d1d5db" />
      <rect x="27" y="94" width="7" height="9" rx="1.5" fill="#d1d5db" />

      <rect x="52" y="85" width="32" height="155" rx="3" fill="#f3f4f6" />
      <rect x="57" y="96" width="6" height="7" rx="1" fill="#e5e7eb" />
      <rect x="67" y="96" width="6" height="7" rx="1" fill="#e5e7eb" />
      <rect x="57" y="110" width="6" height="7" rx="1" fill="#e5e7eb" />
      <rect x="67" y="110" width="6" height="7" rx="1" fill="#e5e7eb" />

      <rect x="230" y="100" width="40" height="140" rx="3" fill="#e5e7eb" />
      <rect x="236" y="112" width="7" height="9" rx="1.5" fill="#d1d5db" />
      <rect x="249" y="112" width="7" height="9" rx="1.5" fill="#d1d5db" />
      <rect x="236" y="128" width="7" height="9" rx="1.5" fill="#d1d5db" />
      <rect x="249" y="128" width="7" height="9" rx="1.5" fill="#d1d5db" />

      {/* Map pin */}
      <g transform="translate(215, 40)">
        <path d="M11 0C5 0 0 5 0 11c0 8.5 11 18 11 18s11-9.5 11-18C22 5 17 0 11 0z" fill="#9ca3af" />
        <circle cx="11" cy="11" r="4.5" fill="white" />
      </g>

      {/* Chat bubble */}
      <g transform="translate(190, 42)">
        <rect x="0" y="0" width="28" height="18" rx="7" fill="#fbbf24" />
        <circle cx="8" cy="9" r="2" fill="white" />
        <circle cx="14.5" cy="9" r="2" fill="white" />
        <circle cx="21" cy="9" r="2" fill="white" />
        <path d="M5 18 L9 18 L5 24Z" fill="#fbbf24" />
      </g>

      {/* Clouds */}
      <g opacity="0.5">
        <circle cx="105" cy="22" r="7" fill="#e5e7eb" />
        <circle cx="115" cy="18" r="9" fill="#e5e7eb" />
        <circle cx="127" cy="21" r="7" fill="#e5e7eb" />
      </g>
      <g opacity="0.35">
        <circle cx="185" cy="28" r="5" fill="#e5e7eb" />
        <circle cx="193" cy="25" r="6.5" fill="#e5e7eb" />
        <circle cx="202" cy="28" r="5" fill="#e5e7eb" />
      </g>

      {/* === CHARACTER — torso up, centered, large === */}

      {/* Body / T-shirt (orange) — wide, natural shoulders */}
      <path d="M98 145 Q95 138, 95 150 L92 240 L188 240 L185 150 Q185 138, 182 145 L175 130 Q170 122, 160 120 L120 120 Q110 122, 105 130 Z" fill="#f97316" />
      {/* T-shirt neckline */}
      <path d="M122 120 Q140 132, 158 120" fill="#ea580c" />
      {/* T-shirt sleeve folds */}
      <path d="M100 148 Q108 152, 105 160" stroke="#ea580c" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M180 148 Q172 152, 175 160" stroke="#ea580c" strokeWidth="1" fill="none" opacity="0.4" />

      {/* Left arm — holding phone, coming from shoulder */}
      {/* Upper arm */}
      <path d="M95 148 Q82 155, 78 170" stroke="#fcd4a8" strokeWidth="14" strokeLinecap="round" />
      {/* Forearm */}
      <path d="M78 170 Q75 182, 80 192" stroke="#fcd4a8" strokeWidth="13" strokeLinecap="round" />

      {/* Phone in left hand */}
      <rect x="70" y="187" width="22" height="36" rx="4" fill="#374151" />
      <rect x="73" y="191" width="16" height="26" rx="2" fill="#93c5fd" />
      {/* Phone screen content */}
      <rect x="75" y="194" width="12" height="2" rx="1" fill="white" opacity="0.5" />
      <rect x="75" y="199" width="8" height="2" rx="1" fill="white" opacity="0.3" />
      <circle cx="81" cy="208" r="3" fill="white" opacity="0.2" />

      {/* Left hand wrapped around phone */}
      <path d="M69 194 Q66 192, 67 198 Q66 204, 70 206" stroke="#fcd4a8" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M93 194 Q96 196, 95 202 Q96 206, 92 207" stroke="#f0bc8a" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Right arm — relaxed down */}
      <path d="M185 148 Q196 158, 198 175" stroke="#fcd4a8" strokeWidth="14" strokeLinecap="round" />
      <path d="M198 175 Q200 190, 195 205" stroke="#fcd4a8" strokeWidth="13" strokeLinecap="round" />
      {/* Right hand */}
      <ellipse cx="194" cy="208" rx="7" ry="8" fill="#fcd4a8" />
      {/* Fingers hint */}
      <path d="M189 212 Q188 216, 190 218" stroke="#f0bc8a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M193 213 Q192 218, 194 220" stroke="#f0bc8a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <rect x="131" y="106" width="18" height="18" rx="6" fill="#fcd4a8" />

      {/* Head — larger, rounder */}
      <ellipse cx="140" cy="82" rx="30" ry="32" fill="#fcd4a8" />

      {/* Ears */}
      <ellipse cx="110" cy="85" rx="5" ry="7" fill="#f0bc8a" />
      <ellipse cx="170" cy="85" rx="5" ry="7" fill="#f0bc8a" />
      {/* Inner ear */}
      <ellipse cx="110" cy="86" rx="3" ry="4" fill="#e8a882" opacity="0.4" />
      <ellipse cx="170" cy="86" rx="3" ry="4" fill="#e8a882" opacity="0.4" />

      {/* Hair (dark brown, voluminous) */}
      <path d="M109 78 Q110 52, 140 48 Q170 52, 171 78 Q172 70, 168 64 Q160 56, 140 54 Q120 56, 112 64 Q108 70, 109 78Z" fill="#3f2d1e" />
      {/* Side hair */}
      <path d="M109 78 Q107 85, 110 90" stroke="#3f2d1e" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M171 78 Q173 85, 170 90" stroke="#3f2d1e" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Yellow cap */}
      <path d="M107 74 Q110 50, 140 46 Q170 50, 173 74 L107 74Z" fill="#fbbf24" />
      {/* Cap brim */}
      <path d="M168 74 Q180 71, 186 75 Q180 80, 168 77Z" fill="#f59e0b" />
      {/* Cap button on top */}
      <circle cx="140" cy="47" r="2.5" fill="#f59e0b" />

      {/* Eyebrows */}
      <path d="M124 72 Q128 68, 133 71" stroke="#3f2d1e" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M148 71 Q153 68, 157 72" stroke="#3f2d1e" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Eyes — larger, expressive */}
      {/* Left eye white */}
      <ellipse cx="129" cy="80" rx="7" ry="7.5" fill="white" />
      {/* Right eye white */}
      <ellipse cx="152" cy="80" rx="7" ry="7.5" fill="white" />
      {/* Left iris */}
      <circle cx="130" cy="81" r="4.5" fill="#4a3728" />
      {/* Right iris */}
      <circle cx="153" cy="81" r="4.5" fill="#4a3728" />
      {/* Pupils */}
      <circle cx="131" cy="80.5" r="2.5" fill="#1e1510" />
      <circle cx="154" cy="80.5" r="2.5" fill="#1e1510" />
      {/* Eye highlights */}
      <circle cx="132.5" cy="78.5" r="1.5" fill="white" />
      <circle cx="155.5" cy="78.5" r="1.5" fill="white" />
      <circle cx="129" cy="82" r="0.8" fill="white" opacity="0.6" />
      <circle cx="152" cy="82" r="0.8" fill="white" opacity="0.6" />

      {/* Nose */}
      <path d="M139 86 Q140 90, 142 88" stroke="#e8a882" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Mouth — open smile */}
      <path d="M131 96 Q140 106, 150 96" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Teeth hint */}
      <path d="M134 97 Q140 102, 147 97" fill="white" />

      {/* Cheek blush */}
      <ellipse cx="119" cy="92" rx="5" ry="3.5" fill="#fca5a5" opacity="0.3" />
      <ellipse cx="162" cy="92" rx="5" ry="3.5" fill="#fca5a5" opacity="0.3" />
    </svg>
  )
}

export function BookingIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background elements */}
      {/* Directional sign post */}
      <g transform="translate(22, 50)">
        <rect x="8" y="0" width="4" height="190" fill="#d1d5db" />
        <path d="M0 10 L38 10 L45 20 L38 30 L0 30Z" fill="#d1d5db" />
        <path d="M-8 42 L30 42 L30 58 L-8 58 L-15 50Z" fill="#e5e7eb" />
      </g>

      {/* Building right */}
      <rect x="225" y="60" width="45" height="180" rx="3" fill="#e5e7eb" />
      <rect x="232" y="72" width="7" height="9" rx="1.5" fill="#d1d5db" />
      <rect x="245" y="72" width="7" height="9" rx="1.5" fill="#d1d5db" />
      <rect x="232" y="88" width="7" height="9" rx="1.5" fill="#d1d5db" />
      <rect x="245" y="88" width="7" height="9" rx="1.5" fill="#d1d5db" />
      <rect x="232" y="104" width="7" height="9" rx="1.5" fill="#d1d5db" />
      <rect x="245" y="104" width="7" height="9" rx="1.5" fill="#d1d5db" />

      {/* Map pin above character */}
      <g transform="translate(147, 8)">
        <path d="M11 0C5 0 0 5 0 11c0 8.5 11 18 11 18s11-9.5 11-18C22 5 17 0 11 0z" fill="#9ca3af" />
        <circle cx="11" cy="11" r="4.5" fill="white" />
      </g>

      {/* Clouds */}
      <g opacity="0.5">
        <circle cx="80" cy="25" r="8" fill="#e5e7eb" />
        <circle cx="92" cy="20" r="10" fill="#e5e7eb" />
        <circle cx="106" cy="24" r="8" fill="#e5e7eb" />
      </g>
      <g opacity="0.35">
        <circle cx="200" cy="35" r="5" fill="#e5e7eb" />
        <circle cx="208" cy="32" r="6.5" fill="#e5e7eb" />
        <circle cx="217" cy="35" r="5" fill="#e5e7eb" />
      </g>

      {/* === CHARACTER — torso up, looking at map, 3/4 view === */}

      {/* Body / T-shirt (orange) */}
      <path d="M100 148 Q97 140, 97 152 L93 240 L192 240 L188 152 Q188 140, 185 148 L178 132 Q172 124, 162 122 L123 122 Q113 124, 107 132 Z" fill="#f97316" />
      {/* T-shirt neckline */}
      <path d="M125 122 Q142 134, 160 122" fill="#ea580c" />
      {/* Sleeve folds */}
      <path d="M102 150 Q110 155, 107 163" stroke="#ea580c" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M183 150 Q175 155, 178 163" stroke="#ea580c" strokeWidth="1" fill="none" opacity="0.4" />

      {/* Backpack (dark, on back — visible from side) */}
      <g transform="translate(85, 130)">
        <rect x="0" y="5" width="20" height="35" rx="7" fill="#1e293b" />
        {/* Blue rolled mat on top */}
        <rect x="-2" y="-4" width="24" height="10" rx="5" fill="#3b82f6" opacity="0.8" />
        {/* Pocket */}
        <rect x="4" y="22" width="12" height="10" rx="3" fill="#374151" />
        {/* Buckle */}
        <rect x="7" y="20" width="6" height="3" rx="1" fill="#fbbf24" />
        {/* Strap visible */}
        <path d="M20 12 Q25 18, 22 30" stroke="#374151" strokeWidth="2.5" fill="none" />
      </g>

      {/* Left arm — holding left side of map */}
      <path d="M97 150 Q82 150, 75 140" stroke="#fcd4a8" strokeWidth="14" strokeLinecap="round" />
      <path d="M75 140 Q70 132, 74 125" stroke="#fcd4a8" strokeWidth="13" strokeLinecap="round" />
      {/* Left hand */}
      <ellipse cx="75" cy="122" rx="7" ry="7.5" fill="#fcd4a8" />

      {/* Right arm — holding right side of map */}
      <path d="M186 148 Q198 150, 204 140" stroke="#fcd4a8" strokeWidth="14" strokeLinecap="round" />
      <path d="M204 140 Q210 130, 205 122" stroke="#fcd4a8" strokeWidth="13" strokeLinecap="round" />
      {/* Right hand */}
      <ellipse cx="204" cy="119" rx="7" ry="7.5" fill="#fcd4a8" />

      {/* Open map (yellow, held in front) */}
      <g transform="translate(70, 100)">
        {/* Left page */}
        <path d="M8 0 Q8 -4, 70 -4 L70 40 Q8 40, 8 36Z" fill="#fde68a" />
        {/* Right page */}
        <path d="M70 -4 Q132 -4, 132 0 L132 36 Q132 40, 70 40Z" fill="#fbbf24" />
        {/* Map content — left page lines */}
        <path d="M18 8 L58 8" stroke="#f59e0b" strokeWidth="1.2" opacity="0.5" />
        <path d="M15 15 L60 15" stroke="#f59e0b" strokeWidth="1.2" opacity="0.5" />
        <path d="M20 22 L55 22" stroke="#f59e0b" strokeWidth="1.2" opacity="0.5" />
        <path d="M18 29 L52 29" stroke="#f59e0b" strokeWidth="1.2" opacity="0.5" />
        {/* Map content — right page route */}
        <path d="M82 8 Q95 18, 88 26 Q100 34, 118 22" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="82" cy="8" r="3" fill="#ef4444" />
        <circle cx="118" cy="22" r="3" fill="#22c55e" />
        {/* Small map pin on route */}
        <g transform="translate(93, 14)">
          <path d="M3 0C1.3 0 0 1.3 0 3c0 2.3 3 5 3 5s3-2.7 3-5c0-1.7-1.3-3-3-3z" fill="#ea580c" opacity="0.6" />
        </g>
        {/* Spine fold */}
        <line x1="70" y1="-4" x2="70" y2="40" stroke="#e5a700" strokeWidth="1.5" />
      </g>

      {/* Neck */}
      <rect x="133" y="108" width="18" height="18" rx="6" fill="#fcd4a8" />

      {/* Head — larger, rounder, slight 3/4 turn */}
      <ellipse cx="143" cy="82" rx="30" ry="32" fill="#fcd4a8" />

      {/* Ears */}
      <ellipse cx="113" cy="86" rx="5" ry="7" fill="#f0bc8a" />
      <ellipse cx="173" cy="86" rx="5" ry="7" fill="#f0bc8a" />
      <ellipse cx="113" cy="87" rx="3" ry="4" fill="#e8a882" opacity="0.4" />
      <ellipse cx="173" cy="87" rx="3" ry="4" fill="#e8a882" opacity="0.4" />

      {/* Hair (dark brown) */}
      <path d="M112 80 Q113 54, 143 50 Q173 54, 174 80 Q175 72, 170 66 Q162 58, 143 56 Q124 58, 116 66 Q112 72, 112 80Z" fill="#3f2d1e" />
      <path d="M112 80 Q110 87, 113 92" stroke="#3f2d1e" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M174 80 Q176 87, 173 92" stroke="#3f2d1e" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Yellow cap */}
      <path d="M110 76 Q113 52, 143 48 Q173 52, 176 76 L110 76Z" fill="#fbbf24" />
      {/* Cap brim — pointing forward/right */}
      <path d="M170 76 Q182 73, 188 77 Q182 82, 170 79Z" fill="#f59e0b" />
      {/* Cap button */}
      <circle cx="143" cy="49" r="2.5" fill="#f59e0b" />

      {/* Eyebrows — focused/reading expression */}
      <path d="M126 73 Q131 70, 136 73" stroke="#3f2d1e" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M151 73 Q156 70, 161 73" stroke="#3f2d1e" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Eyes — looking down at map */}
      <ellipse cx="132" cy="82" rx="7" ry="7" fill="white" />
      <ellipse cx="155" cy="82" rx="7" ry="7" fill="white" />
      {/* Irises — looking down */}
      <circle cx="132" cy="84" r="4.5" fill="#4a3728" />
      <circle cx="155" cy="84" r="4.5" fill="#4a3728" />
      {/* Pupils */}
      <circle cx="132" cy="85" r="2.5" fill="#1e1510" />
      <circle cx="155" cy="85" r="2.5" fill="#1e1510" />
      {/* Eye highlights */}
      <circle cx="134" cy="82" r="1.5" fill="white" />
      <circle cx="157" cy="82" r="1.5" fill="white" />

      {/* Nose */}
      <path d="M142 88 Q143 92, 145 90" stroke="#e8a882" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Mouth — slight concentrated smile */}
      <path d="M134 98 Q143 104, 152 98" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Cheek blush */}
      <ellipse cx="122" cy="93" rx="5" ry="3.5" fill="#fca5a5" opacity="0.3" />
      <ellipse cx="164" cy="93" rx="5" ry="3.5" fill="#fca5a5" opacity="0.3" />
    </svg>
  )
}
