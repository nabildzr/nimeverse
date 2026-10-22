import { memo } from 'react'

interface EffectProps {
  code: string
}

export const CharacterRingEffect = memo(function CharacterRingEffect({ code }: EffectProps) {
  switch (code) {
    case 'frame-tanjiro':
    case 'frame-rengoku':
    case 'frame-ace':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <defs>
            <linearGradient id="fire-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="40%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
            <radialGradient id="fire-glow" cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="#f97316" stopOpacity="0" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.4" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="92" fill="url(#fire-glow)" />
          <circle cx="100" cy="100" r="86" fill="none" stroke="#7f1d1d" strokeWidth="2" opacity="0.6" />
          <g style={{ animation: 'solar-spin 5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="url(#fire-grad)"
              strokeWidth="5.5"
              strokeDasharray="32 12 44 16 20 18"
              strokeLinecap="round"
              filter="drop-shadow(0 0 8px #f97316)"
            />
          </g>
          <g style={{ animation: 'solar-spin 9s linear infinite reverse', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="80" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="14 18 24 14" opacity="0.8" />
          </g>
          <circle cx="168" cy="130" r="3" fill="#facc15" style={{ animation: 'fire-spark 2.2s ease-out infinite' }} />
          <circle cx="178" cy="90" r="2.5" fill="#f97316" style={{ animation: 'fire-spark 2.2s ease-out 0.7s infinite' }} />
          <circle cx="155" cy="55" r="3" fill="#ef4444" style={{ animation: 'fire-spark 2.2s ease-out 1.4s infinite' }} />
          <circle cx="95" cy="20" r="2.5" fill="#facc15" style={{ animation: 'fire-spark 2.2s ease-out 0.4s infinite' }} />
        </svg>
      )

    case 'frame-jotaro':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <defs>
            <linearGradient id="stand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="86" fill="none" stroke="#581c87" strokeWidth="2" opacity="0.7" />
          <g style={{ animation: 'stand-aura 2.2s infinite ease-in-out', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="89" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6 8" filter="drop-shadow(0 0 10px #9333ea)" />
          </g>
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="85" fill="none" stroke="url(#stand-grad)" strokeWidth="4.5" strokeDasharray="36 18 24 16" strokeLinecap="round" />
          </g>
          <text x="162" y="48" fill="#c084fc" fontSize="18" fontWeight="900" style={{ animation: 'float-gogogo 2.5s ease-in infinite' }}>
            ゴ
          </text>
          <text x="178" y="76" fill="#a855f7" fontSize="13" fontWeight="900" style={{ animation: 'float-gogogo 2.5s ease-in 0.8s infinite' }}>
            ゴ
          </text>
          <text x="168" y="115" fill="#c084fc" fontSize="15" fontWeight="900" style={{ animation: 'float-gogogo 2.5s ease-in 1.5s infinite' }}>
            ゴ
          </text>
        </svg>
      )

    case 'frame-dio':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <defs>
            <linearGradient id="dio-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="92" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="4 6" style={{ animation: 'timestop-wave 3s infinite ease-in-out', transformOrigin: '100px 100px' }} />
          <g style={{ animation: 'solar-spin 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="url(#dio-grad)" strokeWidth="5" strokeDasharray="30 15 45 15" strokeLinecap="round" filter="drop-shadow(0 0 8px #eab308)" />
          </g>
          <circle cx="100" cy="14" r="5" fill="#22c55e" filter="drop-shadow(0 0 6px #16a34a)" />
          <text x="156" y="46" fill="#facc15" fontSize="12" fontWeight="900" style={{ animation: 'float-gogogo 2.8s ease-in infinite' }}>
            無駄
          </text>
          <text x="164" y="80" fill="#fde047" fontSize="11" fontWeight="900" style={{ animation: 'float-gogogo 2.8s ease-in 1.2s infinite' }}>
            WRYY
          </text>
        </svg>
      )

    case 'frame-giorno':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#fbbf24" strokeWidth="4.5" strokeDasharray="24 12 36 14" strokeLinecap="round" filter="drop-shadow(0 0 8px #f59e0b)" />
          </g>
          <circle cx="170" cy="60" r="6" fill="#f43f5e" filter="drop-shadow(0 0 6px #e11d48)" style={{ animation: 'star-twinkle 2.5s infinite' }} />
          <circle cx="180" cy="90" r="5" fill="#fbbf24" style={{ animation: 'star-twinkle 2.5s infinite 0.8s' }} />
          <circle cx="160" cy="125" r="5.5" fill="#f43f5e" style={{ animation: 'star-twinkle 2.5s infinite 1.6s' }} />
        </svg>
      )

    case 'frame-joseph':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'alchemy-spark 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="87" fill="none" stroke="#c084fc" strokeWidth="4" strokeDasharray="16 10 26 8" strokeLinecap="round" filter="drop-shadow(0 0 6px #a855f7)" />
          </g>
          <g style={{ animation: 'lightning-flash 2.5s infinite' }}>
            <path d="M 160 50 L 170 60 L 165 64 L 175 74" stroke="#facc15" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
          <text x="146" y="38" fill="#facc15" fontSize="11" fontWeight="900" style={{ animation: 'float-gogogo 3s ease-in infinite' }}>
            OH NO!
          </text>
        </svg>
      )

    case 'frame-jolyne':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'hollow-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#22d3ee" strokeWidth="4" strokeDasharray="30 15 20 15" strokeLinecap="round" filter="drop-shadow(0 0 8px #06b6d4)" />
            <circle cx="100" cy="14" r="5" fill="#f43f5e" />
          </g>
          <circle cx="172" cy="70" r="4" fill="#22d3ee" style={{ animation: 'star-twinkle 2s infinite' }} />
        </svg>
      )

    case 'frame-gojo':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <circle cx="100" cy="100" r="86" fill="none" stroke="#312e81" strokeWidth="2" opacity="0.6" />
          <g style={{ animation: 'hollow-spin 4s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="16" r="9" fill="#38bdf8" filter="drop-shadow(0 0 10px #0ea5e9)" />
            <circle cx="100" cy="184" r="9" fill="#ef4444" filter="drop-shadow(0 0 10px #dc2626)" />
          </g>
          <circle cx="100" cy="100" r="86" fill="none" stroke="#c084fc" strokeWidth="4.5" strokeDasharray="24 16 12 16" strokeLinecap="round" filter="drop-shadow(0 0 10px #a855f7)" style={{ animation: 'hollow-spin 10s linear infinite reverse', transformOrigin: '100px 100px' }} />
        </svg>
      )

    case 'frame-sukuna':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="20 12 40 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #b91c1c)" />
          </g>
          <line x1="25" y1="35" x2="175" y2="165" stroke="#ef4444" strokeWidth="3" strokeDasharray="60" style={{ animation: 'domain-slash 2.4s infinite' }} />
          <line x1="175" y1="35" x2="25" y2="165" stroke="#ef4444" strokeWidth="3" strokeDasharray="60" style={{ animation: 'domain-slash 2.4s infinite 0.4s' }} />
        </svg>
      )

    case 'frame-itadori':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f97316" strokeWidth="4.5" strokeDasharray="30 15 20 15" strokeLinecap="round" filter="drop-shadow(0 0 6px #ea580c)" />
          </g>
          <g style={{ animation: 'kokusen-burst 2.6s infinite' }}>
            <circle cx="100" cy="100" r="90" fill="none" stroke="#dc2626" strokeWidth="3" filter="drop-shadow(0 0 10px #000000)" />
            <path d="M 155 45 L 175 65 L 165 72 L 185 90" stroke="#000000" strokeWidth="3.5" fill="none" />
            <path d="M 155 45 L 175 65 L 165 72 L 185 90" stroke="#ef4444" strokeWidth="1.8" fill="none" />
          </g>
        </svg>
      )

    case 'frame-megumi':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'shadow-rise 3s ease-in-out infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="20 12" strokeLinecap="round" filter="drop-shadow(0 0 8px #059669)" />
            <circle cx="170" cy="75" r="5" fill="#34d399" filter="drop-shadow(0 0 6px #10b981)" />
          </g>
        </svg>
      )

    case 'frame-luffy':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <defs>
            <linearGradient id="nika-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <g style={{ animation: 'solar-spin 12s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="url(#nika-grad)" strokeWidth="4.5" strokeDasharray="28 14 36 14" strokeLinecap="round" filter="drop-shadow(0 0 8px #fbbf24)" />
          </g>
          <g style={{ animation: 'cloud-float 9s ease-in-out infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="14" r="11" fill="#f8fafc" filter="drop-shadow(0 0 6px #e2e8f0)" />
            <circle cx="116" cy="19" r="8" fill="#f8fafc" />
            <circle cx="84" cy="19" r="8" fill="#f8fafc" />
            <circle cx="184" cy="100" r="10" fill="#f8fafc" filter="drop-shadow(0 0 5px #e2e8f0)" />
          </g>
        </svg>
      )

    case 'frame-zoro':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#10b981" strokeWidth="5" strokeDasharray="30 14 40 18" strokeLinecap="round" filter="drop-shadow(0 0 10px #059669)" />
          </g>
          <line x1="140" y1="40" x2="185" y2="85" stroke="#34d399" strokeWidth="3" strokeDasharray="40" style={{ animation: 'domain-slash 2.6s infinite' }} />
        </svg>
      )

    case 'frame-sanji':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6s linear infinite reverse', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#38bdf8" strokeWidth="5" strokeDasharray="28 14 36 18" strokeLinecap="round" filter="drop-shadow(0 0 10px #0284c7)" />
          </g>
          <circle cx="170" cy="110" r="3.5" fill="#67e8f9" style={{ animation: 'fire-spark 2.2s ease-out infinite' }} />
        </svg>
      )

    case 'frame-law':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" style={{ animation: 'timestop-wave 3.5s infinite ease-in-out', transformOrigin: '100px 100px' }} />
          <g style={{ animation: 'solar-spin 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#0ea5e9" strokeWidth="4" strokeDasharray="24 16 12 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #0284c7)" />
          </g>
          <text x="154" y="50" fill="#38bdf8" fontSize="11" fontWeight="900" style={{ animation: 'float-gogogo 3s ease-in infinite' }}>
            ROOM
          </text>
        </svg>
      )

    case 'frame-goku':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#bae6fd" strokeWidth="3" strokeDasharray="6 8" style={{ animation: 'divine-heat 2s infinite ease-in-out', transformOrigin: '100px 100px' }} />
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#e0f2fe" strokeWidth="4.5" strokeDasharray="30 14 20 14" strokeLinecap="round" filter="drop-shadow(0 0 8px #38bdf8)" />
          </g>
          <circle cx="165" cy="70" r="3" fill="#ffffff" style={{ animation: 'fire-spark 2.5s ease-out infinite' }} />
          <circle cx="150" cy="40" r="2.5" fill="#bae6fd" style={{ animation: 'fire-spark 2.5s ease-out 1s infinite' }} />
        </svg>
      )

    case 'frame-vegeta':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#818cf8" strokeWidth="4.5" strokeDasharray="26 12 34 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #6366f1)" />
          </g>
          <g style={{ animation: 'lightning-flash 2.3s infinite' }}>
            <path d="M 165 60 L 175 72 L 170 76 L 180 88" stroke="#c084fc" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      )

    case 'frame-trunks':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'blade-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <line x1="100" y1="8" x2="100" y2="30" stroke="#fbbf24" strokeWidth="3" filter="drop-shadow(0 0 6px #f59e0b)" />
          </g>
          <g style={{ animation: 'solar-spin 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#facc15" strokeWidth="4" strokeDasharray="20 12 30 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #eab308)" />
          </g>
        </svg>
      )

    case 'frame-naruto':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f97316" strokeWidth="4.5" strokeDasharray="30 14 36 18" strokeLinecap="round" filter="drop-shadow(0 0 8px #ea580c)" />
          </g>
          <g style={{ animation: 'rasengan-swirl 3.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="16" r="10" fill="#38bdf8" filter="drop-shadow(0 0 10px #0284c7)" />
            <circle cx="184" cy="100" r="8" fill="#facc15" filter="drop-shadow(0 0 8px #ea580c)" />
          </g>
        </svg>
      )

    case 'frame-sasuke':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeDasharray="24 14 32 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #2563eb)" />
          </g>
          <g style={{ animation: 'lightning-flash 2.2s infinite' }}>
            <path d="M 160 55 L 172 68 L 166 73 L 178 86" stroke="#60a5fa" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      )

    case 'frame-itachi':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="24 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #dc2626)" />
            <circle cx="100" cy="14" r="5" fill="#000000" />
            <circle cx="174" cy="144" r="5" fill="#000000" />
            <circle cx="26" cy="144" r="5" fill="#000000" />
          </g>
        </svg>
      )

    case 'frame-kakashi':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray="24 12 36 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #0284c7)" />
          </g>
          <g style={{ animation: 'lightning-flash 2.1s infinite' }}>
            <path d="M 155 45 L 170 60 L 164 64 L 180 80" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      )

    case 'frame-hinata':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'hollow-spin 12s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#c084fc" strokeWidth="4.5" strokeDasharray="20 14" strokeLinecap="round" filter="drop-shadow(0 0 8px #a855f7)" />
            <circle cx="100" cy="14" r="6" fill="#a855f7" filter="drop-shadow(0 0 8px #c084fc)" />
          </g>
        </svg>
      )

    case 'frame-levi':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="24 14 36 14" strokeLinecap="round" filter="drop-shadow(0 0 6px #059669)" />
          </g>
          <g style={{ animation: 'blade-spin 5s linear infinite', transformOrigin: '100px 100px' }}>
            <line x1="100" y1="8" x2="100" y2="28" stroke="#e2e8f0" strokeWidth="3.5" strokeLinecap="round" filter="drop-shadow(0 0 6px #ffffff)" />
            <line x1="172" y1="100" x2="192" y2="100" stroke="#e2e8f0" strokeWidth="3.5" strokeLinecap="round" filter="drop-shadow(0 0 6px #ffffff)" />
          </g>
        </svg>
      )

    case 'frame-eren':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#15803d" strokeWidth="4" strokeDasharray="20 12 32 16" strokeLinecap="round" />
          </g>
          <g style={{ animation: 'lightning-flash 2.4s infinite' }}>
            <path d="M 160 50 L 175 66 L 168 70 L 182 85" stroke="#22c55e" strokeWidth="3.5" fill="none" strokeLinecap="round" filter="drop-shadow(0 0 8px #16a34a)" />
          </g>
        </svg>
      )

    case 'frame-mikasa':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="28 14" strokeLinecap="round" filter="drop-shadow(0 0 6px #dc2626)" />
          </g>
          <g style={{ animation: 'cloud-float 8s ease-in-out infinite', transformOrigin: '100px 100px' }}>
            <path d="M 150 40 Q 170 70 160 100" stroke="#dc2626" strokeWidth="3.5" fill="none" strokeLinecap="round" filter="drop-shadow(0 0 6px #b91c1c)" />
          </g>
        </svg>
      )

    case 'frame-nezuko':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f472b6" strokeWidth="4.5" strokeDasharray="24 14 36 16" strokeLinecap="round" filter="drop-shadow(0 0 10px #ec4899)" />
          </g>
          <circle cx="168" cy="115" r="4" fill="#f43f5e" style={{ animation: 'fire-spark 2.2s ease-out infinite' }} />
          <circle cx="178" cy="75" r="3.5" fill="#f472b6" style={{ animation: 'fire-spark 2.2s ease-out 0.8s infinite' }} />
        </svg>
      )

    case 'frame-zenitsu':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#facc15" strokeWidth="4.5" strokeDasharray="26 12 36 16" strokeLinecap="round" filter="drop-shadow(0 0 10px #eab308)" />
          </g>
          <g style={{ animation: 'lightning-flash 2.2s infinite' }}>
            <path d="M 96 12 L 106 24 L 98 28 L 110 40" stroke="#facc15" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 166 85 L 176 96 L 170 100 L 182 112" stroke="#facc15" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      )

    case 'frame-ichigo':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="30 16 20 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #dc2626)" />
          </g>
          <line x1="25" y1="35" x2="175" y2="165" stroke="#000000" strokeWidth="4.5" strokeDasharray="50" style={{ animation: 'domain-slash 2.6s infinite' }} />
          <line x1="25" y1="35" x2="175" y2="165" stroke="#ef4444" strokeWidth="2" strokeDasharray="50" style={{ animation: 'domain-slash 2.6s infinite' }} />
        </svg>
      )

    case 'frame-aizen':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <circle cx="100" cy="100" r="86" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="8 6" style={{ animation: 'timestop-wave 4s infinite' }} />
          <g style={{ animation: 'solar-spin 11s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#c084fc" strokeWidth="4" strokeDasharray="24 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #9333ea)" />
          </g>
        </svg>
      )

    case 'frame-hitsugaya':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#38bdf8" strokeWidth="4.5" strokeDasharray="20 14 32 14" strokeLinecap="round" filter="drop-shadow(0 0 8px #0284c7)" />
          </g>
          <circle cx="170" cy="65" r="5" fill="#e0f2fe" style={{ animation: 'frost-glint 2.5s infinite' }} />
        </svg>
      )

    case 'frame-killua':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#38bdf8" strokeWidth="4.5" strokeDasharray="26 12 36 16" strokeLinecap="round" filter="drop-shadow(0 0 10px #0ea5e9)" />
          </g>
          <g style={{ animation: 'lightning-flash 2.3s infinite' }}>
            <path d="M 160 55 L 172 68 L 166 73 L 178 86" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 166 90 L 176 100 L 170 104 L 180 115" stroke="#c084fc" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      )

    case 'frame-gon':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="28 14 20 14" strokeLinecap="round" filter="drop-shadow(0 0 8px #d97706)" />
          </g>
          <circle cx="168" cy="70" r="5" fill="#22c55e" style={{ animation: 'star-twinkle 2s infinite' }} />
        </svg>
      )

    case 'frame-kurapika':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 12s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="10 6 16 6" strokeLinecap="round" filter="drop-shadow(0 0 6px #94a3b8)" />
          </g>
          <circle cx="174" cy="80" r="4.5" fill="#ef4444" filter="drop-shadow(0 0 8px #dc2626)" />
        </svg>
      )

    case 'frame-jinwoo':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'shadow-rise 2.5s ease-in-out infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#4f46e5" strokeWidth="5" strokeDasharray="24 12 36 16" strokeLinecap="round" filter="drop-shadow(0 0 10px #4338ca)" />
            <circle cx="168" cy="80" r="4" fill="#22d3ee" filter="drop-shadow(0 0 8px #06b6d4)" />
            <circle cx="155" cy="45" r="3.5" fill="#22d3ee" filter="drop-shadow(0 0 8px #06b6d4)" />
          </g>
        </svg>
      )

    case 'frame-guts':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#991b1b" strokeWidth="5" strokeDasharray="20 14 36 14" strokeLinecap="round" filter="drop-shadow(0 0 8px #7f1d1d)" />
          </g>
          <path d="M 165 40 L 175 60 L 168 85" stroke="#ef4444" strokeWidth="2.5" fill="none" filter="drop-shadow(0 0 8px #dc2626)" style={{ animation: 'kokusen-burst 2.8s infinite' }} />
        </svg>
      )

    case 'frame-kaneki':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#dc2626" strokeWidth="4.5" strokeDasharray="28 14 34 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #b91c1c)" />
          </g>
          <circle cx="165" cy="50" r="4" fill="#dc2626" style={{ animation: 'petal-drift 3s infinite' }} />
        </svg>
      )

    case 'frame-frieren':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <circle cx="100" cy="100" r="86" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="4 6" style={{ animation: 'hollow-spin 25s linear infinite', transformOrigin: '100px 100px' }} />
          <g style={{ animation: 'solar-spin 12s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#fbbf24" strokeWidth="4" strokeDasharray="24 16 36 14" strokeLinecap="round" filter="drop-shadow(0 0 6px #f59e0b)" />
          </g>
          <g style={{ animation: 'petal-drift 3.5s ease-in-out infinite' }}>
            <circle cx="165" cy="48" r="5" fill="#60a5fa" filter="drop-shadow(0 0 6px #3b82f6)" />
            <circle cx="178" cy="62" r="4" fill="#93c5fd" />
            <circle cx="160" cy="95" r="4.5" fill="#60a5fa" />
          </g>
        </svg>
      )

    case 'frame-anya':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 11s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f472b6" strokeWidth="4.5" strokeDasharray="24 14 32 14" strokeLinecap="round" filter="drop-shadow(0 0 8px #ec4899)" />
          </g>
          <circle cx="168" cy="65" r="5" fill="#facc15" filter="drop-shadow(0 0 6px #f59e0b)" style={{ animation: 'star-twinkle 2s infinite' }} />
          <circle cx="178" cy="95" r="4" fill="#fbbf24" style={{ animation: 'star-twinkle 2s infinite 0.7s' }} />
          <circle cx="100" cy="14" r="5" fill="#facc15" style={{ animation: 'star-twinkle 2s infinite 1.3s' }} />
        </svg>
      )

    case 'frame-saitama':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#facc15" strokeWidth="3" style={{ animation: 'timestop-wave 2.2s infinite' }} />
          <g style={{ animation: 'solar-spin 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#eab308" strokeWidth="4.5" strokeDasharray="30 16 20 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #ca8a04)" />
          </g>
        </svg>
      )

    case 'frame-megumin':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ef4444" strokeWidth="5" strokeDasharray="24 12 36 14" strokeLinecap="round" filter="drop-shadow(0 0 8px #dc2626)" />
          </g>
          <circle cx="165" cy="55" r="4" fill="#facc15" style={{ animation: 'fire-spark 2.2s ease-out infinite' }} />
        </svg>
      )

    case 'frame-rem':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <circle cx="100" cy="100" r="86" fill="none" stroke="#38bdf8" strokeWidth="4.5" strokeDasharray="14 10 24 10" strokeLinecap="round" filter="drop-shadow(0 0 8px #0284c7)" style={{ animation: 'pulse-scale 2.5s infinite' }} />
          <circle cx="172" cy="70" r="4.5" fill="#bae6fd" style={{ animation: 'star-twinkle 2s infinite' }} />
        </svg>
      )

    case 'frame-rimuru':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#06b6d4" strokeWidth="4.5" strokeDasharray="28 14 34 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #0891b2)" />
          </g>
          <g style={{ animation: 'cloud-float 7s ease-in-out infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="14" r="9" fill="#38bdf8" filter="drop-shadow(0 0 6px #0ea5e9)" />
            <circle cx="175" cy="80" r="8" fill="#38bdf8" filter="drop-shadow(0 0 6px #0ea5e9)" />
          </g>
        </svg>
      )

    case 'frame-denji':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 4s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f97316" strokeWidth="5.5" strokeDasharray="10 8 16 8" strokeLinecap="round" filter="drop-shadow(0 0 10px #ea580c)" />
          </g>
          <circle cx="170" cy="65" r="3.5" fill="#facc15" style={{ animation: 'fire-spark 2s ease-out infinite' }} />
        </svg>
      )

    case 'frame-makima':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <circle cx="100" cy="18" r="16" fill="none" stroke="#fbbf24" strokeWidth="2.5" filter="drop-shadow(0 0 8px #f59e0b)" />
          <g style={{ animation: 'solar-spin 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="24 16" strokeLinecap="round" filter="drop-shadow(0 0 6px #d97706)" />
          </g>
        </svg>
      )

    case 'frame-deku':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#10b981" strokeWidth="4.5" strokeDasharray="26 12 36 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #059669)" />
          </g>
          <g style={{ animation: 'lightning-flash 2.3s infinite' }}>
            <path d="M 160 50 L 172 62 L 166 66 L 178 78" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 98 12 L 108 22 L 102 26 L 112 36" stroke="#34d399" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      )

    case 'frame-todoroki':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <path d="M 100 12 A 86 86 0 0 1 100 188" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="20 10" strokeLinecap="round" filter="drop-shadow(0 0 8px #f87171)" />
          <path d="M 100 188 A 86 86 0 0 1 100 12" fill="none" stroke="#38bdf8" strokeWidth="4.5" strokeDasharray="20 10" strokeLinecap="round" filter="drop-shadow(0 0 8px #7dd3fc)" />
          <circle cx="170" cy="80" r="3.5" fill="#facc15" style={{ animation: 'fire-spark 2.2s infinite' }} />
        </svg>
      )

    case 'frame-edward':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'alchemy-spark 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#60a5fa" strokeWidth="4" strokeDasharray="30 14 16 14" strokeLinecap="round" filter="drop-shadow(0 0 8px #3b82f6)" />
            <polygon points="100,16 168,140 32,140" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />
          </g>
        </svg>
      )

    case 'frame-bocchi':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f472b6" strokeWidth="4.5" strokeDasharray="24 14 36 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #ec4899)" />
          </g>
          <g style={{ animation: 'orbit-reverse 13s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="12 28 8 20" strokeLinecap="round" opacity="0.8" />
          </g>
          <rect x="162" y="55" width="8" height="8" rx="1.5" fill="#f472b6" style={{ animation: 'star-twinkle 2s infinite' }} />
          <rect x="174" y="85" width="7" height="7" rx="1.5" fill="#06b6d4" style={{ animation: 'star-twinkle 2s infinite 0.7s' }} />
          <rect x="168" y="70" width="7" height="7" rx="1.5" fill="#facc15" style={{ animation: 'star-twinkle 2s infinite 1.4s' }} />
          <text x="164" y="38" fill="#f472b6" fontSize="16" fontWeight="900" style={{ animation: 'star-twinkle 2.5s infinite' }}>
            ♪
          </text>
        </svg>
      )

    case 'frame-nijika':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#facc15" strokeWidth="4.8" strokeDasharray="28 12 18 14" strokeLinecap="round" filter="drop-shadow(0 0 9px #eab308)" />
          </g>
          <g style={{ animation: 'orbit-reverse 11s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeDasharray="14 24" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="166,32 176,50 156,50" fill="#facc15" stroke="#ca8a04" strokeWidth="1" style={{ animation: 'star-twinkle 2s infinite' }} />
          <polygon points="178,74 186,88 170,88" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" style={{ animation: 'star-twinkle 2s infinite 0.9s' }} />
          <text x="160" y="70" fill="#ea580c" fontSize="16" fontWeight="900">
            ♫
          </text>
        </svg>
      )

    case 'frame-ryo':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeDasharray="36 16 20 14" strokeLinecap="round" filter="drop-shadow(0 0 9px #2563eb)" />
          </g>
          <g style={{ animation: 'orbit-reverse 14s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="16 20" strokeLinecap="round" opacity="0.8" />
          </g>
          <polygon points="168,42 175,50 168,58 161,50" fill="#60a5fa" style={{ animation: 'star-twinkle 2.5s infinite' }} />
          <polygon points="176,78 182,85 176,92 170,85" fill="#818cf8" style={{ animation: 'star-twinkle 2.5s infinite 1s' }} />
          <text x="162" y="38" fill="#3b82f6" fontSize="15" fontWeight="900">
            ♩
          </text>
        </svg>
      )

    case 'frame-kita':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ef4444" strokeWidth="4.8" strokeDasharray="30 12 24 14" strokeLinecap="round" filter="drop-shadow(0 0 11px #f43f5e)" />
          </g>
          <g style={{ animation: 'orbit-reverse 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="93" fill="none" stroke="#ec4899" strokeWidth="2.5" strokeDasharray="18 16" strokeLinecap="round" opacity="0.9" />
          </g>
          <text x="162" y="44" fill="#fb7185" fontSize="20" fontWeight="900" style={{ animation: 'star-twinkle 1.8s infinite' }}>
            ✦
          </text>
          <text x="175" y="76" fill="#f43f5e" fontSize="14" fontWeight="900" style={{ animation: 'star-twinkle 1.8s infinite 0.6s' }}>
            ✦
          </text>
          <text x="160" y="74" fill="#ec4899" fontSize="13" fontWeight="900" style={{ animation: 'star-twinkle 1.8s infinite 1.2s' }}>
            ♥
          </text>
        </svg>
      )

    case 'frame-zzz-ellen':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#0ea5e9" strokeWidth="4.8" strokeDasharray="30 14 20 16" strokeLinecap="round" filter="drop-shadow(0 0 9px #0284c7)" />
          </g>
          <g style={{ animation: 'orbit-reverse 11s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeDasharray="14 22 8 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="168,36 174,45 168,54 162,45" fill="#e0f2fe" filter="drop-shadow(0 0 6px #38bdf8)" style={{ animation: 'star-twinkle 2s infinite' }} />
          <polygon points="178,74 183,81 178,88 173,81" fill="#bae6fd" style={{ animation: 'star-twinkle 2s infinite 0.7s' }} />
          <circle cx="160" cy="95" r="3" fill="#38bdf8" style={{ animation: 'star-twinkle 2s infinite 1.3s' }} />
        </svg>
      )

    case 'frame-zzz-nicole':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ec4899" strokeWidth="4.8" strokeDasharray="26 12 36 14" strokeLinecap="round" filter="drop-shadow(0 0 10px #f43f5e)" />
          </g>
          <g style={{ animation: 'orbit-reverse 12s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeDasharray="16 20 10 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="170" cy="50" r="5" fill="#f472b6" filter="drop-shadow(0 0 6px #ec4899)" style={{ animation: 'star-twinkle 2.2s infinite' }} />
          <circle cx="178" cy="80" r="4" fill="#facc15" style={{ animation: 'star-twinkle 2.2s infinite 0.8s' }} />
          <polygon points="160,28 164,36 160,44 156,36" fill="#f472b6" style={{ animation: 'star-twinkle 2.2s infinite 1.4s' }} />
        </svg>
      )

    case 'frame-zzz-anby':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#eab308" strokeWidth="4.8" strokeDasharray="32 12 24 16" strokeLinecap="round" filter="drop-shadow(0 0 10px #facc15)" />
          </g>
          <g style={{ animation: 'orbit-reverse 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#a3e635" strokeWidth="2.2" strokeDasharray="18 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <g style={{ animation: 'lightning-flash 2.2s infinite' }}>
            <path d="M 162 40 L 174 52 L 168 56 L 180 68" stroke="#facc15" strokeWidth="3" fill="none" strokeLinecap="round" filter="drop-shadow(0 0 6px #facc15)" />
            <path d="M 172 78 L 182 86 L 177 90 L 186 98" stroke="#ffffff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      )

    case 'frame-zzz-billy':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 5.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="24 10 38 12" strokeLinecap="round" filter="drop-shadow(0 0 9px #dc2626)" />
          </g>
          <g style={{ animation: 'orbit-reverse 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="12 24" strokeLinecap="round" opacity="0.8" />
          </g>
          <g style={{ animation: 'pulse-scale 1.5s infinite', transformOrigin: '170px 55px' }}>
            <line x1="162" y1="55" x2="178" y2="55" stroke="#ef4444" strokeWidth="2.5" />
            <line x1="170" y1="47" x2="170" y2="63" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="170" cy="55" r="4.5" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          </g>
          <circle cx="178" cy="85" r="3.5" fill="#facc15" style={{ animation: 'fire-spark 2s infinite' }} />
        </svg>
      )

    case 'frame-zzz-jane':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#9333ea" strokeWidth="4.8" strokeDasharray="32 14 20 18" strokeLinecap="round" filter="drop-shadow(0 0 10px #7e22ce)" />
          </g>
          <g style={{ animation: 'orbit-reverse 13s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#f43f5e" strokeWidth="2.2" strokeDasharray="16 20 8 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="166,40 174,48 166,56 158,48" fill="#c084fc" filter="drop-shadow(0 0 6px #9333ea)" style={{ animation: 'star-twinkle 2.2s infinite' }} />
          <polygon points="178,75 184,81 178,87 172,81" fill="#f43f5e" style={{ animation: 'star-twinkle 2.2s infinite 0.9s' }} />
        </svg>
      )

    case 'frame-zzz-zhu':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#3b82f6" strokeWidth="4.8" strokeDasharray="28 12 28 12" strokeLinecap="round" filter="drop-shadow(0 0 9px #2563eb)" />
          </g>
          <g style={{ animation: 'orbit-reverse 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#06b6d4" strokeWidth="2.2" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <rect x="164" y="42" width="7" height="14" rx="2" fill="#ef4444" filter="drop-shadow(0 0 6px #dc2626)" style={{ animation: 'lightning-flash 1.8s infinite' }} />
          <rect x="174" y="60" width="7" height="14" rx="2" fill="#3b82f6" filter="drop-shadow(0 0 6px #2563eb)" style={{ animation: 'lightning-flash 1.8s infinite 0.9s' }} />
        </svg>
      )

    case 'frame-zzz-burnice':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f97316" strokeWidth="5" strokeDasharray="30 12 36 14" strokeLinecap="round" filter="drop-shadow(0 0 10px #ea580c)" />
          </g>
          <g style={{ animation: 'orbit-reverse 8.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#facc15" strokeWidth="2.5" strokeDasharray="16 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="45" r="4.5" fill="#facc15" style={{ animation: 'fire-spark 1.8s infinite' }} />
          <circle cx="178" cy="72" r="3.5" fill="#f97316" style={{ animation: 'fire-spark 1.8s infinite 0.6s' }} />
          <circle cx="160" cy="85" r="3" fill="#ef4444" style={{ animation: 'fire-spark 1.8s infinite 1.2s' }} />
        </svg>
      )

    case 'frame-zzz-bangboo':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 8.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f59e0b" strokeWidth="4.8" strokeDasharray="24 14 36 16" strokeLinecap="round" filter="drop-shadow(0 0 9px #d97706)" />
          </g>
          <g style={{ animation: 'orbit-reverse 12s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeDasharray="12 20 8 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="166" cy="42" r="5" fill="#f59e0b" style={{ animation: 'star-twinkle 2s infinite' }} />
          <polygon points="176,68 184,76 176,84 168,76" fill="#38bdf8" style={{ animation: 'star-twinkle 2s infinite 0.8s' }} />
          <circle cx="162" cy="88" r="3.5" fill="#fbbf24" style={{ animation: 'star-twinkle 2s infinite 1.4s' }} />
        </svg>
      )

    case 'frame-zzz-corin':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#22c55e" strokeWidth="4.8" strokeDasharray="22 10 32 14" strokeLinecap="round" filter="drop-shadow(0 0 9px #16a34a)" />
          </g>
          <g style={{ animation: 'orbit-reverse 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#4ade80" strokeWidth="2.2" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="168,40 174,48 168,56 162,48" fill="#86efac" style={{ animation: 'star-twinkle 2.2s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#4ade80" style={{ animation: 'star-twinkle 2.2s infinite 0.9s' }} />
        </svg>
      )

    case 'frame-zzz-nekomata':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#fb923c" strokeWidth="4.8" strokeDasharray="28 12 24 14" strokeLinecap="round" filter="drop-shadow(0 0 9px #ea580c)" />
          </g>
          <g style={{ animation: 'orbit-reverse 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#facc15" strokeWidth="2.4" strokeDasharray="16 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="166,38 174,46 166,54 158,46" fill="#facc15" filter="drop-shadow(0 0 5px #eab308)" style={{ animation: 'star-twinkle 1.9s infinite' }} />
          <circle cx="178" cy="70" r="4.5" fill="#fb923c" style={{ animation: 'star-twinkle 1.9s infinite 0.7s' }} />
          <polygon points="162,85 167,90 162,95 157,90" fill="#f43f5e" style={{ animation: 'star-twinkle 1.9s infinite 1.3s' }} />
        </svg>
      )

    case 'frame-zzz-miyabi':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#0284c7" strokeWidth="4.8" strokeDasharray="34 14 20 16" strokeLinecap="round" filter="drop-shadow(0 0 10px #38bdf8)" />
          </g>
          <g style={{ animation: 'orbit-reverse 12s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#818cf8" strokeWidth="2.2" strokeDasharray="14 20 8 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="168,36 174,44 168,52 162,44" fill="#e0f2fe" filter="drop-shadow(0 0 6px #38bdf8)" style={{ animation: 'star-twinkle 2s infinite' }} />
          <polygon points="178,72 183,78 178,84 173,78" fill="#bae6fd" style={{ animation: 'star-twinkle 2s infinite 0.7s' }} />
          <circle cx="160" cy="92" r="3" fill="#a5b4fc" style={{ animation: 'star-twinkle 2s infinite 1.4s' }} />
        </svg>
      )

    case 'frame-zzz-jufufu':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f97316" strokeWidth="5" strokeDasharray="26 12 34 14" strokeLinecap="round" filter="drop-shadow(0 0 10px #ea580c)" />
          </g>
          <g style={{ animation: 'orbit-reverse 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#facc15" strokeWidth="2.4" strokeDasharray="18 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="45" r="4.5" fill="#facc15" style={{ animation: 'fire-spark 1.8s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#ef4444" style={{ animation: 'fire-spark 1.8s infinite 0.6s' }} />
          <polygon points="160,88 165,93 160,98 155,93" fill="#f97316" style={{ animation: 'star-twinkle 1.8s infinite 1.2s' }} />
        </svg>
      )

    case 'frame-zzz-caesar':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#eab308" strokeWidth="4.8" strokeDasharray="28 12 36 14" strokeLinecap="round" filter="drop-shadow(0 0 10px #ca8a04)" />
          </g>
          <g style={{ animation: 'orbit-reverse 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeDasharray="14 20" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="168,40 176,48 168,56 160,48" fill="#facc15" filter="drop-shadow(0 0 6px #eab308)" style={{ animation: 'star-twinkle 2.2s infinite' }} />
          <circle cx="178" cy="76" r="4" fill="#ef4444" style={{ animation: 'fire-spark 2s infinite 0.8s' }} />
        </svg>
      )

    case 'frame-zzz-lucy':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ef4444" strokeWidth="4.8" strokeDasharray="24 12 32 14" strokeLinecap="round" filter="drop-shadow(0 0 9px #dc2626)" />
          </g>
          <g style={{ animation: 'orbit-reverse 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeDasharray="16 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="166,38 174,46 166,54 158,46" fill="#f43f5e" style={{ animation: 'star-twinkle 1.8s infinite' }} />
          <circle cx="178" cy="72" r="4" fill="#fbbf24" style={{ animation: 'star-twinkle 1.8s infinite 0.7s' }} />
        </svg>
      )

    case 'frame-zzz-piper':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 11s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="22 14 30 16" strokeLinecap="round" filter="drop-shadow(0 0 8px #d97706)" />
          </g>
          <g style={{ animation: 'orbit-reverse 15s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#78716c" strokeWidth="2" strokeDasharray="12 24" strokeLinecap="round" opacity="0.8" />
          </g>
          <text x="166" y="44" fill="#f59e0b" fontSize="16" fontWeight="900" style={{ animation: 'petal-drift 3s infinite' }}>
            z
          </text>
          <text x="176" y="70" fill="#fbbf24" fontSize="13" fontWeight="900" style={{ animation: 'petal-drift 3s infinite 1s' }}>
            z
          </text>
        </svg>
      )

    case 'frame-zzz-qingyi':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#10b981" strokeWidth="4.8" strokeDasharray="30 12 24 16" strokeLinecap="round" filter="drop-shadow(0 0 10px #059669)" />
          </g>
          <g style={{ animation: 'orbit-reverse 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#06b6d4" strokeWidth="2.2" strokeDasharray="16 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <g style={{ animation: 'lightning-flash 2.3s infinite' }}>
            <path d="M 164 42 L 174 54 L 168 58 L 178 70" stroke="#34d399" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          </g>
          <circle cx="178" cy="88" r="3.5" fill="#facc15" style={{ animation: 'star-twinkle 2s infinite 0.8s' }} />
        </svg>
      )

    case 'frame-zzz-seth':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#3b82f6" strokeWidth="4.8" strokeDasharray="26 12 34 14" strokeLinecap="round" filter="drop-shadow(0 0 9px #2563eb)" />
          </g>
          <g style={{ animation: 'orbit-reverse 11s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#facc15" strokeWidth="2.2" strokeDasharray="14 20" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="166,40 174,48 166,56 158,48" fill="#60a5fa" style={{ animation: 'star-twinkle 2s infinite' }} />
          <circle cx="178" cy="74" r="4" fill="#facc15" style={{ animation: 'star-twinkle 2s infinite 0.9s' }} />
        </svg>
      )

    case 'frame-zzz-lycaon':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#64748b" strokeWidth="4.8" strokeDasharray="30 14 22 16" strokeLinecap="round" filter="drop-shadow(0 0 9px #38bdf8)" />
          </g>
          <g style={{ animation: 'orbit-reverse 12s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeDasharray="14 22" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="168,36 174,45 168,54 162,45" fill="#e0f2fe" style={{ animation: 'star-twinkle 2.2s infinite' }} />
          <polygon points="178,72 183,79 178,86 173,79" fill="#94a3b8" style={{ animation: 'star-twinkle 2.2s infinite 0.8s' }} />
        </svg>
      )

    case 'frame-zzz-rina':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#818cf8" strokeWidth="4.8" strokeDasharray="28 14 32 14" strokeLinecap="round" filter="drop-shadow(0 0 10px #6366f1)" />
          </g>
          <g style={{ animation: 'orbit-reverse 13s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#c084fc" strokeWidth="2.2" strokeDasharray="16 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="42" r="4.5" fill="#c084fc" style={{ animation: 'petal-drift 3.5s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#38bdf8" style={{ animation: 'star-twinkle 2s infinite 0.7s' }} />
        </svg>
      )

    case 'frame-zzz-soukaku':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#0284c7" strokeWidth="4.8" strokeDasharray="30 12 26 14" strokeLinecap="round" filter="drop-shadow(0 0 9px #0ea5e9)" />
          </g>
          <g style={{ animation: 'orbit-reverse 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeDasharray="18 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="166,38 174,46 166,54 158,46" fill="#38bdf8" style={{ animation: 'star-twinkle 2s infinite' }} />
          <circle cx="178" cy="72" r="4" fill="#bae6fd" style={{ animation: 'star-twinkle 2s infinite 0.8s' }} />
        </svg>
      )

    case 'frame-zzz-koleda':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ef4444" strokeWidth="5" strokeDasharray="26 12 36 12" strokeLinecap="round" filter="drop-shadow(0 0 10px #dc2626)" />
          </g>
          <g style={{ animation: 'orbit-reverse 8.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#f97316" strokeWidth="2.4" strokeDasharray="16 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="44" r="4.5" fill="#facc15" style={{ animation: 'fire-spark 1.8s infinite' }} />
          <circle cx="178" cy="76" r="3.5" fill="#ef4444" style={{ animation: 'fire-spark 1.8s infinite 0.7s' }} />
        </svg>
      )

    case 'frame-zzz-grace':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#06b6d4" strokeWidth="4.8" strokeDasharray="28 12 28 14" strokeLinecap="round" filter="drop-shadow(0 0 9px #0891b2)" />
          </g>
          <g style={{ animation: 'orbit-reverse 11s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeDasharray="14 20" strokeLinecap="round" opacity="0.85" />
          </g>
          <g style={{ animation: 'lightning-flash 2.2s infinite' }}>
            <path d="M 164 42 L 174 52 L 168 56 L 178 66" stroke="#06b6d4" strokeWidth="2.8" fill="none" strokeLinecap="round" />
          </g>
          <circle cx="178" cy="86" r="3.5" fill="#f59e0b" style={{ animation: 'star-twinkle 2s infinite' }} />
        </svg>
      )

    case 'frame-zzz-ben':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#d97706" strokeWidth="5.2" strokeDasharray="30 14 30 14" strokeLinecap="round" filter="drop-shadow(0 0 10px #b45309)" />
          </g>
          <g style={{ animation: 'orbit-reverse 14s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#f59e0b" strokeWidth="2.4" strokeDasharray="16 20" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="46" r="5" fill="#f59e0b" style={{ animation: 'pulse-scale 2s infinite' }} />
          <circle cx="178" cy="78" r="4" fill="#d97706" style={{ animation: 'pulse-scale 2s infinite 0.8s' }} />
        </svg>
      )

    case 'frame-zzz-anton':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 5.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#eab308" strokeWidth="4.8" strokeDasharray="34 10 24 12" strokeLinecap="round" filter="drop-shadow(0 0 9px #ca8a04)" />
          </g>
          <g style={{ animation: 'orbit-reverse 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#dc2626" strokeWidth="2.4" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="168,40 176,48 168,56 160,48" fill="#facc15" style={{ animation: 'fire-spark 1.8s infinite' }} />
          <circle cx="178" cy="74" r="4" fill="#dc2626" style={{ animation: 'fire-spark 1.8s infinite 0.7s' }} />
        </svg>
      )

    case 'frame-zzz-soldier11':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#dc2626" strokeWidth="5" strokeDasharray="30 12 36 12" strokeLinecap="round" filter="drop-shadow(0 0 10px #b91c1c)" />
          </g>
          <g style={{ animation: 'orbit-reverse 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#facc15" strokeWidth="2.2" strokeDasharray="16 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="44" r="4.5" fill="#facc15" style={{ animation: 'fire-spark 1.8s infinite' }} />
          <circle cx="178" cy="76" r="3.5" fill="#ef4444" style={{ animation: 'fire-spark 1.8s infinite 0.6s' }} />
        </svg>
      )

    case 'frame-zzz-belle':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#06b6d4" strokeWidth="4.8" strokeDasharray="26 12 34 14" strokeLinecap="round" filter="drop-shadow(0 0 9px #0891b2)" />
          </g>
          <g style={{ animation: 'orbit-reverse 10.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#f472b6" strokeWidth="2.2" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="42" r="4.5" fill="#f472b6" style={{ animation: 'star-twinkle 2s infinite' }} />
          <polygon points="178,70 184,76 178,82 172,76" fill="#06b6d4" style={{ animation: 'star-twinkle 2s infinite 0.8s' }} />
        </svg>
      )

    case 'frame-zzz-wise':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#3b82f6" strokeWidth="4.8" strokeDasharray="28 12 30 14" strokeLinecap="round" filter="drop-shadow(0 0 9px #2563eb)" />
          </g>
          <g style={{ animation: 'orbit-reverse 11s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#10b981" strokeWidth="2.2" strokeDasharray="16 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <rect x="164" y="40" width="8" height="8" rx="1.5" fill="#10b981" style={{ animation: 'star-twinkle 2s infinite' }} />
          <circle cx="178" cy="74" r="4" fill="#3b82f6" style={{ animation: 'star-twinkle 2s infinite 0.8s' }} />
        </svg>
      )

    case 'frame-zzz-yanagi':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 5.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#a855f7" strokeWidth="5" strokeDasharray="32 10 26 14" strokeLinecap="round" filter="drop-shadow(0 0 10px #7c3aed)" />
          </g>
          <g style={{ animation: 'orbit-reverse 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#c084fc" strokeWidth="2.2" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="168,40 176,48 168,56 160,48" fill="#c084fc" style={{ animation: 'star-twinkle 1.8s infinite' }} />
          <circle cx="178" cy="74" r="4" fill="#a855f7" style={{ animation: 'star-twinkle 1.8s infinite 0.6s' }} />
        </svg>
      )

    case 'frame-zzz-harumasa':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#10b981" strokeWidth="4.8" strokeDasharray="30 12 30 12" strokeLinecap="round" filter="drop-shadow(0 0 9px #059669)" />
          </g>
          <g style={{ animation: 'orbit-reverse 8.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#34d399" strokeWidth="2.4" strokeDasharray="16 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="168,42 174,36 174,48" fill="#34d399" style={{ animation: 'star-twinkle 2s infinite' }} />
          <circle cx="178" cy="76" r="3.5" fill="#10b981" style={{ animation: 'star-twinkle 2s infinite 0.7s' }} />
        </svg>
      )

    case 'frame-zzz-lighter':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f97316" strokeWidth="5.2" strokeDasharray="34 10 26 12" strokeLinecap="round" filter="drop-shadow(0 0 11px #dc2626)" />
          </g>
          <g style={{ animation: 'orbit-reverse 7.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#fbbf24" strokeWidth="2.4" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="42" r="5" fill="#fbbf24" style={{ animation: 'fire-spark 1.6s infinite' }} />
          <circle cx="178" cy="74" r="4" fill="#dc2626" style={{ animation: 'fire-spark 1.6s infinite 0.5s' }} />
        </svg>
      )

    case 'frame-zzz-astrayao':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ec4899" strokeWidth="4.8" strokeDasharray="28 14 34 12" strokeLinecap="round" filter="drop-shadow(0 0 10px #db2777)" />
          </g>
          <g style={{ animation: 'orbit-reverse 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#8b5cf6" strokeWidth="2.2" strokeDasharray="16 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="168,40 171,46 177,48 171,50 168,56 165,50 159,48 165,46" fill="#f472b6" style={{ animation: 'star-twinkle 1.8s infinite' }} />
          <circle cx="178" cy="76" r="3.5" fill="#ec4899" style={{ animation: 'star-twinkle 1.8s infinite 0.7s' }} />
        </svg>
      )

    case 'frame-zzz-evelyn':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f43f5e" strokeWidth="5" strokeDasharray="30 12 36 10" strokeLinecap="round" filter="drop-shadow(0 0 10px #e11d48)" />
          </g>
          <g style={{ animation: 'orbit-reverse 9.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#fb923c" strokeWidth="2.2" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="42" r="4.5" fill="#fde047" style={{ animation: 'fire-spark 1.8s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#f43f5e" style={{ animation: 'fire-spark 1.8s infinite 0.6s' }} />
        </svg>
      )

    case 'frame-zzz-pulchra':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#d97706" strokeWidth="4.8" strokeDasharray="26 14 34 14" strokeLinecap="round" filter="drop-shadow(0 0 9px #b45309)" />
          </g>
          <g style={{ animation: 'orbit-reverse 11s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#fde047" strokeWidth="2.2" strokeDasharray="16 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="44" r="4.5" fill="#fde047" style={{ animation: 'pulse-scale 1.8s infinite' }} />
          <circle cx="162" cy="38" r="2.5" fill="#f59e0b" style={{ animation: 'pulse-scale 1.8s infinite 0.2s' }} />
          <circle cx="174" cy="38" r="2.5" fill="#f59e0b" style={{ animation: 'pulse-scale 1.8s infinite 0.4s' }} />
        </svg>
      )

    case 'frame-zzz-trigger':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#38bdf8" strokeWidth="4.8" strokeDasharray="36 8 20 12" strokeLinecap="round" filter="drop-shadow(0 0 9px #0284c7)" />
          </g>
          <g style={{ animation: 'orbit-reverse 6s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#e0f2fe" strokeWidth="2.2" strokeDasharray="12 24" strokeLinecap="round" opacity="0.85" />
          </g>
          <rect x="164" y="42" width="8" height="2" fill="#38bdf8" style={{ animation: 'star-twinkle 1.6s infinite' }} />
          <rect x="167" y="39" width="2" height="8" fill="#38bdf8" style={{ animation: 'star-twinkle 1.6s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#0ea5e9" style={{ animation: 'star-twinkle 1.6s infinite 0.5s' }} />
        </svg>
      )

    case 'frame-zzz-soldier0':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 5.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#94a3b8" strokeWidth="5" strokeDasharray="32 12 28 12" strokeLinecap="round" filter="drop-shadow(0 0 10px #38bdf8)" />
          </g>
          <g style={{ animation: 'orbit-reverse 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="168,40 176,48 168,56 160,48" fill="#f8fafc" style={{ animation: 'star-twinkle 1.8s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#38bdf8" style={{ animation: 'star-twinkle 1.8s infinite 0.7s' }} />
        </svg>
      )

    case 'frame-zzz-hugo':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 8.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#475569" strokeWidth="5" strokeDasharray="26 14 30 14" strokeLinecap="round" filter="drop-shadow(0 0 10px #38bdf8)" />
          </g>
          <g style={{ animation: 'orbit-reverse 11s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeDasharray="16 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="44" r="4.5" fill="#38bdf8" style={{ animation: 'star-twinkle 2s infinite' }} />
          <circle cx="178" cy="76" r="3.5" fill="#60a5fa" style={{ animation: 'star-twinkle 2s infinite 0.8s' }} />
        </svg>
      )

    case 'frame-zzz-vivian':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#9333ea" strokeWidth="4.8" strokeDasharray="30 14 26 14" strokeLinecap="round" filter="drop-shadow(0 0 10px #c084fc)" />
          </g>
          <g style={{ animation: 'orbit-reverse 11s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#ec4899" strokeWidth="2.2" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="42" r="4.5" fill="#e879f9" style={{ animation: 'pulse-scale 1.9s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#ec4899" style={{ animation: 'pulse-scale 1.9s infinite 0.7s' }} />
        </svg>
      )

    case 'frame-zzz-panyinhu':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ea580c" strokeWidth="5.2" strokeDasharray="34 10 24 14" strokeLinecap="round" filter="drop-shadow(0 0 10px #ca8a04)" />
          </g>
          <g style={{ animation: 'orbit-reverse 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#facc15" strokeWidth="2.4" strokeDasharray="16 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="42" r="5" fill="#fef08a" style={{ animation: 'fire-spark 1.8s infinite' }} />
          <circle cx="178" cy="76" r="3.5" fill="#ea580c" style={{ animation: 'fire-spark 1.8s infinite 0.6s' }} />
        </svg>
      )

    case 'frame-zzz-yixuan':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#059669" strokeWidth="4.8" strokeDasharray="28 14 32 12" strokeLinecap="round" filter="drop-shadow(0 0 9px #10b981)" />
          </g>
          <g style={{ animation: 'orbit-reverse 12.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#06b6d4" strokeWidth="2.2" strokeDasharray="16 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="42" r="4.5" fill="#a7f3d0" style={{ animation: 'star-twinkle 2s infinite' }} />
          <polygon points="178,70 184,76 178,82 172,76" fill="#06b6d4" style={{ animation: 'star-twinkle 2s infinite 0.8s' }} />
        </svg>
      )

    case 'frame-zzz-jufufu-official':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#f97316" strokeWidth="5" strokeDasharray="32 12 28 12" strokeLinecap="round" filter="drop-shadow(0 0 10px #ea580c)" />
          </g>
          <g style={{ animation: 'orbit-reverse 8.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#facc15" strokeWidth="2.4" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="42" r="4.5" fill="#facc15" style={{ animation: 'star-twinkle 1.8s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#f97316" style={{ animation: 'star-twinkle 1.8s infinite 0.6s' }} />
        </svg>
      )

    case 'frame-zzz-eous':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ea580c" strokeWidth="5" strokeDasharray="30 12 32 12" strokeLinecap="round" filter="drop-shadow(0 0 10px #f97316)" />
          </g>
          <g style={{ animation: 'orbit-reverse 9.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeDasharray="16 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="42" r="5" fill="#fde047" style={{ animation: 'pulse-scale 1.8s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#38bdf8" style={{ animation: 'pulse-scale 1.8s infinite 0.7s' }} />
        </svg>
      )

    case 'frame-zzz-amillion':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 5.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#dc2626" strokeWidth="5" strokeDasharray="32 10 28 12" strokeLinecap="round" filter="drop-shadow(0 0 10px #ef4444)" />
          </g>
          <g style={{ animation: 'orbit-reverse 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#fbbf24" strokeWidth="2.4" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="42" r="5" fill="#fbbf24" style={{ animation: 'pulse-scale 1.7s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#dc2626" style={{ animation: 'pulse-scale 1.7s infinite 0.6s' }} />
        </svg>
      )

    case 'frame-zzz-butler':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 8.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#475569" strokeWidth="4.8" strokeDasharray="26 14 30 14" strokeLinecap="round" filter="drop-shadow(0 0 9px #94a3b8)" />
          </g>
          <g style={{ animation: 'orbit-reverse 11s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeDasharray="16 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="42" r="4.5" fill="#fbbf24" style={{ animation: 'star-twinkle 2s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#f8fafc" style={{ animation: 'star-twinkle 2s infinite 0.8s' }} />
        </svg>
      )

    case 'frame-zzz-sharkboo':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#0284c7" strokeWidth="5.2" strokeDasharray="30 12 34 10" strokeLinecap="round" filter="drop-shadow(0 0 10px #38bdf8)" />
          </g>
          <g style={{ animation: 'orbit-reverse 8.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <polygon points="168,40 174,48 162,48" fill="#e0f2fe" style={{ animation: 'star-twinkle 1.8s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#38bdf8" style={{ animation: 'star-twinkle 1.8s infinite 0.6s' }} />
        </svg>
      )

    case 'frame-zzz-safety':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 7s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ea580c" strokeWidth="5" strokeDasharray="30 14 26 14" strokeLinecap="round" filter="drop-shadow(0 0 10px #f97316)" />
          </g>
          <g style={{ animation: 'orbit-reverse 9s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#facc15" strokeWidth="2.4" strokeDasharray="16 16" strokeLinecap="round" opacity="0.85" />
          </g>
          <rect x="164" y="42" width="8" height="8" rx="1" fill="#facc15" style={{ animation: 'star-twinkle 1.8s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#ea580c" style={{ animation: 'star-twinkle 1.8s infinite 0.7s' }} />
        </svg>
      )

    case 'frame-zzz-resonaboo':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 6.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#7e22ce" strokeWidth="5" strokeDasharray="32 12 28 12" strokeLinecap="round" filter="drop-shadow(0 0 10px #c084fc)" />
          </g>
          <g style={{ animation: 'orbit-reverse 9.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#c084fc" strokeWidth="2.2" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="42" r="5" fill="#c084fc" style={{ animation: 'pulse-scale 1.8s infinite' }} />
          <circle cx="178" cy="74" r="3.5" fill="#9333ea" style={{ animation: 'pulse-scale 1.8s infinite 0.6s' }} />
        </svg>
      )

    case 'frame-zzz-rocketboo':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#ea580c" strokeWidth="5.2" strokeDasharray="34 10 26 12" strokeLinecap="round" filter="drop-shadow(0 0 11px #dc2626)" />
          </g>
          <g style={{ animation: 'orbit-reverse 7.5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#dc2626" strokeWidth="2.4" strokeDasharray="14 18" strokeLinecap="round" opacity="0.85" />
          </g>
          <circle cx="168" cy="42" r="5" fill="#fde047" style={{ animation: 'fire-spark 1.6s infinite' }} />
          <circle cx="178" cy="74" r="4" fill="#ea580c" style={{ animation: 'fire-spark 1.6s infinite 0.5s' }} />
        </svg>
      )

    default:
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible pointer-events-none select-none">
          <g style={{ animation: 'solar-spin 8s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="100" r="86" fill="none" stroke="#facc15" strokeWidth="4.5" strokeDasharray="24 14 36 14" strokeLinecap="round" opacity="0.85" filter="drop-shadow(0 0 8px #eab308)" />
          </g>
        </svg>
      )
  }
})
