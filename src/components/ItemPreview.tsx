import { Crown, Lock, Sparkles } from 'lucide-react'
import type { Accessory } from '../api/accountTypes'
import { RARITY_COLOR, RARITY_LABEL } from '../lib/rarity'
import { AccessoryArt } from './Decor'

/** The artwork of one accessory on a neutral stage: a ring for frames, a wide strip for effects and skins, text for titles. */
export function ItemPreview({ item, className = '' }: { item: Pick<Accessory, 'code' | 'slot' | 'name'>; className?: string }) {
  if (item.slot === 'title') {
    return (
      <span className={`flex h-[70px] w-full items-center justify-center rounded-[3px] bg-box px-2 text-center text-[13px] font-semibold text-sub ${className}`}>
        {item.name}
      </span>
    )
  }
  if (item.slot === 'frame') {
    return (
      <span className={`relative flex h-[88px] w-[88px] flex-none items-center justify-center ${className}`}>
        <span className="h-[56px] w-[56px] flex-none rounded-full bg-control" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center">
          <AccessoryArt slot="frame" code={item.code} className="h-full w-full" />
        </span>
      </span>
    )
  }
  return (
    <span className={`relative flex h-[70px] w-full items-center justify-center overflow-hidden rounded-[3px] bg-box ${className}`}>
      <AccessoryArt slot={item.slot} code={item.code} cover className="h-full w-full" />
    </span>
  )
}

/** Small label that says how an accessory is obtained or whether it is yours. */
export function SourceTag({ item, active }: { item: Accessory; active?: boolean }) {
  if (item.unlocked) {
    return <span className={active ? 'text-accent' : 'text-[#2ecc71]'}>{active ? 'Dipakai' : 'Terbuka'}</span>
  }
  if (item.source === 'gacha') {
    return (
      <span className="flex items-center gap-1 text-muted">
        <Sparkles className="h-3 w-3" aria-hidden="true" /> Dari gacha
      </span>
    )
  }
  if (item.source === 'premium') {
    return (
      <span className="flex items-center gap-1 text-sub">
        <Crown className="h-3 w-3" aria-hidden="true" /> Premium
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1 text-muted">
      <Lock className="h-3 w-3" aria-hidden="true" /> Level {item.minLevel}
    </span>
  )
}

export function RarityTag({ rarity }: { rarity?: Accessory['rarity'] }) {
  if (!rarity) return null
  const c = RARITY_COLOR[rarity]
  return (
    <span className="rounded-[3px] px-1.5 py-px text-[10.5px] font-semibold uppercase tracking-wide" style={{ color: c.text, backgroundColor: c.glow }}>
      {RARITY_LABEL[rarity]}
    </span>
  )
}
