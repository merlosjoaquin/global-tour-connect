export function TravelIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background buildings (gray, simple) */}
      {/* Tall building left */}
      <rect x="30" y="60" width="40" height="140" rx="4" fill="#e5e7eb" />
      <rect x="36" y="70" width="8" height="8" rx="1" fill="#d1d5db" />
      <rect x="48" y="70" width="8" height="8" rx="1" fill="#d1d5db" />
      <rect x="36" y="84" width="8" height="8" rx="1" fill="#d1d5db" />
      <rect x="48" y="84" width="8" height="8" rx="1" fill="#d1d5db" />
      <rect x="36" y="98" width="8" height="8" rx="1" fill="#d1d5db" />
      <rect x="48" y="98" width="8" height="8" rx="1" fill="#d1d5db" />
      <rect x="36" y="112" width="8" height="8" rx="1" fill="#d1d5db" />
      <rect x="48" y="112" width="8" height="8" rx="1" fill="#d1d5db" />

      {/* Medium building center-left */}
      <rect x="75" y="90" width="35" height="110" rx="4" fill="#f3f4f6" />
      <rect x="81" y="100" width="7" height="7" rx="1" fill="#e5e7eb" />
      <rect x="92" y="100" width="7" height="7" rx="1" fill="#e5e7eb" />
      <rect x="81" y="113" width="7" height="7" rx="1" fill="#e5e7eb" />
      <rect x="92" y="113" width="7" height="7" rx="1" fill="#e5e7eb" />

      {/* Short building right */}
      <rect x="210" y="110" width="45" height="90" rx="4" fill="#e5e7eb" />
      <rect x="217" y="120" width="8" height="8" rx="1" fill="#d1d5db" />
      <rect x="230" y="120" width="8" height="8" rx="1" fill="#d1d5db" />
      <rect x="217" y="134" width="8" height="8" rx="1" fill="#d1d5db" />
      <rect x="230" y="134" width="8" height="8" rx="1" fill="#d1d5db" />

      {/* Map pin icon (top right area) */}
      <g transform="translate(200, 55)">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12z" fill="#9ca3af" />
        <circle cx="12" cy="12" r="5" fill="white" />
      </g>

      {/* Chat bubble (top right of character) */}
      <g transform="translate(175, 68)">
        <rect x="0" y="0" width="30" height="20" rx="8" fill="#fbbf24" />
        <circle cx="9" cy="10" r="2" fill="white" />
        <circle cx="16" cy="10" r="2" fill="white" />
        <circle cx="23" cy="10" r="2" fill="white" />
        <path d="M6 20 L10 20 L6 26Z" fill="#fbbf24" />
      </g>

      {/* Bus stop sign (far left) */}
      <g transform="translate(15, 120)">
        <rect x="6" y="0" width="3" height="80" fill="#d1d5db" />
        <rect x="0" y="0" width="15" height="18" rx="3" fill="#d1d5db" />
        {/* Bus icon simplified */}
        <rect x="3" y="4" width="9" height="7" rx="2" fill="#9ca3af" />
        <circle cx="5.5" cy="14" r="1.5" fill="#9ca3af" />
        <circle cx="9.5" cy="14" r="1.5" fill="#9ca3af" />
      </g>

      {/* === CHARACTER === */}
      {/* Character shadow on ground */}
      <ellipse cx="148" cy="200" rx="30" ry="5" fill="#e5e7eb" />

      {/* Suitcase (yellow) */}
      <g transform="translate(105, 148)">
        <rect x="0" y="8" width="28" height="42" rx="5" fill="#fbbf24" />
        <rect x="0" y="8" width="28" height="42" rx="5" stroke="#f59e0b" strokeWidth="1" fill="none" />
        {/* Suitcase handle */}
        <rect x="9" y="0" width="10" height="10" rx="3" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        {/* Suitcase belt */}
        <rect x="0" y="28" width="28" height="3" fill="#f59e0b" opacity="0.5" />
        {/* Suitcase tag */}
        <rect x="22" y="34" width="8" height="6" rx="1" fill="#3b82f6" opacity="0.7" />
        {/* Wheels */}
        <circle cx="6" cy="52" r="2.5" fill="#9ca3af" />
        <circle cx="22" cy="52" r="2.5" fill="#9ca3af" />
      </g>

      {/* Left leg (walking pose, back leg) */}
      <path d="M142 168 L136 195" stroke="#4f6bf0" strokeWidth="11" strokeLinecap="round" />
      {/* Right leg (walking pose, front leg) */}
      <path d="M155 168 L165 193" stroke="#4358d6" strokeWidth="11" strokeLinecap="round" />

      {/* Left shoe */}
      <ellipse cx="133" cy="197" rx="8" ry="4.5" fill="#1e293b" />
      {/* Right shoe */}
      <ellipse cx="168" cy="195" rx="8" ry="4.5" fill="#1e293b" />
      {/* Shoe soles (lighter) */}
      <ellipse cx="131" cy="199" rx="5" ry="2" fill="#f5f5f4" opacity="0.6" />
      <ellipse cx="170" cy="197" rx="5" ry="2" fill="#f5f5f4" opacity="0.6" />

      {/* Body / T-shirt (orange) */}
      <path d="M135 120 Q133 118, 133 130 L133 170 Q133 175, 140 175 L162 175 Q168 175, 168 170 L168 130 Q168 118, 166 120 Z" fill="#f97316" />

      {/* T-shirt collar */}
      <path d="M142 118 Q150 124, 158 118" stroke="#ea580c" strokeWidth="1.5" fill="none" />

      {/* Left arm (holding phone) */}
      <path d="M135 128 Q125 132, 122 145" stroke="#fcd4a8" strokeWidth="8" strokeLinecap="round" />
      {/* Phone in hand */}
      <rect x="116" y="142" width="14" height="22" rx="3" fill="#374151" />
      <rect x="118" y="145" width="10" height="16" rx="1.5" fill="#93c5fd" />
      {/* Left hand */}
      <circle cx="122" cy="144" r="5" fill="#fcd4a8" />

      {/* Right arm (relaxed, slightly back) */}
      <path d="M166 128 Q176 140, 172 155" stroke="#fcd4a8" strokeWidth="8" strokeLinecap="round" />
      {/* Right hand */}
      <circle cx="172" cy="156" r="5" fill="#fcd4a8" />

      {/* Neck */}
      <rect x="145" y="108" width="12" height="12" rx="4" fill="#fcd4a8" />

      {/* Head */}
      <circle cx="151" cy="98" r="18" fill="#fcd4a8" />

      {/* Hair (dark) */}
      <path d="M133 94 Q135 78, 151 76 Q167 78, 169 94 Q169 88, 165 86 Q158 82, 151 82 Q144 82, 137 86 Q133 88, 133 94Z" fill="#3f2d1e" />

      {/* Yellow cap */}
      <path d="M131 90 Q133 76, 151 74 Q169 76, 171 90 L131 90Z" fill="#fbbf24" />
      {/* Cap brim */}
      <path d="M167 90 Q175 88, 180 90 Q175 94, 167 92Z" fill="#f59e0b" />

      {/* Glasses */}
      <circle cx="144" cy="97" r="5" fill="none" stroke="#374151" strokeWidth="1.5" />
      <circle cx="158" cy="97" r="5" fill="none" stroke="#374151" strokeWidth="1.5" />
      <path d="M149 97 L153 97" stroke="#374151" strokeWidth="1.5" />
      {/* Glasses lenses (subtle) */}
      <circle cx="144" cy="97" r="4" fill="#bfdbfe" opacity="0.2" />
      <circle cx="158" cy="97" r="4" fill="#bfdbfe" opacity="0.2" />

      {/* Eyes */}
      <circle cx="144" cy="97" r="2" fill="#1e293b" />
      <circle cx="158" cy="97" r="2" fill="#1e293b" />
      {/* Eye highlights */}
      <circle cx="145" cy="96" r="0.8" fill="white" />
      <circle cx="159" cy="96" r="0.8" fill="white" />

      {/* Smile */}
      <path d="M146 104 Q151 108, 156 104" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Ear */}
      <ellipse cx="133" cy="98" rx="3" ry="4" fill="#f0bc8a" />

      {/* Clouds */}
      <g transform="translate(120, 20)" opacity="0.6">
        <circle cx="0" cy="8" r="7" fill="#e5e7eb" />
        <circle cx="10" cy="5" r="9" fill="#e5e7eb" />
        <circle cx="22" cy="7" r="8" fill="#e5e7eb" />
      </g>
      <g transform="translate(30, 35)" opacity="0.4">
        <circle cx="0" cy="5" r="5" fill="#e5e7eb" />
        <circle cx="8" cy="3" r="6" fill="#e5e7eb" />
        <circle cx="16" cy="5" r="5" fill="#e5e7eb" />
      </g>
    </svg>
  )
}

