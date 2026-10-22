import { memo } from 'react'

interface GachaMachineProps {
  isSpinning: boolean
  onSpinOne: () => void
  onSpinTen: () => void
  costOne: number
  costTen: number
  userCoins: number
  disabled?: boolean
}

const PILE_BALLS = [
  { left: 84, top: 150, rot: 14, topColor: '#ef4444', bottomColor: '#ffffff', duration: 0.52 },
  { left: 56, top: 140, rot: -22, topColor: '#3b82f6', bottomColor: '#ffffff', duration: 0.48 },
  { left: 112, top: 140, rot: 38, topColor: '#eab308', bottomColor: '#fef08a', duration: 0.50 },
  { left: 32, top: 120, rot: -48, topColor: '#a855f7', bottomColor: '#ffffff', duration: 0.46 },
  { left: 136, top: 120, rot: 52, topColor: '#10b981', bottomColor: '#ffffff', duration: 0.54 },
  { left: 70, top: 114, rot: -12, topColor: '#ec4899', bottomColor: '#fbcfe8', duration: 0.50 },
  { left: 104, top: 112, rot: 18, topColor: '#f97316', bottomColor: '#ffedd5', duration: 0.52 },
  { left: 50, top: 92, rot: 32, topColor: '#06b6d4', bottomColor: '#ffffff', duration: 0.49 },
  { left: 122, top: 94, rot: -28, topColor: '#fbbf24', bottomColor: '#fef3c7', duration: 0.51 },
  { left: 84, top: 86, rot: -6, topColor: '#8b5cf6', bottomColor: '#ede9fe', duration: 0.45 },
  { left: 66, top: 68, rot: 42, topColor: '#14b8a6', bottomColor: '#ccfbf1', duration: 0.47 },
  { left: 102, top: 70, rot: -36, topColor: '#f43f5e', bottomColor: '#ffe4e6', duration: 0.43 },
]

