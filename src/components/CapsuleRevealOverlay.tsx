import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Crown, Sparkles, Volume2, VolumeX, X, Zap } from 'lucide-react'
import type { Accessory, PullBatch, PullResult, Rarity } from '../api/accountTypes'
import { useAuth } from '../auth/AuthContext'
import { accountApi } from '../api/client'
import { ItemPreview, RarityTag } from './ItemPreview'
import { RARITY_COLOR, SLOT_LABEL } from '../lib/rarity'
import { playChimeSound, playPopSound, playTrumpetFanfare } from '../lib/gachaAudio'

interface CapsuleRevealOverlayProps {
  batch: PullBatch
  items?: Map<string, Accessory>
  onClose: () => void
}

function getRarityBallConfig(rarity: Rarity) {
  switch (rarity) {
    case 'legendary':
      return {
        top: '#fbbf24',
        bottom: '#f59e0b',
        border: '#f59e0b',
        glow: '0 0 25px rgba(245, 158, 11, 0.8), 0 0 50px rgba(251, 191, 36, 0.5)',
        badgeBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
        badgeText: '#000000',
        ringColor: '#fde047',
        burstColor: 'rgba(251, 191, 36, 0.9)',
        label: 'LEGENDARIS',
      }
    case 'epic':
      return {
        top: '#c084fc',
        bottom: '#7c3aed',
        border: '#a855f7',
        glow: '0 0 22px rgba(168, 85, 247, 0.75), 0 0 45px rgba(124, 58, 237, 0.4)',
        badgeBg: 'linear-gradient(135deg, #a855f7, #7c3aed)',
        badgeText: '#ffffff',
        ringColor: '#e9d5ff',
        burstColor: 'rgba(168, 85, 247, 0.85)',
        label: 'EPIK',
      }
    case 'rare':
      return {
        top: '#38bdf8',
        bottom: '#1d4ed8',
        border: '#2563eb',
        glow: '0 0 18px rgba(56, 189, 248, 0.65)',
        badgeBg: 'linear-gradient(135deg, #0284c7, #1d4ed8)',
        badgeText: '#ffffff',
        ringColor: '#93c5fd',
        burstColor: 'rgba(56, 189, 248, 0.75)',
        label: 'LANGKA',
      }
    default:
      return {
        top: '#94a3b8',
        bottom: '#475569',
        border: '#334155',
        glow: '0 0 12px rgba(148, 163, 184, 0.4)',
        badgeBg: 'linear-gradient(135deg, #475569, #334155)',
        badgeText: '#ffffff',
        ringColor: '#cbd5e1',
        burstColor: 'rgba(148, 163, 184, 0.5)',
        label: 'BIASA',
      }
  }
}

