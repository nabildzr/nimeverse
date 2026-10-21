export interface Genre {
  name: string
  slug: string
  count?: number
  /** A real genre, or a theme tag such as Isekai or School. Older servers omit it, which means genre. */
  kind?: 'genre' | 'tag'
}

export interface AnimeCard {
  id: number
  slug: string
  title: string
  coverImage: string
  coverColor: string | null
  format: string | null
  status: string | null
  score: number | null
  studio: string | null
  latestEpisode: number | null
  genres: Genre[]
  seasonYear: number | null
  updatedAt: string
}

export interface EpisodeCard {
  animeSlug: string
  animeTitle: string
  coverImage: string
  format: string | null
  status: string | null
  number: number
  airedAt: string | null
}

export interface Episode {
  id: number
  number: number
  title: string | null
  thumbnail: string | null
  officialUrl: string | null
  officialSite: string | null
  airedAt: string | null
}

export interface AnimeDetail {
  id: number
  anilistId: number
  malId: number | null
  slug: string
  title: string
  titleEnglish: string | null
  titleNative: string | null
  synonyms: string[]
  synopsis: string
  coverImage: string
  coverColor: string | null
  bannerImage: string | null
  format: string | null
  status: string | null
  season: string | null
  seasonYear: number | null
  episodesTotal: number | null
  duration: number | null
  score: number | null
  popularity: number
  studio: string | null
  source: string | null
  trailerSite: string | null
  trailerId: string | null
  startDate: string | null
  endDate: string | null
  nextAiringEpisode: number | null
  nextAiringAt: string | null
  createdAt: string
  updatedAt: string
  genres: Genre[]
}

export interface VideoSource {
  id: number
  label: string
  kind: 'hls' | 'mp4' | 'iframe'
  url: string
  quality: string | null
  priority: number
}

export interface Paged<T> {
  items: T[]
  page: number
  perPage: number
  total: number
  totalPages: number
}

export interface HomeData {
  latest: Paged<EpisodeCard>
  recommended: AnimeCard[]
  popular: AnimeCard[]
}

export interface DetailData {
  anime: AnimeDetail
  episodes: Episode[]
  recommendations: AnimeCard[]
}

export interface EpisodeDownload {
  id: number
  episodeId: number
  provider: string
  format: string
  quality: string
  host: string
  url: string
  size?: string
  priority: number
}

export interface WatchData {
  anime: AnimeDetail
  episode: Episode
  episodes: Episode[]
  prev: number | null
  next: number | null
  sources: VideoSource[]
  downloads?: EpisodeDownload[]
  recommendations: AnimeCard[]
}

export interface ScheduleRow {
  episode: number
  airingAt: string
  anime: AnimeCard
}

export interface ScheduleData {
  from: string
  days: number
  items: ScheduleRow[]
}

export interface ListParams {
  q?: string
  genre?: string
  status?: string
  type?: string
  season?: string
  year?: string
  letter?: string
  order?: string
  page?: number
  perPage?: number
}