export const GachaMachine = memo(function GachaMachine({
  isSpinning,
  onSpinOne,
  onSpinTen,
  costOne,
  costTen,
  userCoins,
  disabled,
}: GachaMachineProps) {
  return (
    <div className="relative mx-auto flex w-full max-w-[420px] flex-col items-center">
      <style>{`
        @keyframes gacha-swirl-0 {
          0% { transform: translate(52px, -68px) rotate(0deg); }
          25% { transform: translate(-2px, -14px) rotate(135deg); }
          50% { transform: translate(-56px, -68px) rotate(270deg); }
          75% { transform: translate(-2px, -122px) rotate(405deg); }
          100% { transform: translate(52px, -68px) rotate(540deg); }
        }
        @keyframes gacha-swirl-1 {
          0% { transform: translate(55px, -8px) rotate(0deg); }
          25% { transform: translate(-24px, -29px) rotate(135deg); }
          50% { transform: translate(-3px, -108px) rotate(270deg); }
          75% { transform: translate(76px, -87px) rotate(405deg); }
          100% { transform: translate(55px, -8px) rotate(540deg); }
        }
        @keyframes gacha-swirl-2 {
          0% { transform: translate(-58px, -10px) rotate(0deg); }
          25% { transform: translate(-78px, -86px) rotate(135deg); }
          50% { transform: translate(-2px, -106px) rotate(270deg); }
          75% { transform: translate(18px, -30px) rotate(405deg); }
          100% { transform: translate(-58px, -10px) rotate(540deg); }
        }
        @keyframes gacha-swirl-3 {
          0% { transform: translate(-10px, -38px) rotate(0deg); }
          25% { transform: translate(50px, -98px) rotate(135deg); }
          50% { transform: translate(110px, -38px) rotate(270deg); }
          75% { transform: translate(50px, 22px) rotate(405deg); }
          100% { transform: translate(-10px, -38px) rotate(540deg); }
        }
        @keyframes gacha-swirl-4 {
          0% { transform: translate(-82px, -86px) rotate(0deg); }
          25% { transform: translate(-6px, -66px) rotate(135deg); }
          50% { transform: translate(-26px, 10px) rotate(270deg); }
          75% { transform: translate(-102px, -10px) rotate(405deg); }
          100% { transform: translate(-82px, -86px) rotate(540deg); }
        }
        @keyframes gacha-swirl-5 {
          0% { transform: translate(32px, -67px) rotate(0deg); }
          25% { transform: translate(-23px, -52px) rotate(-135deg); }
          50% { transform: translate(-8px, 3px) rotate(-270deg); }
          75% { transform: translate(47px, -12px) rotate(-405deg); }
          100% { transform: translate(32px, -67px) rotate(-540deg); }
        }
        @keyframes gacha-swirl-6 {
          0% { transform: translate(9px, -12px) rotate(0deg); }
          25% { transform: translate(-4px, -61px) rotate(-135deg); }
          50% { transform: translate(-53px, -48px) rotate(-270deg); }
          75% { transform: translate(-40px, 1px) rotate(-405deg); }
          100% { transform: translate(9px, -12px) rotate(-540deg); }
        }
        @keyframes gacha-swirl-7 {
          0% { transform: translate(32px, 32px) rotate(0deg); }
          25% { transform: translate(-10px, -10px) rotate(135deg); }
          50% { transform: translate(32px, -52px) rotate(270deg); }
          75% { transform: translate(74px, -10px) rotate(405deg); }
          100% { transform: translate(32px, 32px) rotate(540deg); }
        }
        @keyframes gacha-swirl-8 {
          0% { transform: translate(-73px, 7px) rotate(0deg); }
          25% { transform: translate(-21px, 21px) rotate(-135deg); }
          50% { transform: translate(-7px, -31px) rotate(-270deg); }
          75% { transform: translate(-59px, -45px) rotate(-405deg); }
          100% { transform: translate(-73px, 7px) rotate(-540deg); }
        }
        @keyframes gacha-swirl-9 {
          0% { transform: translate(-23px, -16px) rotate(0deg); }
          25% { transform: translate(10px, -25px) rotate(135deg); }
          50% { transform: translate(19px, 8px) rotate(270deg); }
          75% { transform: translate(-14px, 17px) rotate(405deg); }
          100% { transform: translate(-23px, -16px) rotate(540deg); }
        }
        @keyframes gacha-swirl-10 {
          0% { transform: translate(16px, -12px) rotate(0deg); }
          25% { transform: translate(-10px, 14px) rotate(-135deg); }
          50% { transform: translate(16px, 40px) rotate(-270deg); }
          75% { transform: translate(42px, 14px) rotate(-405deg); }
          100% { transform: translate(16px, -12px) rotate(-540deg); }
        }
        @keyframes gacha-swirl-11 {
          0% { transform: translate(-3px, 2px) rotate(0deg); }
          25% { transform: translate(-10px, 29px) rotate(135deg); }
          50% { transform: translate(-37px, 22px) rotate(270deg); }
          75% { transform: translate(-30px, -5px) rotate(405deg); }
          100% { transform: translate(-3px, 2px) rotate(540deg); }
        }
      `}</style>

      <div className="relative flex w-full flex-col items-center overflow-hidden rounded-t-[50px] rounded-b-[20px] border-4 border-[#333a4d] bg-gradient-to-b from-[#1e2333] via-[#161a26] to-[#0f121b] p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
        <div className="mb-3 flex items-center justify-between w-full px-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444] animate-ping" />
            <span className="h-2 w-2 rounded-full bg-[#eab308]" />
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
          </div>
          <span className="text-[12px] font-black tracking-widest text-[#f59e0b] drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
            NIME CAPSULE PRO
          </span>
          <div className="h-2 w-8 rounded-full bg-[#333a4d]" />
        </div>

        <div className={`relative h-[220px] w-[220px] rounded-full border-4 border-[#475569]/50 bg-gradient-to-b from-[#38bdf8]/15 via-transparent to-[#1e293b]/70 p-2 shadow-[inset_0_10px_25px_rgba(255,255,255,0.15)] backdrop-blur-xs transition-transform duration-300 ${isSpinning ? 'scale-[1.02]' : ''}`}>
          <div className="pointer-events-none absolute left-6 top-5 h-16 w-16 rounded-full bg-gradient-to-br from-white/40 to-transparent blur-[3px]" />
          <div className="pointer-events-none absolute right-7 bottom-7 h-10 w-10 rounded-full bg-gradient-to-tl from-[#38bdf8]/30 to-transparent blur-[2px]" />

          <div className="relative h-full w-full overflow-hidden rounded-full">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 opacity-70 transition-transform duration-1000"
              style={{
                transform: isSpinning
                  ? 'translate(-50%, -50%) rotate(1080deg)'
                  : 'translate(-50%, -50%) rotate(0deg)',
              }}
            >
              <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
              <div className="absolute inset-3 rounded-full border border-white/30 bg-[#38bdf8]/10" />
            </div>

            {PILE_BALLS.map((b, i) => (
              <div
                key={i}
                className="absolute h-8 w-8 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.45)]"
                style={{
                  left: `${b.left}px`,
                  top: `${b.top}px`,
                  background: `linear-gradient(180deg, ${b.topColor} 50%, ${b.bottomColor} 50%)`,
                  animation: isSpinning ? `gacha-swirl-${i} ${b.duration}s linear infinite` : 'none',
                  transform: isSpinning ? undefined : `rotate(${b.rot}deg)`,
                  transition: isSpinning ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <div className="absolute inset-0 rounded-full border border-black/20" />
                <div className="absolute top-1 left-1.5 h-2 w-2 rounded-full bg-white/65 blur-[0.5px]" />
                <div className="absolute top-1/2 left-0 right-0 h-[1.5px] -translate-y-1/2 bg-black/35" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col items-center rounded-[14px] border-2 border-[#2c3345] bg-[#12151f] p-3 shadow-inner">
          <div className="relative flex flex-col items-center">
            <span className="mb-1 text-[10px] font-bold tracking-wider text-muted">PUTAR DI SINI</span>
            <div
              className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-4 border-[#475569] bg-gradient-to-b from-[#64748b] to-[#1e293b] shadow-[0_6px_14px_rgba(0,0,0,0.5)] transition-transform duration-1500 ease-in-out"
              style={{
                transform: isSpinning ? 'rotate(1080deg)' : 'rotate(0deg)',
              }}
            >
              <div className="h-6 w-6 rounded-full border-2 border-[#94a3b8] bg-[#334155] shadow-inner" />
              <div className="absolute -top-3 h-5 w-3.5 rounded-[4px] border border-[#94a3b8] bg-gradient-to-t from-[#475569] to-[#cbd5e1] shadow-md" />
              <div className="absolute -bottom-3 h-5 w-3.5 rounded-[4px] border border-[#94a3b8] bg-gradient-to-b from-[#475569] to-[#cbd5e1] shadow-md" />
            </div>
          </div>

          <div className="mt-4 flex w-full max-w-[200px] flex-col items-center rounded-b-[10px] border-t-2 border-[#1e293b] bg-[#090b10] px-4 py-2 shadow-inner">
            <div className="h-1.5 w-16 rounded-full bg-[#1e2333]" />
            <span className="mt-1 text-[9px] font-bold text-muted">CHUTE / KELUAR</span>
          </div>
        </div>

        <div className="mt-4 flex w-full gap-2">
          <button
            type="button"
            disabled={disabled || isSpinning || userCoins < costOne}
            onClick={onSpinOne}
            className="flex-1 rounded-[6px] border border-[#3b82f6]/40 bg-gradient-to-b from-[#2563eb] to-[#1d4ed8] py-2.5 px-3 text-center text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="text-[13.5px] font-black tracking-wide">TARIK x1</div>
            <div className="text-[11.5px] font-medium text-blue-100">{costOne} koin</div>
          </button>

          <button
            type="button"
            disabled={disabled || isSpinning || userCoins < costTen}
            onClick={onSpinTen}
            className="flex-1 rounded-[6px] border border-[#f59e0b]/50 bg-gradient-to-b from-[#d97706] to-[#b45309] py-2.5 px-3 text-center text-white shadow-[0_4px_12px_rgba(217,119,6,0.35)] transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="text-[13.5px] font-black tracking-wide">TARIK x10</div>
            <div className="text-[11.5px] font-medium text-amber-100">{costTen} koin</div>
          </button>
        </div>
      </div>
    </div>
  )
})
