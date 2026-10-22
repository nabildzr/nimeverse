import { memo } from 'react'

interface ChibiProps {
  type: string
}

export const ChibiCharacter = memo(function ChibiCharacter({ type }: ChibiProps) {
  switch (type) {
    case 'jotaro':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 52 L 20 72 L 52 72 L 54 52 Z" fill="#1e1b4b" stroke="#0f172a" strokeWidth="1.5" />
          <path d="M 28 52 L 36 72 L 44 52 Z" fill="#7e22ce" />
          <path d="M 44 52 Q 50 62 46 72" stroke="#facc15" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="44" cy="52" r="2.5" fill="#facc15" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="23" cy="42" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <ellipse cx="49" cy="42" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <path d="M 22 34 Q 28 32 30 35" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="26" cy="37" r="3.5" fill="#0f172a" />
          <circle cx="25" cy="36" r="1.2" fill="#ffffff" />
          <path d="M 42 35 Q 44 32 50 34" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="46" cy="37" r="3.5" fill="#0f172a" />
          <circle cx="45" cy="36" r="1.2" fill="#ffffff" />
          <path d="M 33 46 Q 36 44 39 46" stroke="#0f172a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 14 36 Q 10 24 20 20 Q 14 16 26 12 Q 36 10 46 12 Q 58 16 52 20 Q 62 24 58 36 Z" fill="#0f172a" />
          <path d="M 16 26 Q 36 18 56 26 L 54 18 Q 36 12 18 18 Z" fill="#1e1b4b" stroke="#0f172a" strokeWidth="1" />
          <path d="M 14 26 Q 36 22 58 26 L 56 30 Q 36 26 16 30 Z" fill="#0f172a" />
          <rect x="32" y="18" width="8" height="6" rx="1" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
          <circle cx="36" cy="21" r="1.5" fill="#ca8a04" />
        </g>
      )

    case 'dio':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 52 L 20 72 L 52 72 L 54 52 Z" fill="#ca8a04" stroke="#854d0e" strokeWidth="1.5" />
          <path d="M 30 52 L 36 68 L 42 52 Z" fill="#166534" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <ellipse cx="23" cy="42" rx="4" ry="2" fill="#f43f5e" opacity="0.3" />
          <ellipse cx="49" cy="42" rx="4" ry="2" fill="#f43f5e" opacity="0.3" />
          <path d="M 22 34 L 30 36" stroke="#854d0e" strokeWidth="2" strokeLinecap="round" />
          <circle cx="26" cy="38" r="3.5" fill="#ca8a04" />
          <circle cx="25" cy="37" r="1.2" fill="#ffffff" />
          <path d="M 42 36 L 50 34" stroke="#854d0e" strokeWidth="2" strokeLinecap="round" />
          <circle cx="46" cy="38" r="3.5" fill="#ca8a04" />
          <circle cx="45" cy="37" r="1.2" fill="#ffffff" />
          <path d="M 32 46 Q 36 49 41 45" stroke="#991b1b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 10 38 Q 4 16 18 10 Q 24 4 36 6 Q 48 4 54 10 Q 68 16 62 38 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
          <path d="M 24 16 L 30 26 L 36 14 L 42 26 L 48 16" stroke="#ca8a04" strokeWidth="2" fill="none" />
          <path d="M 18 28 Q 36 24 54 28" stroke="#22c55e" strokeWidth="4" fill="none" />
          <path d="M 36 23 C 36 23 32 19 29 23 C 26 27 31 31 36 34 C 41 31 46 27 43 23 C 40 19 36 23 36 23 Z" fill="#22c55e" stroke="#16a34a" strokeWidth="0.8" />
        </g>
      )

    case 'gojo':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#0f172a" stroke="#020617" strokeWidth="1.5" />
          <path d="M 28 50 L 36 56 L 44 50 Z" fill="#1e293b" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="23" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <ellipse cx="49" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <rect x="14" y="30" width="44" height="11" rx="4" fill="#020617" />
          <path d="M 32 46 Q 36 49 40 46" stroke="#0f172a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 12 34 Q 8 16 18 10 Q 24 2 36 4 Q 48 2 54 10 Q 64 16 60 34 Q 52 20 36 22 Q 20 20 12 34 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
          <path d="M 26 22 L 30 30 L 34 22 L 38 30 L 44 22" stroke="#e2e8f0" strokeWidth="2" fill="none" />
        </g>
      )

    case 'sukuna':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
          <path d="M 32 50 L 36 72 L 40 50 Z" fill="#18181b" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <circle cx="26" cy="38" r="3.5" fill="#dc2626" />
          <circle cx="46" cy="38" r="3.5" fill="#dc2626" />
          <line x1="22" y1="44" x2="30" y2="44" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="42" y1="44" x2="50" y2="44" stroke="#0f172a" strokeWidth="1.5" />
          <path d="M 36 22 L 36 28 M 32 25 L 40 25" stroke="#0f172a" strokeWidth="1.5" />
          <path d="M 31 48 Q 36 53 41 48" stroke="#991b1b" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 12 36 Q 8 16 18 8 Q 28 2 36 6 Q 44 2 54 8 Q 64 16 60 36 Z" fill="#f472b6" stroke="#db2777" strokeWidth="1" />
          <path d="M 22 18 L 28 26 L 34 18 L 40 26 L 46 18" stroke="#db2777" strokeWidth="2" fill="none" />
        </g>
      )

    case 'tanjiro':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 16 50 L 20 72 L 52 72 L 56 50 Z" fill="#047857" stroke="#064e3b" strokeWidth="1.5" />
          <rect x="22" y="52" width="7" height="8" fill="#18181b" />
          <rect x="36" y="52" width="7" height="8" fill="#18181b" />
          <rect x="29" y="60" width="7" height="8" fill="#18181b" />
          <rect x="43" y="60" width="7" height="8" fill="#18181b" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="23" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <ellipse cx="49" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <path d="M 26 22 Q 22 26 28 30 Q 30 25 26 22 Z" fill="#dc2626" />
          <rect x="10" y="42" width="6" height="12" rx="1" fill="#f8fafc" stroke="#0f172a" strokeWidth="0.8" />
          <circle cx="13" cy="46" r="1.8" fill="#dc2626" />
          <rect x="56" y="42" width="6" height="12" rx="1" fill="#f8fafc" stroke="#0f172a" strokeWidth="0.8" />
          <circle cx="59" cy="46" r="1.8" fill="#dc2626" />
          <circle cx="26" cy="38" r="4" fill="#78350f" />
          <circle cx="25" cy="37" r="1.5" fill="#ffffff" />
          <circle cx="46" cy="38" r="4" fill="#78350f" />
          <circle cx="45" cy="37" r="1.5" fill="#ffffff" />
          <path d="M 33 46 Q 36 49 39 46" stroke="#0f172a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 12 36 Q 8 16 20 8 Q 30 2 36 6 Q 44 2 54 8 Q 64 16 60 36 Z" fill="#881337" stroke="#4c0519" strokeWidth="1.2" />
          <path d="M 22 18 L 26 24 L 32 16 L 38 24 L 46 16" stroke="#4c0519" strokeWidth="2" fill="none" />
        </g>
      )

    case 'nezuko':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
          <rect x="26" y="58" width="20" height="7" fill="#dc2626" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="23" cy="42" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <ellipse cx="49" cy="42" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <circle cx="26" cy="37" r="4.2" fill="#f472b6" />
          <circle cx="26" cy="37" r="2.2" fill="#db2777" />
          <circle cx="25" cy="36" r="1.2" fill="#ffffff" />
          <circle cx="46" cy="37" r="4.2" fill="#f472b6" />
          <circle cx="46" cy="37" r="2.2" fill="#db2777" />
          <circle cx="45" cy="36" r="1.2" fill="#ffffff" />
          <rect x="26" y="44" width="20" height="7" rx="3" fill="#15803d" stroke="#0f172a" strokeWidth="1" />
          <line x1="32" y1="44" x2="32" y2="51" stroke="#dc2626" strokeWidth="1.5" />
          <line x1="40" y1="44" x2="40" y2="51" stroke="#dc2626" strokeWidth="1.5" />
          <path d="M 10 38 Q 6 12 20 8 Q 30 4 36 6 Q 44 4 52 8 Q 66 12 62 38 Z" fill="#0f172a" />
          <path d="M 8 36 Q 6 56 12 68" stroke="#ea580c" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 64 36 Q 66 56 60 68" stroke="#ea580c" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="18" r="5" fill="#f472b6" />
        </g>
      )

    case 'luffy':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="23" cy="42" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <ellipse cx="49" cy="42" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <circle cx="26" cy="36" r="3.5" fill="#0f172a" />
          <circle cx="25" cy="35" r="1.2" fill="#ffffff" />
          <circle cx="46" cy="36" r="3.5" fill="#0f172a" />
          <circle cx="45" cy="35" r="1.2" fill="#ffffff" />
          <path d="M 28 44 Q 36 53 44 44 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
          <line x1="28" y1="44" x2="44" y2="44" stroke="#0f172a" strokeWidth="1.2" />
          <path d="M 14 34 Q 10 18 20 12 Q 30 8 36 10 Q 44 8 52 12 Q 62 18 58 34 Z" fill="#0f172a" />
          <ellipse cx="36" cy="18" rx="30" ry="7" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
          <path d="M 20 18 C 20 6 52 6 52 18 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          <rect x="20" y="14" width="32" height="4" fill="#dc2626" />
        </g>
      )

    case 'zoro':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#047857" stroke="#064e3b" strokeWidth="1.5" />
          <path d="M 26 50 L 36 62 L 46 50 Z" fill="#15803d" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <path d="M 22 34 L 30 36" stroke="#0f172a" strokeWidth="2" />
          <circle cx="26" cy="38" r="3" fill="#0f172a" />
          <line x1="42" y1="33" x2="50" y2="39" stroke="#78350f" strokeWidth="1.5" />
          <circle cx="13" cy="46" r="1.5" fill="#facc15" />
          <circle cx="13" cy="49" r="1.5" fill="#facc15" />
          <circle cx="13" cy="52" r="1.5" fill="#facc15" />
          <path d="M 33 46 Q 36 44 39 46" stroke="#0f172a" strokeWidth="1.5" fill="none" />
          <path d="M 12 36 Q 8 16 20 8 Q 30 2 36 6 Q 44 2 54 8 Q 64 16 60 36 Z" fill="#10b981" stroke="#059669" strokeWidth="1.2" />
          <path d="M 22 16 L 28 24 L 34 16 L 40 24 L 46 16" stroke="#059669" strokeWidth="2" fill="none" />
        </g>
      )

    case 'goku':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
          <path d="M 30 50 L 36 64 L 42 50 Z" fill="#1e3a8a" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <path d="M 22 33 L 30 35" stroke="#0f172a" strokeWidth="2" />
          <circle cx="26" cy="37" r="3.5" fill="#94a3b8" />
          <circle cx="26" cy="37" r="1.5" fill="#0f172a" />
          <path d="M 42 35 L 50 33" stroke="#0f172a" strokeWidth="2" />
          <circle cx="46" cy="37" r="3.5" fill="#94a3b8" />
          <circle cx="46" cy="37" r="1.5" fill="#0f172a" />
          <path d="M 33 46 Q 36 44 39 46" stroke="#0f172a" strokeWidth="1.5" fill="none" />
          <path d="M 6 30 L 16 16 L 14 6 L 26 12 L 36 2 L 46 12 L 58 6 L 56 16 L 66 30 Q 52 20 36 22 Q 20 20 6 30 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
        </g>
      )

    case 'naruto':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
          <rect x="22" y="50" width="28" height="6" fill="#18181b" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="23" cy="42" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <ellipse cx="49" cy="42" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <circle cx="26" cy="37" r="3.5" fill="#0284c7" />
          <circle cx="25" cy="36" r="1.2" fill="#ffffff" />
          <circle cx="46" cy="37" r="3.5" fill="#0284c7" />
          <circle cx="45" cy="36" r="1.2" fill="#ffffff" />
          <path d="M 31 46 Q 36 51 41 46" stroke="#0f172a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <line x1="17" y1="40" x2="21" y2="40" stroke="#78350f" strokeWidth="1" />
          <line x1="16" y1="43" x2="21" y2="43" stroke="#78350f" strokeWidth="1" />
          <line x1="51" y1="40" x2="55" y2="40" stroke="#78350f" strokeWidth="1" />
          <line x1="51" y1="43" x2="56" y2="43" stroke="#78350f" strokeWidth="1" />
          <rect x="18" y="24" width="36" height="8" rx="2" fill="#18181b" />
          <rect x="26" y="25" width="20" height="6" rx="1" fill="#94a3b8" />
          <path d="M 12 28 L 16 14 L 26 10 L 36 4 L 46 10 L 56 14 L 60 28 Q 50 18 36 20 Q 22 18 12 28 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.2" />
        </g>
      )

    case 'itachi':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#18181b" stroke="#09090b" strokeWidth="1.5" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <line x1="22" y1="41" x2="26" y2="49" stroke="#78350f" strokeWidth="1.2" />
          <line x1="50" y1="41" x2="46" y2="49" stroke="#78350f" strokeWidth="1.2" />
          <circle cx="26" cy="37" r="3.5" fill="#dc2626" />
          <circle cx="26" cy="37" r="1.5" fill="#0f172a" />
          <circle cx="46" cy="37" r="3.5" fill="#dc2626" />
          <circle cx="46" cy="37" r="1.5" fill="#0f172a" />
          <line x1="33" y1="47" x2="39" y2="47" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="18" y="24" width="36" height="8" rx="2" fill="#18181b" />
          <rect x="26" y="25" width="20" height="6" rx="1" fill="#94a3b8" />
          <line x1="28" y1="28" x2="44" y2="28" stroke="#dc2626" strokeWidth="1.2" />
          <path d="M 12 28 C 12 12 60 12 60 28 C 50 18 22 18 12 28 Z" fill="#0f172a" />
        </g>
      )

    case 'levi':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#065f46" stroke="#064e3b" strokeWidth="1.5" />
          <path d="M 32 50 L 36 58 L 40 50 Z" fill="#ffffff" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <path d="M 22 34 L 30 35" stroke="#0f172a" strokeWidth="2" />
          <circle cx="26" cy="37" r="3" fill="#334155" />
          <path d="M 42 35 L 50 34" stroke="#0f172a" strokeWidth="2" />
          <circle cx="46" cy="37" r="3" fill="#334155" />
          <line x1="33" y1="46" x2="39" y2="46" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 14 36 C 14 16 58 16 58 36 C 50 20 40 24 36 28 C 32 24 22 20 14 36 Z" fill="#0f172a" />
        </g>
      )

    case 'frieren':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M 28 50 L 36 56 L 44 50 Z" fill="#0284c7" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <polygon points="16,36 4,32 16,42" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
          <polygon points="56,36 68,32 56,42" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <ellipse cx="23" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.3" />
          <ellipse cx="49" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.3" />
          <circle cx="26" cy="38" r="3.5" fill="#059669" />
          <circle cx="25" cy="37" r="1.2" fill="#ffffff" />
          <circle cx="46" cy="38" r="3.5" fill="#059669" />
          <circle cx="45" cy="37" r="1.2" fill="#ffffff" />
          <path d="M 34 46 Q 36 48 38 46" stroke="#71717a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M 14 36 C 14 16 58 16 58 36 C 48 20 24 20 14 36 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="14" cy="24" r="3" fill="#eab308" />
          <circle cx="58" cy="24" r="3" fill="#eab308" />
          <path d="M 14 26 Q 8 46 10 64" stroke="#f8fafc" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M 58 26 Q 64 46 62 64" stroke="#f8fafc" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        </g>
      )

    case 'anya':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#18181b" stroke="#09090b" strokeWidth="1.5" />
          <circle cx="36" cy="56" r="3" fill="#facc15" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="23" cy="44" rx="5" ry="2.5" fill="#f43f5e" opacity="0.5" />
          <ellipse cx="49" cy="44" rx="5" ry="2.5" fill="#f43f5e" opacity="0.5" />
          <circle cx="26" cy="38" r="4.5" fill="#15803d" />
          <circle cx="25" cy="36" r="1.5" fill="#ffffff" />
          <circle cx="46" cy="38" r="4.5" fill="#15803d" />
          <circle cx="45" cy="36" r="1.5" fill="#ffffff" />
          <path d="M 32 46 Q 36 51 40 46" stroke="#991b1b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <polygon points="16,14 11,24 21,24" fill="#18181b" stroke="#eab308" strokeWidth="1" />
          <polygon points="56,14 51,24 61,24" fill="#18181b" stroke="#eab308" strokeWidth="1" />
          <path d="M 12 36 Q 10 14 24 12 Q 36 10 48 12 Q 62 14 60 36 C 54 22 18 22 12 36 Z" fill="#f472b6" stroke="#ec4899" strokeWidth="1" />
        </g>
      )

    case 'bocchi':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#f472b6" stroke="#db2777" strokeWidth="1.5" />
          <line x1="36" y1="50" x2="36" y2="72" stroke="#ffffff" strokeWidth="2" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="23" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <ellipse cx="49" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <path d="M 23 38 Q 26 34 29 38 Q 26 42 23 38" stroke="#06b6d4" strokeWidth="1.8" fill="none" />
          <path d="M 43 38 Q 46 34 49 38 Q 46 42 43 38" stroke="#06b6d4" strokeWidth="1.8" fill="none" />
          <path d="M 31 46 Q 33 48 35 46 Q 37 48 39 46 Q 41 48 43 46" stroke="#0f172a" strokeWidth="1.2" fill="none" />
          <rect x="18" y="14" width="6" height="6" fill="#0284c7" />
          <rect x="22" y="12" width="6" height="6" fill="#facc15" />
          <path d="M 12 38 Q 8 16 22 10 Q 36 8 50 10 Q 64 16 60 38 C 50 22 22 22 12 38 Z" fill="#f472b6" stroke="#ec4899" strokeWidth="1" />
        </g>
      )

    case 'nijika':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
          <path d="M 32 50 L 36 60 L 40 50 Z" fill="#dc2626" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="23" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <ellipse cx="49" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <circle cx="26" cy="38" r="3.5" fill="#ca8a04" />
          <circle cx="25" cy="37" r="1.2" fill="#ffffff" />
          <circle cx="46" cy="38" r="3.5" fill="#ca8a04" />
          <circle cx="45" cy="37" r="1.2" fill="#ffffff" />
          <path d="M 32 46 Q 36 51 40 46" stroke="#991b1b" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <polygon points="36,4 42,14 30,14" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          <path d="M 12 36 Q 10 14 24 10 Q 36 8 48 10 Q 62 14 60 36 C 54 20 18 20 12 36 Z" fill="#facc15" stroke="#eab308" strokeWidth="1.2" />
          <path d="M 54 24 Q 68 28 66 52" stroke="#facc15" strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>
      )

    case 'ryo':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#1e1b4b" stroke="#0f172a" strokeWidth="1.5" />
          <path d="M 32 50 L 36 58 L 40 50 Z" fill="#ffffff" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="23" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.3" />
          <ellipse cx="49" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.3" />
          <path d="M 22 36 L 30 38" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
          <circle cx="26" cy="39" r="3" fill="#1e3a8a" />
          <path d="M 42 38 L 50 36" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
          <circle cx="46" cy="39" r="3" fill="#1e3a8a" />
          <path d="M 33 46 Q 36 47 39 46" stroke="#0f172a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M 12 36 Q 8 16 22 10 Q 36 8 50 10 Q 64 16 60 36 C 50 22 22 22 12 36 Z" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.2" />
          <line x1="18" y1="28" x2="26" y2="28" stroke="#0f172a" strokeWidth="1.8" />
        </g>
      )

    case 'kita':
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />
          <path d="M 32 50 L 36 60 L 40 50 Z" fill="#dc2626" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="23" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <ellipse cx="49" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <circle cx="26" cy="38" r="3.5" fill="#15803d" />
          <circle cx="25" cy="37" r="1.2" fill="#ffffff" />
          <circle cx="46" cy="38" r="3.5" fill="#15803d" />
          <circle cx="45" cy="37" r="1.2" fill="#ffffff" />
          <path d="M 32 46 Q 36 51 40 46" stroke="#991b1b" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M 12 36 Q 8 14 22 10 Q 36 8 50 10 Q 64 14 60 36 C 50 20 22 20 12 36 Z" fill="#ef4444" stroke="#dc2626" strokeWidth="1.2" />
        </g>
      )

    default:
      return (
        <g transform="translate(122, 108)" className="animate-chibi-bounce pointer-events-none select-none">
          <ellipse cx="36" cy="74" rx="26" ry="7" fill="rgba(0,0,0,0.3)" />
          <path d="M 18 50 L 20 72 L 52 72 L 54 50 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
          <ellipse cx="14" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="58" cy="58" rx="5" ry="4" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="36" cy="38" rx="22" ry="19" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
          <ellipse cx="23" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <ellipse cx="49" cy="44" rx="4" ry="2" fill="#f43f5e" opacity="0.4" />
          <circle cx="26" cy="38" r="3.5" fill="#0f172a" />
          <circle cx="25" cy="37" r="1.2" fill="#ffffff" />
          <circle cx="46" cy="38" r="3.5" fill="#0f172a" />
          <circle cx="45" cy="37" r="1.2" fill="#ffffff" />
          <path d="M 33 46 Q 36 49 39 46" stroke="#0f172a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 12 34 Q 8 16 20 8 Q 30 2 36 6 Q 44 2 54 8 Q 64 16 60 34 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.2" />
        </g>
      )
  }
})
