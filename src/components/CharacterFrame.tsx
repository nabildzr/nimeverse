import { memo } from 'react'
import { ChibiCharacter } from './ChibiCharacter'

interface CharacterFrameProps {
  code: string
  className?: string
}

interface FrameConfig {
  ringColor1: string
  ringColor2: string
  accentColor: string
  glowColor: string
  badgeLabel?: string
  badgeBg?: string
  badgeColor?: string
  symbolType: string
}

const FRAMES: Record<string, FrameConfig> = {
  'frame-jotaro': { ringColor1: '#6b21a8', ringColor2: '#9333ea', accentColor: '#eab308', glowColor: '#a855f7', symbolType: 'jotaro' },
  'frame-dio': { ringColor1: '#ca8a04', ringColor2: '#eab308', accentColor: '#22c55e', glowColor: '#facc15', symbolType: 'dio' },
  'frame-giorno': { ringColor1: '#eab308', ringColor2: '#ec4899', accentColor: '#3b82f6', glowColor: '#f43f5e', symbolType: 'giorno' },
  'frame-joseph': { ringColor1: '#9333ea', ringColor2: '#eab308', accentColor: '#84cc16', glowColor: '#c084fc', symbolType: 'joseph' },
  'frame-jolyne': { ringColor1: '#06b6d4', ringColor2: '#3b82f6', accentColor: '#ec4899', glowColor: '#22d3ee', symbolType: 'jolyne' },
  'frame-gojo': { ringColor1: '#38bdf8', ringColor2: '#a855f7', accentColor: '#ef4444', glowColor: '#c084fc', symbolType: 'gojo' },
  'frame-sukuna': { ringColor1: '#991b1b', ringColor2: '#18181b', accentColor: '#ef4444', glowColor: '#dc2626', symbolType: 'sukuna' },
  'frame-itadori': { ringColor1: '#dc2626', ringColor2: '#171717', accentColor: '#f97316', glowColor: '#ef4444', symbolType: 'itadori' },
  'frame-megumi': { ringColor1: '#1e293b', ringColor2: '#0f172a', accentColor: '#10b981', glowColor: '#334155', symbolType: 'megumi' },
  'frame-luffy': { ringColor1: '#f8fafc', ringColor2: '#e2e8f0', accentColor: '#eab308', glowColor: '#fbbf24', symbolType: 'luffy' },
  'frame-zoro': { ringColor1: '#059669', ringColor2: '#10b981', accentColor: '#34d399', glowColor: '#10b981', symbolType: 'zoro' },
  'frame-sanji': { ringColor1: '#0284c7', ringColor2: '#38bdf8', accentColor: '#fbbf24', glowColor: '#0ea5e9', symbolType: 'sanji' },
  'frame-law': { ringColor1: '#0284c7', ringColor2: '#f8fafc', accentColor: '#eab308', glowColor: '#38bdf8', symbolType: 'law' },
  'frame-ace': { ringColor1: '#ea580c', ringColor2: '#f97316', accentColor: '#ef4444', glowColor: '#f97316', symbolType: 'ace' },
  'frame-goku': { ringColor1: '#e0f2fe', ringColor2: '#38bdf8', accentColor: '#ffffff', glowColor: '#bae6fd', symbolType: 'goku' },
  'frame-vegeta': { ringColor1: '#7c3aed', ringColor2: '#9333ea', accentColor: '#facc15', glowColor: '#c084fc', symbolType: 'vegeta' },
  'frame-trunks': { ringColor1: '#6366f1', ringColor2: '#eab308', accentColor: '#94a3b8', glowColor: '#a5b4fc', symbolType: 'trunks' },
  'frame-naruto': { ringColor1: '#ea580c', ringColor2: '#facc15', accentColor: '#38bdf8', glowColor: '#f59e0b', symbolType: 'naruto' },
  'frame-sasuke': { ringColor1: '#2563eb', ringColor2: '#475569', accentColor: '#818cf8', glowColor: '#3b82f6', symbolType: 'sasuke' },
  'frame-itachi': { ringColor1: '#dc2626', ringColor2: '#171717', accentColor: '#ef4444', glowColor: '#b91c1c', symbolType: 'itachi' },
  'frame-kakashi': { ringColor1: '#38bdf8', ringColor2: '#475569', accentColor: '#e2e8f0', glowColor: '#0284c7', symbolType: 'kakashi' },
  'frame-hinata': { ringColor1: '#a78bfa', ringColor2: '#e0e7ff', accentColor: '#60a5fa', glowColor: '#c4b5fd', symbolType: 'hinata' },
  'frame-levi': { ringColor1: '#047857', ringColor2: '#1e293b', accentColor: '#e2e8f0', glowColor: '#10b981', symbolType: 'levi' },
  'frame-eren': { ringColor1: '#15803d', ringColor2: '#78350f', accentColor: '#22c55e', glowColor: '#16a34a', symbolType: 'eren' },
  'frame-mikasa': { ringColor1: '#991b1b', ringColor2: '#334155', accentColor: '#dc2626', glowColor: '#ef4444', symbolType: 'mikasa' },
  'frame-tanjiro': { ringColor1: '#dc2626', ringColor2: '#15803d', accentColor: '#f97316', glowColor: '#ef4444', symbolType: 'tanjiro' },
  'frame-rengoku': { ringColor1: '#dc2626', ringColor2: '#eab308', accentColor: '#f97316', glowColor: '#f59e0b', symbolType: 'rengoku' },
  'frame-nezuko': { ringColor1: '#ec4899', ringColor2: '#15803d', accentColor: '#f472b6', glowColor: '#f43f5e', symbolType: 'nezuko' },
  'frame-zenitsu': { ringColor1: '#eab308', ringColor2: '#facc15', accentColor: '#ffffff', glowColor: '#fde047', symbolType: 'zenitsu' },
  'frame-ichigo': { ringColor1: '#dc2626', ringColor2: '#09090b', accentColor: '#f97316', glowColor: '#ef4444', symbolType: 'ichigo' },
  'frame-aizen': { ringColor1: '#818cf8', ringColor2: '#e2e8f0', accentColor: '#c084fc', glowColor: '#a5b4fc', symbolType: 'aizen' },
  'frame-hitsugaya': { ringColor1: '#38bdf8', ringColor2: '#e0f2fe', accentColor: '#0284c7', glowColor: '#7dd3fc', symbolType: 'hitsugaya' },
  'frame-killua': { ringColor1: '#38bdf8', ringColor2: '#c084fc', accentColor: '#ffffff', glowColor: '#67e8f9', symbolType: 'killua' },
  'frame-gon': { ringColor1: '#f97316', ringColor2: '#16a34a', accentColor: '#eab308', glowColor: '#fb923c', symbolType: 'gon' },
  'frame-kurapika': { ringColor1: '#dc2626', ringColor2: '#eab308', accentColor: '#e2e8f0', glowColor: '#ef4444', symbolType: 'kurapika' },
  'frame-jinwoo': { ringColor1: '#312e81', ringColor2: '#4338ca', accentColor: '#06b6d4', glowColor: '#4f46e5', symbolType: 'jinwoo' },
  'frame-guts': { ringColor1: '#7f1d1d', ringColor2: '#18181b', accentColor: '#dc2626', glowColor: '#991b1b', symbolType: 'guts' },
  'frame-kaneki': { ringColor1: '#991b1b', ringColor2: '#18181b', accentColor: '#ffffff', glowColor: '#dc2626', symbolType: 'kaneki' },
  'frame-frieren': { ringColor1: '#eab308', ringColor2: '#38bdf8', accentColor: '#60a5fa', glowColor: '#facc15', symbolType: 'frieren' },
  'frame-anya': { ringColor1: '#f472b6', ringColor2: '#facc15', accentColor: '#fbbf24', glowColor: '#f472b6', symbolType: 'anya' },
  'frame-saitama': { ringColor1: '#eab308', ringColor2: '#dc2626', accentColor: '#ffffff', glowColor: '#facc15', symbolType: 'saitama' },
  'frame-megumin': { ringColor1: '#b91c1c', ringColor2: '#eab308', accentColor: '#f97316', glowColor: '#ef4444', symbolType: 'megumin' },
  'frame-rem': { ringColor1: '#38bdf8', ringColor2: '#e0f2fe', accentColor: '#c084fc', glowColor: '#7dd3fc', symbolType: 'rem' },
  'frame-rimuru': { ringColor1: '#06b6d4', ringColor2: '#38bdf8', accentColor: '#eab308', glowColor: '#22d3ee', symbolType: 'rimuru' },
  'frame-denji': { ringColor1: '#ea580c', ringColor2: '#71717a', accentColor: '#facc15', glowColor: '#f97316', symbolType: 'denji' },
  'frame-makima': { ringColor1: '#eab308', ringColor2: '#ea580c', accentColor: '#fee2e2', glowColor: '#f59e0b', symbolType: 'makima' },
  'frame-deku': { ringColor1: '#10b981', ringColor2: '#059669', accentColor: '#dc2626', glowColor: '#34d399', symbolType: 'deku' },
  'frame-todoroki': { ringColor1: '#ef4444', ringColor2: '#38bdf8', accentColor: '#ffffff', glowColor: '#f43f5e', symbolType: 'todoroki' },
  'frame-edward': { ringColor1: '#dc2626', ringColor2: '#38bdf8', accentColor: '#eab308', glowColor: '#60a5fa', symbolType: 'edward' },
  'frame-bocchi': { ringColor1: '#f472b6', ringColor2: '#06b6d4', accentColor: '#facc15', glowColor: '#f472b6', symbolType: 'bocchi' },
  'frame-nijika': { ringColor1: '#facc15', ringColor2: '#ea580c', accentColor: '#fbbf24', glowColor: '#facc15', symbolType: 'nijika' },
  'frame-ryo': { ringColor1: '#3b82f6', ringColor2: '#6366f1', accentColor: '#93c5fd', glowColor: '#60a5fa', symbolType: 'ryo' },
  'frame-kita': { ringColor1: '#ef4444', ringColor2: '#ec4899', accentColor: '#f43f5e', glowColor: '#fb7185', symbolType: 'kita' },
  'frame-zzz-ellen': { ringColor1: '#0284c7', ringColor2: '#38bdf8', accentColor: '#e0f2fe', glowColor: '#0ea5e9', symbolType: 'zzz-ellen' },
  'frame-zzz-nicole': { ringColor1: '#ec4899', ringColor2: '#f472b6', accentColor: '#c084fc', glowColor: '#f43f5e', symbolType: 'zzz-nicole' },
  'frame-zzz-anby': { ringColor1: '#eab308', ringColor2: '#facc15', accentColor: '#a3e635', glowColor: '#facc15', symbolType: 'zzz-anby' },
  'frame-zzz-billy': { ringColor1: '#dc2626', ringColor2: '#ef4444', accentColor: '#94a3b8', glowColor: '#f87171', symbolType: 'zzz-billy' },
  'frame-zzz-jane': { ringColor1: '#7e22ce', ringColor2: '#a855f7', accentColor: '#f43f5e', glowColor: '#9333ea', symbolType: 'zzz-jane' },
  'frame-zzz-zhu': { ringColor1: '#1d4ed8', ringColor2: '#3b82f6', accentColor: '#ef4444', glowColor: '#60a5fa', symbolType: 'zzz-zhu' },
  'frame-zzz-burnice': { ringColor1: '#ea580c', ringColor2: '#f97316', accentColor: '#facc15', glowColor: '#fb923c', symbolType: 'zzz-burnice' },
  'frame-zzz-bangboo': { ringColor1: '#d97706', ringColor2: '#f59e0b', accentColor: '#38bdf8', glowColor: '#fbbf24', symbolType: 'zzz-bangboo' },
  'frame-zzz-corin': { ringColor1: '#16a34a', ringColor2: '#4ade80', accentColor: '#94a3b8', glowColor: '#22c55e', symbolType: 'zzz-corin' },
  'frame-zzz-nekomata': { ringColor1: '#ea580c', ringColor2: '#fb923c', accentColor: '#facc15', glowColor: '#f97316', symbolType: 'zzz-nekomata' },
  'frame-zzz-miyabi': { ringColor1: '#0284c7', ringColor2: '#38bdf8', accentColor: '#818cf8', glowColor: '#38bdf8', symbolType: 'zzz-miyabi' },
  'frame-zzz-jufufu': { ringColor1: '#ea580c', ringColor2: '#f97316', accentColor: '#facc15', glowColor: '#f97316', symbolType: 'zzz-jufufu' },
  'frame-zzz-caesar': { ringColor1: '#ca8a04', ringColor2: '#eab308', accentColor: '#ef4444', glowColor: '#eab308', symbolType: 'zzz-caesar' },
  'frame-zzz-lucy': { ringColor1: '#dc2626', ringColor2: '#ef4444', accentColor: '#fbbf24', glowColor: '#f43f5e', symbolType: 'zzz-lucy' },
  'frame-zzz-piper': { ringColor1: '#d97706', ringColor2: '#f59e0b', accentColor: '#78716c', glowColor: '#fbbf24', symbolType: 'zzz-piper' },
  'frame-zzz-qingyi': { ringColor1: '#059669', ringColor2: '#10b981', accentColor: '#06b6d4', glowColor: '#34d399', symbolType: 'zzz-qingyi' },
  'frame-zzz-seth': { ringColor1: '#2563eb', ringColor2: '#3b82f6', accentColor: '#facc15', glowColor: '#60a5fa', symbolType: 'zzz-seth' },
  'frame-zzz-lycaon': { ringColor1: '#475569', ringColor2: '#64748b', accentColor: '#38bdf8', glowColor: '#94a3b8', symbolType: 'zzz-lycaon' },
  'frame-zzz-rina': { ringColor1: '#6366f1', ringColor2: '#818cf8', accentColor: '#c084fc', glowColor: '#a5b4fc', symbolType: 'zzz-rina' },
  'frame-zzz-soukaku': { ringColor1: '#0284c7', ringColor2: '#06b6d4', accentColor: '#38bdf8', glowColor: '#38bdf8', symbolType: 'zzz-soukaku' },
  'frame-zzz-koleda': { ringColor1: '#dc2626', ringColor2: '#ef4444', accentColor: '#f97316', glowColor: '#f87171', symbolType: 'zzz-koleda' },
  'frame-zzz-grace': { ringColor1: '#0891b2', ringColor2: '#06b6d4', accentColor: '#f59e0b', glowColor: '#22d3ee', symbolType: 'zzz-grace' },
  'frame-zzz-ben': { ringColor1: '#b45309', ringColor2: '#d97706', accentColor: '#f59e0b', glowColor: '#d97706', symbolType: 'zzz-ben' },
  'frame-zzz-anton': { ringColor1: '#ca8a04', ringColor2: '#eab308', accentColor: '#dc2626', glowColor: '#facc15', symbolType: 'zzz-anton' },
  'frame-zzz-soldier11': { ringColor1: '#b91c1c', ringColor2: '#dc2626', accentColor: '#facc15', glowColor: '#ef4444', symbolType: 'zzz-soldier11' },
  'frame-zzz-belle': { ringColor1: '#0891b2', ringColor2: '#06b6d4', accentColor: '#f472b6', glowColor: '#22d3ee', symbolType: 'zzz-belle' },
  'frame-zzz-wise': { ringColor1: '#2563eb', ringColor2: '#3b82f6', accentColor: '#10b981', glowColor: '#60a5fa', symbolType: 'zzz-wise' },
  'frame-zzz-yanagi': { ringColor1: '#7c3aed', ringColor2: '#a855f7', accentColor: '#c084fc', glowColor: '#a855f7', symbolType: 'zzz-yanagi' },
  'frame-zzz-harumasa': { ringColor1: '#059669', ringColor2: '#10b981', accentColor: '#34d399', glowColor: '#10b981', symbolType: 'zzz-harumasa' },
  'frame-zzz-lighter': { ringColor1: '#dc2626', ringColor2: '#f97316', accentColor: '#fbbf24', glowColor: '#ef4444', symbolType: 'zzz-lighter' },
  'frame-zzz-astrayao': { ringColor1: '#ec4899', ringColor2: '#8b5cf6', accentColor: '#f472b6', glowColor: '#ec4899', symbolType: 'zzz-astrayao' },
  'frame-zzz-evelyn': { ringColor1: '#f43f5e', ringColor2: '#fb923c', accentColor: '#fde047', glowColor: '#f43f5e', symbolType: 'zzz-evelyn' },
  'frame-zzz-pulchra': { ringColor1: '#b45309', ringColor2: '#d97706', accentColor: '#fde047', glowColor: '#f59e0b', symbolType: 'zzz-pulchra' },
  'frame-zzz-trigger': { ringColor1: '#0284c7', ringColor2: '#38bdf8', accentColor: '#e0f2fe', glowColor: '#0ea5e9', symbolType: 'zzz-trigger' },
  'frame-zzz-soldier0': { ringColor1: '#64748b', ringColor2: '#38bdf8', accentColor: '#f8fafc', glowColor: '#38bdf8', symbolType: 'zzz-soldier0' },
  'frame-zzz-hugo': { ringColor1: '#334155', ringColor2: '#38bdf8', accentColor: '#e2e8f0', glowColor: '#60a5fa', symbolType: 'zzz-hugo' },
  'frame-zzz-vivian': { ringColor1: '#9333ea', ringColor2: '#ec4899', accentColor: '#e879f9', glowColor: '#c084fc', symbolType: 'zzz-vivian' },
  'frame-zzz-panyinhu': { ringColor1: '#ca8a04', ringColor2: '#ea580c', accentColor: '#fef08a', glowColor: '#eab308', symbolType: 'zzz-panyinhu' },
  'frame-zzz-yixuan': { ringColor1: '#059669', ringColor2: '#06b6d4', accentColor: '#a7f3d0', glowColor: '#10b981', symbolType: 'zzz-yixuan' },
  'frame-zzz-jufufu-official': { ringColor1: '#ea580c', ringColor2: '#f97316', accentColor: '#facc15', glowColor: '#fb923c', symbolType: 'zzz-jufufu-official' },
  'frame-zzz-eous': { ringColor1: '#ea580c', ringColor2: '#38bdf8', accentColor: '#fde047', glowColor: '#f97316', symbolType: 'zzz-eous' },
  'frame-zzz-amillion': { ringColor1: '#dc2626', ringColor2: '#fbbf24', accentColor: '#f43f5e', glowColor: '#ef4444', symbolType: 'zzz-amillion' },
  'frame-zzz-butler': { ringColor1: '#334155', ringColor2: '#fbbf24', accentColor: '#f8fafc', glowColor: '#94a3b8', symbolType: 'zzz-butler' },
  'frame-zzz-sharkboo': { ringColor1: '#0284c7', ringColor2: '#38bdf8', accentColor: '#e0f2fe', glowColor: '#0ea5e9', symbolType: 'zzz-sharkboo' },
  'frame-zzz-safety': { ringColor1: '#ea580c', ringColor2: '#facc15', accentColor: '#1e293b', glowColor: '#f97316', symbolType: 'zzz-safety' },
  'frame-zzz-resonaboo': { ringColor1: '#7e22ce', ringColor2: '#c084fc', accentColor: '#f472b6', glowColor: '#9333ea', symbolType: 'zzz-resonaboo' },
  'frame-zzz-rocketboo': { ringColor1: '#ea580c', ringColor2: '#dc2626', accentColor: '#fde047', glowColor: '#f97316', symbolType: 'zzz-rocketboo' },
}