export function BookingIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background elements (gray) */}
      {/* Stairs / steps (left side) */}
      <rect x="20" y="155" width="55" height="12" rx="2" fill="#e5e7eb" />
      <rect x="28" y="143" width="47" height="12" rx="2" fill="#f3f4f6" />
      <rect x="36" y="131" width="39" height="12" rx="2" fill="#e5e7eb" />
      <rect x="44" y="119" width="31" height="12" rx="2" fill="#f3f4f6" />

      {/* Directional sign post (right side) */}
      <g transform="translate(220, 80)">
        <rect x="8" y="0" width="4" height="120" fill="#d1d5db" />
        {/* Top sign pointing right */}
        <path d="M0 8 L35 8 L42 16 L35 24 L0 24Z" fill="#d1d5db" />
        {/* Bottom sign pointing left */}
        <path d="M-10 34 L25 34 L25 48 L-10 48 L-17 41Z" fill="#e5e7eb" />
      </g>

      {/* Tree (right background) */}
      <g transform="translate(245, 100)">
        <rect x="8" y="60" width="6" height="40" fill="#d1d5db" />
        <ellipse cx="11" cy="50" rx="20" ry="28" fill="#e5e7eb" />
        <ellipse cx="5" cy="60" rx="14" ry="20" fill="#d1d5db" opacity="0.5" />
      </g>

      {/* Map pin (above character) */}
      <g transform="translate(155, 20)">
        <path d="M10 0C4.5 0 0 4.5 0 10c0 7.5 10 17 10 17s10-9.5 10-17c0-5.5-4.5-10-10-10z" fill="#9ca3af" />
        <circle cx="10" cy="10" r="4" fill="white" />
        {/* Dashed line down to character */}
        <line x1="10" y1="37" x2="10" y2="55" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="3 3" />
      </g>

      {/* Clouds */}
      <g transform="translate(55, 25)" opacity="0.5">
        <circle cx="0" cy="8" r="8" fill="#e5e7eb" />
        <circle cx="12" cy="5" r="10" fill="#e5e7eb" />
        <circle cx="24" cy="8" r="8" fill="#e5e7eb" />
      </g>
      <g transform="translate(200, 40)" opacity="0.4">
        <circle cx="0" cy="5" r="6" fill="#e5e7eb" />
        <circle cx="9" cy="3" r="7" fill="#e5e7eb" />
        <circle cx="18" cy="5" r="5" fill="#e5e7eb" />
      </g>

      {/* === CHARACTER (walking, reading map) === */}
      {/* Character shadow */}
      <ellipse cx="145" cy="205" rx="32" ry="5" fill="#e5e7eb" />

      {/* Left leg (back, extended behind — running/walking pose) */}
      <path d="M132 170 L110 198" stroke="#4f6bf0" strokeWidth="12" strokeLinecap="round" />
      {/* Right leg (front, extended forward) */}
      <path d="M155 168 L178 195" stroke="#4358d6" strokeWidth="12" strokeLinecap="round" />

      {/* Left shoe */}
      <ellipse cx="107" cy="200" rx="9" ry="5" fill="#1e293b" />
      <ellipse cx="104" cy="202" rx="5" ry="2" fill="#f5f5f4" opacity="0.5" />
      {/* Right shoe */}
      <ellipse cx="181" cy="198" rx="9" ry="5" fill="#1e293b" />
      <ellipse cx="184" cy="200" rx="5" ry="2" fill="#f5f5f4" opacity="0.5" />

      {/* Body / T-shirt (orange) */}
      <path d="M128 118 Q126 115, 126 128 L126 172 Q126 177, 133 177 L158 177 Q164 177, 164 172 L164 128 Q164 115, 162 118 Z" fill="#f97316" />
      {/* T-shirt collar */}
      <path d="M137 116 Q145 122, 153 116" stroke="#ea580c" strokeWidth="1.5" fill="none" />

      {/* Backpack (yellow/black, on back) */}
      <g transform="translate(115, 115)">
        <rect x="0" y="5" width="18" height="28" rx="6" fill="#1e293b" />
        {/* Backpack top roll (sleeping bag / mat, blue) */}
        <rect x="-2" y="-5" width="22" height="10" rx="5" fill="#3b82f6" opacity="0.8" />
        {/* Backpack pocket */}
        <rect x="3" y="18" width="12" height="10" rx="3" fill="#374151" />
        {/* Backpack buckle */}
        <rect x="6" y="16" width="6" height="3" rx="1" fill="#fbbf24" />
        {/* Strap */}
        <path d="M18 10 Q22 15, 20 25" stroke="#374151" strokeWidth="2.5" fill="none" />
      </g>

      {/* Left arm (holding map open) */}
      <path d="M126 130 Q112 128, 108 120" stroke="#fcd4a8" strokeWidth="8" strokeLinecap="round" />
      {/* Left hand */}
      <circle cx="108" cy="118" r="5" fill="#fcd4a8" />

      {/* Right arm (holding other side of map) */}
      <path d="M162 128 Q174 124, 178 116" stroke="#fcd4a8" strokeWidth="8" strokeLinecap="round" />
      {/* Right hand */}
      <circle cx="178" cy="114" r="5" fill="#fcd4a8" />

      {/* Open map/book (yellow, held in front) */}
      <g transform="translate(105, 90)">
        {/* Left page */}
        <path d="M5 5 Q5 0, 35 0 L35 35 Q5 35, 5 30Z" fill="#fde68a" />
        {/* Right page */}
        <path d="M35 0 Q65 0, 65 5 L65 30 Q65 35, 35 35Z" fill="#fbbf24" />
        {/* Map lines on left page */}
        <path d="M12 10 L28 10" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />
        <path d="M10 16 L30 16" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />
        <path d="M14 22 L26 22" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />
        {/* Map route on right page */}
        <path d="M42 8 Q50 15, 45 22 Q55 28, 58 20" stroke="#ea580c" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="42" cy="8" r="2" fill="#ef4444" />
        <circle cx="58" cy="20" r="2" fill="#22c55e" />
        {/* Spine fold */}
        <line x1="35" y1="0" x2="35" y2="35" stroke="#e5a700" strokeWidth="1" />
      </g>

      {/* Neck */}
      <rect x="140" y="104" width="12" height="14" rx="4" fill="#fcd4a8" />

      {/* Head */}
      <circle cx="146" cy="92" r="19" fill="#fcd4a8" />

      {/* Hair (dark) */}
      <path d="M127 88 Q130 72, 146 70 Q162 72, 165 88 Q165 82, 161 80 Q154 76, 146 76 Q138 76, 131 80 Q127 82, 127 88Z" fill="#3f2d1e" />

      {/* Yellow cap */}
      <path d="M125 84 Q128 70, 146 68 Q164 70, 167 84 L125 84Z" fill="#fbbf24" />
      {/* Cap brim (pointing right since looking at map) */}
      <path d="M163 84 Q172 82, 176 85 Q172 89, 163 87Z" fill="#f59e0b" />

      {/* Eye (only one visible, looking at map) */}
      <circle cx="155" cy="91" r="2.5" fill="#1e293b" />
      <circle cx="156" cy="90" r="0.8" fill="white" />

      {/* Smile */}
      <path d="M152 99 Q156 103, 160 100" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Ear (right side) */}
      <ellipse cx="166" cy="93" rx="3" ry="4.5" fill="#f0bc8a" />

      {/* Cheek blush */}
      <circle cx="160" cy="96" r="3" fill="#fca5a5" opacity="0.3" />
    </svg>
  )
}