function getModalTheme(rarity: Rarity) {
  switch (rarity) {
    case 'legendary':
      return {
        glowStyle: { background: 'radial-gradient(circle, #f59e0b 0%, #ca8a04 40%, transparent 70%)' },
        flareColor: '#fde047',
        cardBorder: 'border-amber-400',
        cardShadow: 'shadow-[0_0_55px_rgba(245,158,11,0.7)]',
        headerBorder: 'border-amber-300/80 bg-gradient-to-r from-amber-500/30 via-yellow-400/20 to-amber-500/30',
        headerText: '★ TARIKAN LEGENDARIS! ★',
        textColor: 'text-amber-200',
        buttonClass: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black shadow-[0_4px_16px_rgba(245,158,11,0.4)]',
      }
    case 'epic':
      return {
        glowStyle: { background: 'radial-gradient(circle, #a855f7 0%, #7c3aed 40%, transparent 70%)' },
        flareColor: '#e9d5ff',
        cardBorder: 'border-purple-400',
        cardShadow: 'shadow-[0_0_50px_rgba(168,85,247,0.65)]',
        headerBorder: 'border-purple-300/80 bg-gradient-to-r from-purple-500/30 via-fuchsia-400/20 to-purple-500/30',
        headerText: '★ TARIKAN EPIK! ★',
        textColor: 'text-purple-200',
        buttonClass: 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 text-white shadow-[0_4px_16px_rgba(168,85,247,0.4)]',
      }
    case 'rare':
      return {
        glowStyle: { background: 'radial-gradient(circle, #38bdf8 0%, #1d4ed8 40%, transparent 70%)' },
        flareColor: '#bae6fd',
        cardBorder: 'border-sky-400',
        cardShadow: 'shadow-[0_0_40px_rgba(56,189,248,0.55)]',
        headerBorder: 'border-sky-300/80 bg-gradient-to-r from-sky-500/30 via-blue-400/20 to-sky-500/30',
        headerText: '★ TARIKAN LANGKA! ★',
        textColor: 'text-sky-200',
        buttonClass: 'bg-gradient-to-r from-sky-500 via-blue-600 to-sky-500 text-white shadow-[0_4px_16px_rgba(56,189,248,0.35)]',
      }
    default:
      return {
        glowStyle: { background: 'radial-gradient(circle, #64748b 0%, #334155 40%, transparent 70%)' },
        flareColor: '#e2e8f0',
        cardBorder: 'border-slate-400',
        cardShadow: 'shadow-[0_0_30px_rgba(148,163,184,0.35)]',
        headerBorder: 'border-slate-300/80 bg-gradient-to-r from-slate-600/30 to-slate-700/30',
        headerText: 'TARIKAN BIASA',
        textColor: 'text-white',
        buttonClass: 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-md',
      }
  }
}

