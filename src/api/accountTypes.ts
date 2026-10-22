// Types for accounts, the library, gamification and the community. They mirror the backend JSON.

export type Role = 'user' | 'mod' | 'admin'

export interface User {
  displayName: string
  email?: string
  bio: string
  role: Role
  premium: boolean
  premiumUntil?: string
  accentColor?: string
  profilePublic: boolean
  favoritesPublic: boolean
  hasPassword: boolean
  hasGoogle: boolean
  hasAvatar: boolean
  avatarVersion?: number
  hasBanner: boolean
  bannerVersion?: number
  frame?: string
  effect?: string
  skin?: string
  title?: string
  coins: number
  xp: number
  level: number
  levelXp: number
  nextLevelXp: number
  streakCurrent: number
  streakBest: number
  streakFreezes: number
  createdAt: string
}

export interface BadgeBrief {
  code: string
  name: string
  icon: string
  tier: 'bronze' | 'silver' | 'gold' | 'special'
}

export interface Gain {
  kind: string
  xp: number
}

/** What an action earned. The interface shows it as toasts. */
export interface Outcome {
  gains: Gain[]
  xp: number
  level: number
  levelUp: boolean
  newBadges: BadgeBrief[]
  streak: number
  streakIncreased: boolean
  streakFreezeUsed: boolean
  coins: number
}

export interface Badge extends BadgeBrief {
  description: string
  category: string
  goal: number
  metric: string
  earned: boolean
  earnedAt?: string
  progress: number
}

export interface Author {
  name: string
  level: number
  premium: boolean
  role?: Role
  accentColor?: string
  hasAvatar: boolean
  avatarVersion?: number
}

export interface Comment {
  id: number
  parentId?: number
  depth: number
  author?: Author
  body: string
  spoiler: boolean
  score: number
  myVote: number
  createdAt: string
  editedAt?: string
  deleted: boolean
  mine: boolean
  image?: MediaRef
}

export interface Post {
  id: number
  community: string
  communityName: string
  author?: Author
  animeSlug?: string
  animeTitle?: string
  title: string
  body: string
  spoiler: boolean
  score: number
  myVote: number
  commentCount: number
  locked: boolean
  createdAt: string
  editedAt?: string
  deleted: boolean
  mine: boolean
  image?: MediaRef
}

export interface Community {
  slug: string
  name: string
  description: string
  postCount: number
}

export type ListStatus = 'plan' | 'watching' | 'completed' | 'on_hold' | 'dropped'

export interface LibraryItem {
  slug: string
  title: string
  coverImage: string
  format?: string
  airingStatus?: string
  episodesTotal?: number
  listStatus: ListStatus
  favorite: boolean
  watched: number
  updatedAt: string
}

export interface ProgressSummary {
  position: number
  duration: number
  completed: boolean
}

export interface AnimeState {
  inList: boolean
  listStatus?: ListStatus
  favorite: boolean
  progress: Record<string, ProgressSummary>
}

export interface ContinueItem {
  slug: string
  title: string
  coverImage: string
  episode: number
  position: number
  duration: number
  completed: boolean
  nextEpisode?: number
  updatedAt: string
}

export interface LeaderRow {
  rank: number
  user: Author
  xp: number
  streak: number
  me?: boolean
}

export interface PublicProfile {
  name: string
  bio: string
  level: number
  xp: number
  levelXp: number
  nextLevelXp: number
  premium: boolean
  accentColor?: string
  role?: Role
  hasAvatar: boolean
  avatarVersion?: number
  hasBanner: boolean
  bannerVersion?: number
  frame?: string
  effect?: string
  skin?: string
  title?: string
  streakCurrent: number
  streakBest: number
  joinedAt: string
  self: boolean
  stats: { episodes: number; series: number; comments: number; posts: number; upvotes: number }
  badges: Badge[]
  favorites: LibraryItem[]
}

export interface CommentTarget {
  anime?: string
  episode?: number
  post?: number
}

export type AccessorySlot = 'frame' | 'effect' | 'skin' | 'title'
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface Accessory {
  code: string
  name: string
  description: string
  slot: AccessorySlot
  source: 'level' | 'premium' | 'gacha'
  minLevel: number
  premium: boolean
  rarity?: Rarity
  unlocked: boolean
}

export interface MediaRef {
  id: string
  width: number
  height: number
  animated: boolean
}

export interface PullResult {
  code: string
  name: string
  slot: AccessorySlot
  rarity: Rarity
  duplicate: boolean
  refund: number
  xp?: number
}

export interface PullBatch {
  results: PullResult[]
  spent: number
  refunded: number
  totalXP?: number
  coins: number
  xp?: number
  level?: number
  pityEpic: number
  pityLegend: number
  newBadges: BadgeBrief[]
}

export interface GachaState {
  coins: number
  pityEpic: number
  pityLegend: number
  pityEpicAt: number
  pityLegendAt: number
  costOne: number
  costTen: number
  rates: Record<Rarity, number>
  refunds: Record<Rarity, number>
  owned: string[]
  history: { code: string; name: string; rarity: Rarity; duplicate: boolean; at: string }[]
  pulls: number
}

export interface Quest {
  code: string
  name: string
  description: string
  goal: number
  reward: number
  progress: number
  claimed: boolean
  claimable: boolean
}

/** What the server pushes over the live stream. */
export interface LiveEvent {
  type: 'comment' | 'comment-edit' | 'comment-delete' | 'score' | 'post' | 'post-update' | 'post-delete'
  comment?: Comment
  post?: Post
  kind?: 'comment' | 'post'
  id?: number
  score?: number
}

export interface ShopItem {
  code: string
  name: string
  description: string
  slot: AccessorySlot
  rarity: Rarity
  price: number
  owned: boolean
}

export interface DailyShopResponse {
  date: string
  resetsInSeconds: number
  coins: number
  items: ShopItem[]
}
