import type { AccessorySlot, Rarity } from '../api/accountTypes'

export const RARITY_LABEL: Record<Rarity, string> = {
  common: 'Biasa',
  rare: 'Langka',
  epic: 'Epik',
  legendary: 'Legendaris',
}

/** Text, border and glow colours per rarity. */
export const RARITY_COLOR: Record<Rarity, { text: string; border: string; glow: string }> = {
  common: { text: '#b8c0cc', border: '#6b7480', glow: 'rgba(184,192,204,0.25)' },
  rare: { text: '#5cb2ff', border: '#2f86d8', glow: 'rgba(92,178,255,0.45)' },
  epic: { text: '#c58bff', border: '#9a4fe0', glow: 'rgba(197,139,255,0.55)' },
  legendary: { text: '#ffc247', border: '#ff9d00', glow: 'rgba(255,194,71,0.7)' },
}

export const SLOT_LABEL: Record<AccessorySlot, string> = {
  frame: 'Bingkai',
  effect: 'Efek banner',
  skin: 'Skin kartu',
  title: 'Gelar',
}