export function CapsuleRevealOverlay({ batch, items, onClose }: CapsuleRevealOverlayProps) {
  const { user, refresh } = useAuth()
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const [burstingIndex, setBurstingIndex] = useState<number | null>(null)
  const [modalItem, setModalItem] = useState<PullResult | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isEquipping, setIsEquipping] = useState(false)
  const [justEquippedCode, setJustEquippedCode] = useState<string | null>(null)

  const total = batch.results.length
  const allOpened = revealedIndices.size === total

  const isItemEquipped = (code: string, slot: PullResult['slot']) => {
    if (justEquippedCode === code) return true
    if (!user) return false
    return user[slot] === code
  }

  const handleEquip = async (item: PullResult) => {
    if (isItemEquipped(item.code, item.slot)) return
    setIsEquipping(true)
    try {
      await accountApi.equip({ [item.slot]: item.code })
      setJustEquippedCode(item.code)
      await refresh()
    } catch {
    } finally {
      setIsEquipping(false)
    }
  }

  const openSingle = (index: number) => {
    if (revealedIndices.has(index)) return

    const res = batch.results[index]
    setBurstingIndex(index)

    if (soundEnabled) {
      playPopSound()
      if (res.rarity === 'legendary') {
        playTrumpetFanfare(true)
      } else if (res.rarity === 'epic') {
        playTrumpetFanfare(false)
      } else {
        playChimeSound()
      }
    }

    setModalItem(res)
    setRevealedIndices((prev) => new Set([...prev, index]))
    setTimeout(() => {
      setBurstingIndex(null)
    }, 450)
  }

  const openAll = () => {
    if (allOpened) return

    let firstSpecial: PullResult | null = null
    let hasLeg = false
    let hasEp = false
    const newSet = new Set(revealedIndices)

    batch.results.forEach((r, idx) => {
      newSet.add(idx)
      if (r.rarity === 'legendary') {
        hasLeg = true
        if (!firstSpecial) firstSpecial = r
      }
      if (r.rarity === 'epic') {
        hasEp = true
        if (!firstSpecial && !hasLeg) firstSpecial = r
      }
    })

    if (soundEnabled) {
      playPopSound()
      if (hasLeg) {
        playTrumpetFanfare(true)
      } else if (hasEp) {
        playTrumpetFanfare(false)
      } else {
        playChimeSound()
      }
    }

    if (firstSpecial) {
      setModalItem(firstSpecial)
    }

    setRevealedIndices(newSet)
  }

  const modalTheme = modalItem ? getModalTheme(modalItem.rarity) : null
  const isEquippedCurrent = modalItem ? isItemEquipped(modalItem.code, modalItem.slot) : false
  const activeDesc = modalItem ? items?.get(modalItem.code)?.description : undefined

  return (
    <div
      role="dialog"
      aria-label="Hasil Tarikan Gacha"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between overflow-y-auto bg-black/92 p-4 backdrop-blur-md select-none"
    >
      <div className="w-full max-w-[950px] flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <h2 className="text-[20px] font-black tracking-tight text-white drop-shadow">
            Ringkasan Hasil Tarikan Gacha
          </h2>
          {!allOpened && total > 1 && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11.5px] font-bold text-amber-300">
              {revealedIndices.size} / {total} Terbuka
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSoundEnabled((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            aria-label={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-red-400" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            aria-label="Tutup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {modalItem && modalTheme && (
        <div
          role="dialog"
          aria-label="Detail Hasil Tarikan"
          onClick={() => setModalItem(null)}
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 backdrop-blur-md cursor-pointer animate-in fade-in duration-300"
        >
          <div
            className="pointer-events-none absolute h-[750px] w-[750px] rounded-full opacity-70 blur-3xl animate-pulse"
            style={modalTheme.glowStyle}
          />

          <svg className="pointer-events-none absolute h-[900px] w-[900px] opacity-40 animate-[spin_24s_linear_infinite]" viewBox="0 0 100 100">
            {Array.from({ length: 18 }).map((_, i) => (
              <polygon key={i} points="50,50 48,0 52,0" fill={modalTheme.flareColor} transform={`rotate(${i * 20} 50 50)`} />
            ))}
          </svg>

          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 flex w-full max-w-[390px] flex-col items-center rounded-2xl border-2 ${modalTheme.cardBorder} bg-gradient-to-b from-[#251e0e]/95 via-[#161a26]/95 to-[#0b0e14]/98 p-6 text-center ${modalTheme.cardShadow} animate-in zoom-in-90 duration-300 cursor-default`}
          >
            <div className={`flex items-center gap-2 rounded-full border px-5 py-1.5 shadow-md ${modalTheme.headerBorder}`}>
              {modalItem.rarity === 'legendary' ? (
                <Crown className="h-5 w-5 text-yellow-300 animate-spin" />
              ) : (
                <Sparkles className="h-5 w-5 text-amber-200" />
              )}
              <span className="text-[13.5px] font-black tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {modalTheme.headerText}
              </span>
              <Sparkles className="h-5 w-5 text-amber-200" />
            </div>

            <div className="relative my-5 flex h-36 w-36 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-white/10 blur-xl animate-pulse" />
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-white/30 animate-[spin_12s_linear_infinite]" />
              <div className="relative scale-125 transform">
                <ItemPreview item={{ code: modalItem.code, slot: modalItem.slot, name: modalItem.name }} />
              </div>
            </div>

            <h3 className={`text-[20px] font-black tracking-wide ${modalTheme.textColor} drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
              {modalItem.name}
            </h3>

            <div className="mt-2 flex items-center gap-2">
              <RarityTag rarity={modalItem.rarity} />
              <span className="text-[12px] font-medium text-gray-300">
                {SLOT_LABEL[modalItem.slot]}
              </span>
            </div>

            {activeDesc && (
              <p className="mt-2.5 max-w-[320px] text-[12px] leading-relaxed text-gray-300/90">
                {activeDesc}
              </p>
            )}

            <div className="mt-4 w-full">
              {modalItem.duplicate ? (
                <div className="flex flex-col items-center gap-1 rounded-lg border border-amber-500/40 bg-amber-500/15 px-4 py-2 text-amber-300">
                  <span className="text-[13px] font-black">+{modalItem.xp || 50} XP (Duplikat)</span>
                  <span className="text-[11px] text-amber-200/80">Karakter sudah dimiliki, diubah menjadi XP!</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 rounded-lg border border-emerald-500/50 bg-emerald-500/20 px-4 py-2 text-emerald-300">
                  <span className="text-[13px] font-black">✨ BARU DITAMBAHKAN! ✨</span>
                  <span className="text-[11px] text-emerald-200/80">Langsung tersimpan di inventaris profil Anda</span>
                </div>
              )}
            </div>

            <div className="mt-5 flex w-full flex-col gap-2">
              {isEquippedCurrent ? (
                <button
                  type="button"
                  disabled
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/20 py-2.5 text-[14px] font-black text-emerald-300 cursor-default shadow-md"
                >
                  <Check className="h-4 w-4 text-emerald-400" /> Terpasang di Profil
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isEquipping}
                  onClick={() => handleEquip(modalItem)}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[14px] font-black transition hover:brightness-110 active:scale-95 disabled:opacity-50 ${modalTheme.buttonClass}`}
                >
                  <Sparkles className="h-4 w-4" />
                  {isEquipping ? 'Memasang...' : 'Pakai Sekarang'}
                </button>
              )}

              <button
                type="button"
                onClick={() => setModalItem(null)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2 text-[12.5px] font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition"
              >
                Lanjutkan Buka
              </button>
            </div>
            <span className="mt-2 text-[10.5px] text-muted">Ketuk di luar untuk menutup</span>
          </div>
        </div>
      )}

      <div className="my-auto w-full max-w-[950px] py-3">
        <ul
          className={`grid w-full gap-3.5 ${
            total > 1
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
              : 'max-w-[240px] mx-auto grid-cols-1'
          }`}
        >
          {batch.results.map((r, i) => {
            const isRevealed = revealedIndices.has(i)
            const isBursting = burstingIndex === i
            const cfg = getRarityBallConfig(r.rarity)
            const isLeg = r.rarity === 'legendary'
            const isEp = r.rarity === 'epic'
            const cardColor = RARITY_COLOR[r.rarity]
            const isEquipped = isItemEquipped(r.code, r.slot)

            return (
              <li
                key={i}
                className="relative flex flex-col items-center justify-center min-h-[220px]"
              >
                {!isRevealed ? (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => openSingle(i)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openSingle(i)}
                    className={`group relative flex h-full w-full cursor-pointer flex-col items-center justify-between rounded-[8px] border-2 bg-[#121622] p-4 text-center transition-all duration-300 hover:scale-[1.04] active:scale-95 ${
                      isBursting ? 'scale-110' : ''
                    }`}
                    style={{
                      borderColor: cfg.border,
                      boxShadow: cfg.glow,
                    }}
                  >
                    <div
                      className="rounded-full px-2.5 py-0.5 text-[9.5px] font-black tracking-wider uppercase shadow-xs"
                      style={{
                        background: cfg.badgeBg,
                        color: cfg.badgeText,
                      }}
                    >
                      {cfg.label}
                    </div>

                    <div className="relative my-3 flex items-center justify-center">
                      <div
                        className="relative h-20 w-20 rounded-full border-3 border-white/80 shadow-lg transition-transform duration-300 group-hover:rotate-12"
                        style={{
                          background: `linear-gradient(180deg, ${cfg.top} 50%, ${cfg.bottom} 50%)`,
                          filter: `drop-shadow(0 0 10px ${cfg.border})`,
                        }}
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/25 via-transparent to-white/45" />
                        <div className="absolute top-1.5 left-2.5 h-3.5 w-3.5 rounded-full bg-white/70 blur-[1px]" />
                        <div className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2 bg-[#0f172a]" />
                        <div className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-[#1e293b] flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        </div>
                      </div>

                      {isBursting && (
                        <div
                          className="absolute inset-0 rounded-full animate-ping opacity-90"
                          style={{ backgroundColor: cfg.burstColor }}
                        />
                      )}
                    </div>

                    <span className="text-[11.5px] font-black tracking-wide text-white/90 group-hover:text-amber-300 transition">
                      PENCET BUKA
                    </span>
                  </div>
                ) : (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setModalItem(r)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setModalItem(r)}
                    className={`group relative flex h-full w-full cursor-pointer flex-col items-center justify-between rounded-[8px] border-2 bg-[#161a26]/95 p-3 text-center shadow-lg transition-all duration-300 hover:scale-[1.03] animate-in zoom-in-75 ${
                      isLeg
                        ? 'border-[#f59e0b] shadow-[0_0_18px_rgba(245,158,11,0.5)]'
                        : isEp
                          ? 'border-[#a855f7] shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                          : 'border-[#333a4d]'
                    }`}
                    style={{ borderColor: isLeg ? '#f59e0b' : cardColor.border }}
                  >
                    {isLeg && (
                      <div className="absolute -top-2.5 right-2 rounded-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] px-2 py-0.5 text-[9px] font-black text-black shadow-md">
                        LEGEND
                      </div>
                    )}

                    {isEquipped && (
                      <div className="absolute top-2 left-2 rounded-full bg-emerald-500/25 border border-emerald-400/40 px-1.5 py-0.5 text-[8.5px] font-black text-emerald-300 flex items-center gap-0.5 shadow-sm">
                        <Check className="h-2.5 w-2.5" /> Dipakai
                      </div>
                    )}

                    <div className="my-1">
                      <ItemPreview item={{ code: r.code, slot: r.slot, name: r.name }} />
                    </div>

                    <span className="text-[12.5px] font-bold text-white line-clamp-1 mt-1">{r.name}</span>
                    <RarityTag rarity={r.rarity} />
                    <span className="text-[10.5px] text-muted">{SLOT_LABEL[r.slot]}</span>

                    <div className="mt-1 flex flex-col items-center gap-1 w-full">
                      {r.duplicate ? (
                        <span className="rounded-[4px] bg-[#1e2333] px-2 py-0.5 text-[11px] font-bold text-amber-300">
                          +{r.xp || 50} XP
                        </span>
                      ) : (
                        <span className="rounded-[4px] bg-[#22c55e]/25 px-2 py-0.5 text-[11px] font-bold text-[#4ade80]">
                          BARU!
                        </span>
                      )}
                      <span className="text-[10px] text-gray-400 group-hover:text-amber-300 transition font-semibold">
                        Klik untuk Pakai
                      </span>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="w-full max-w-[950px] flex flex-col items-center gap-3 pt-2">
        <div className="flex flex-wrap items-center justify-center gap-4 rounded-[8px] border border-line bg-black/50 px-5 py-2 text-[13px] text-gray-300 shadow-md">
          <span>
            Sisa Koin: <b className="text-white font-bold">{batch.coins.toLocaleString('id-ID')}</b>
          </span>
          {batch.totalXP ? (
            <span className="text-emerald-400 font-bold">
              +{batch.totalXP} XP dari duplikat
            </span>
          ) : null}
          {batch.refunded > 0 && (
            <span className="text-amber-300">
              (+{batch.refunded} koin dikembalikan)
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pb-2">
          {!allOpened && total > 1 && (
            <button
              type="button"
              onClick={openAll}
              className="flex h-10 items-center gap-2 rounded-[6px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 px-6 text-[13.5px] font-black text-black shadow-[0_4px_16px_rgba(245,158,11,0.4)] hover:brightness-110 active:scale-95 transition"
            >
              <Zap className="h-4 w-4 fill-black" /> Buka Semua ({total - revealedIndices.size} Tersisa)
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-[6px] bg-blue-600 px-8 text-[14px] font-bold text-white shadow-md hover:bg-blue-500 active:scale-95 transition"
          >
            Selesai
          </button>

          <Link
            to="/pengaturan"
            className="flex h-10 items-center rounded-[6px] border border-white/20 bg-white/10 px-6 text-[14px] font-medium text-white hover:bg-white/20 transition"
          >
            Pengaturan Profil
          </Link>
        </div>
      </div>
    </div>
  )
}