function FrameSymbols({ symbolType }: { symbolType: string }) {
  switch (symbolType) {
    case 'jotaro':
      return (
        <g>
          <g className="pointer-events-none select-none">
            <text x="162" y="48" fill="#c084fc" fontSize="18" fontWeight="900" fontFamily="sans-serif" style={{ animation: 'float-gogogo 2.5s ease-in infinite' }}>
              ゴ
            </text>
            <text x="178" y="76" fill="#a855f7" fontSize="13" fontWeight="900" fontFamily="sans-serif" style={{ animation: 'float-gogogo 2.5s ease-in 0.8s infinite' }}>
              ゴ
            </text>
            <text x="12" y="65" fill="#c084fc" fontSize="16" fontWeight="900" fontFamily="sans-serif" style={{ animation: 'float-gogogo 2.5s ease-in 1.5s infinite' }}>
              ゴ
            </text>
          </g>
          <rect x="91" y="16" width="18" height="6" rx="2" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
          <ChibiCharacter type="jotaro" />
        </g>
      )
    case 'dio':
      return (
        <g>
          <circle cx="100" cy="100" r="92" fill="none" stroke="#facc15" strokeWidth="1" strokeDasharray="3 4" style={{ animation: 'timestop-wave 3s infinite ease-in-out' }} />
          <g className="pointer-events-none select-none">
            <text x="156" y="46" fill="#facc15" fontSize="11" fontWeight="800" fontFamily="sans-serif" style={{ animation: 'float-gogogo 2.8s ease-in infinite' }}>
              無駄
            </text>
            <text x="14" y="60" fill="#fde047" fontSize="10" fontWeight="800" fontFamily="sans-serif" style={{ animation: 'float-gogogo 2.8s ease-in 1.2s infinite' }}>
              WRYY
            </text>
          </g>
          <circle cx="100" cy="19" r="6" fill="#22c55e" stroke="#facc15" strokeWidth="1.5" />
          <ChibiCharacter type="dio" />
        </g>
      )
    case 'gojo':
      return (
        <g>
          <g style={{ animation: 'hollow-spin 5s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="22" r="8" fill="#38bdf8" filter="drop-shadow(0 0 6px #0ea5e9)" />
            <circle cx="100" cy="178" r="8" fill="#ef4444" filter="drop-shadow(0 0 6px #dc2626)" />
          </g>
          <path d="M 88 19 Q 100 24 112 19" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <ChibiCharacter type="gojo" />
        </g>
      )
    case 'sukuna':
      return (
        <g>
          <line x1="30" y1="40" x2="170" y2="160" stroke="#ef4444" strokeWidth="2" strokeDasharray="60" style={{ animation: 'domain-slash 2.4s infinite' }} />
          <line x1="170" y1="40" x2="30" y2="160" stroke="#ef4444" strokeWidth="2" strokeDasharray="60" style={{ animation: 'domain-slash 2.4s infinite 0.4s' }} />
          <ChibiCharacter type="sukuna" />
        </g>
      )
    case 'tanjiro':
      return (
        <g>
          <g style={{ animation: 'solar-spin 10s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="17" r="7" fill="#f97316" filter="drop-shadow(0 0 6px #dc2626)" />
            <circle cx="100" cy="183" r="7" fill="#f97316" filter="drop-shadow(0 0 6px #dc2626)" />
          </g>
          <ChibiCharacter type="tanjiro" />
        </g>
      )
    case 'nezuko':
      return (
        <g>
          <circle cx="100" cy="18" r="6" fill="#f472b6" filter="drop-shadow(0 0 4px #ec4899)" />
          <ChibiCharacter type="nezuko" />
        </g>
      )
    case 'luffy':
      return (
        <g>
          <g style={{ animation: 'cloud-float 10s ease-in-out infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="18" r="10" fill="#f8fafc" />
            <circle cx="112" cy="22" r="7" fill="#f8fafc" />
            <circle cx="88" cy="22" r="7" fill="#f8fafc" />
            <circle cx="18" cy="100" r="9" fill="#f8fafc" />
          </g>
          <ChibiCharacter type="luffy" />
        </g>
      )
    case 'goku':
      return (
        <g>
          <circle cx="100" cy="100" r="90" fill="none" stroke="#bae6fd" strokeWidth="2" strokeDasharray="6 8" style={{ animation: 'divine-heat 2s infinite ease-in-out' }} />
          <ChibiCharacter type="goku" />
        </g>
      )
    case 'naruto':
      return (
        <g>
          <g style={{ animation: 'hollow-spin 4s linear infinite', transformOrigin: '100px 100px' }}>
            <circle cx="100" cy="18" r="9" fill="#38bdf8" filter="drop-shadow(0 0 6px #0284c7)" />
          </g>
          <ChibiCharacter type="naruto" />
        </g>
      )
    case 'levi':
      return (
        <g>
          <g style={{ animation: 'blade-spin 6s linear infinite', transformOrigin: '100px 100px' }}>
            <line x1="100" y1="12" x2="100" y2="28" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
            <line x1="100" y1="172" x2="100" y2="188" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
          </g>
          <ChibiCharacter type="levi" />
        </g>
      )
    case 'frieren':
      return (
        <g>
          <g style={{ animation: 'petal-drift 3.5s ease-in-out infinite' }}>
            <circle cx="165" cy="48" r="4.5" fill="#60a5fa" filter="drop-shadow(0 0 4px #3b82f6)" />
            <circle cx="178" cy="62" r="3.5" fill="#93c5fd" />
            <circle cx="24" cy="65" r="4" fill="#60a5fa" />
          </g>
          <circle cx="100" cy="100" r="88" fill="none" stroke="#facc15" strokeWidth="1" strokeDasharray="4 6" style={{ animation: 'hollow-spin 25s linear infinite', transformOrigin: '100px 100px' }} />
          <ChibiCharacter type="frieren" />
        </g>
      )
    case 'anya':
      return (
        <g>
          <circle cx="100" cy="18" r="5" fill="#facc15" filter="drop-shadow(0 0 4px #f59e0b)" />
          <ChibiCharacter type="anya" />
        </g>
      )
    case 'bocchi':
      return (
        <g>
          <circle cx="100" cy="18" r="5" fill="#06b6d4" />
          <ChibiCharacter type="bocchi" />
        </g>
      )
    case 'nijika':
      return (
        <g>
          <polygon points="100,12 108,24 92,24" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          <ChibiCharacter type="nijika" />
        </g>
      )
    case 'ryo':
      return (
        <g>
          <circle cx="100" cy="18" r="5" fill="#3b82f6" />
          <ChibiCharacter type="ryo" />
        </g>
      )
    case 'kita':
      return (
        <g>
          <text x="94" y="24" fill="#ef4444" fontSize="16" fontWeight="900">
            ♥
          </text>
          <ChibiCharacter type="kita" />
        </g>
      )
    default:
      return (
        <g>
          <ChibiCharacter type={symbolType} />
        </g>
      )
  }
}

export const CharacterFrame = memo(function CharacterFrame({ code, className = '' }: CharacterFrameProps) {
  const conf = FRAMES[code] ?? FRAMES['frame-jotaro']
  const gradId = `grad-${code}`
  const isStand = code === 'frame-jotaro'

  return (
    <div aria-hidden="true" className={`pointer-events-none relative h-full w-full select-none ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className={`h-full w-full overflow-visible ${isStand ? 'animate-[stand-aura_2.2s_infinite_ease-in-out]' : ''}`}
        style={!isStand ? { filter: `drop-shadow(0 0 6px ${conf.glowColor}99)` } : undefined}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={conf.ringColor1} />
            <stop offset="50%" stopColor={conf.accentColor} />
            <stop offset="100%" stopColor={conf.ringColor2} />
          </linearGradient>
        </defs>

        <circle
          cx="100"
          cy="100"
          r="84"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="14"
          strokeLinecap="round"
        />

        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke={conf.accentColor}
          strokeWidth="2"
          opacity="0.85"
        />

        <circle
          cx="100"
          cy="100"
          r="76"
          fill="none"
          stroke={conf.accentColor}
          strokeWidth="2"
          opacity="0.85"
        />

        <FrameSymbols symbolType={conf.symbolType} />
      </svg>
    </div>
  )
})
