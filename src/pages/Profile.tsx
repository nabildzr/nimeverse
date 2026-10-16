import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Flame, Heart, Settings as Cog } from 'lucide-react'
import { accountApi, bannerUrl } from '../api/client'
import { titleName } from '../lib/titles'
import { RoleMark, userFace, XpBar } from '../components/Avatar'
import { BadgeGrid } from '../components/BadgeGrid'
import { Box } from '../components/Box'
import { AccessoryArt, FramedAvatar } from '../components/Decor'
import { Poster } from '../components/Poster'
import { ErrorView, PageLoader } from '../components/States'
import { seriesPath } from '../lib/format'
import { useTitle } from '../lib/useTitle'

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[4px] bg-item px-3 py-2 text-center">
      <div className="text-[18px] font-bold text-heading">{value.toLocaleString('id-ID')}</div>
      <div className="text-[11.5px] text-muted">{label}</div>
    </div>
  )
}

export default function Profile() {
  const { name = '' } = useParams()
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['profile', name],
    queryFn: ({ signal }) => accountApi.profile(name, signal),
    staleTime: 30_000,
  })
  useTitle(data ? `Profil ${data.name}` : '')

  if (isLoading) return <PageLoader />
  if (error || !data) return <ErrorView error={error} retry={refetch} />

  const earned = data.badges.filter((b) => b.earned)
  return (
    <div className="mx-auto max-w-[860px]">
      <article className="relative box overflow-hidden">
        <AccessoryArt slot="skin" code={data.skin} cover className="absolute inset-0 z-0 h-full w-full" />
        <div className="relative aspect-[3/1] w-full bg-gradient-to-br from-nav to-item sm:aspect-[4/1]" style={data.accentColor ? { backgroundImage: `linear-gradient(135deg, ${data.accentColor}55, transparent)` } : undefined}>
          {data.hasBanner && <img src={bannerUrl(data.name, data.bannerVersion)} alt="" className="absolute inset-0 h-full w-full object-cover" />}
          <AccessoryArt slot="effect" code={data.effect} cover className="absolute inset-0 h-full w-full" />
        </div>
        <div className="flex flex-col gap-4 px-[18px] pb-[18px] pt-0 sm:flex-row sm:items-center">
          <div className="-mt-12 mx-auto flex-none rounded-full bg-box p-1 sm:mx-0" style={{ marginBottom: data.frame ? 14 : 0 }}>
            <FramedAvatar face={userFace(data)} frame={data.frame} size={96} />
          </div>
          <div className="min-w-0 flex-1 sm:pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[22px] font-bold text-heading" style={data.accentColor ? { color: data.accentColor } : undefined}>
                {data.name}
              </h1>
              <RoleMark role={data.role} premium={data.premium} />
              {data.self && (
                <Link to="/pengaturan" className="ml-auto flex items-center gap-1 rounded-[3px] bg-nav px-3 py-1 text-[12.5px] text-white hover:bg-accent">
                  <Cog className="h-3.5 w-3.5" aria-hidden="true" /> Edit profil
                </Link>
              )}
            </div>
            {titleName(data.title) && <div className="text-[13px] font-medium text-sub">{titleName(data.title)}</div>}
            <div className="mt-0.5 text-[12.5px] text-muted">
              Bergabung {new Date(data.joinedAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
            </div>
            {data.bio && <p className="mt-2 whitespace-pre-wrap break-words text-[14px] leading-[1.6]">{data.bio}</p>}
            <div className="mt-3 max-w-[420px]">
              <div className="mb-1 flex items-center justify-between text-[13px]">
                <span className="font-semibold text-heading">Level {data.level}</span>
                <span className="flex items-center gap-1 text-muted">
                  <Flame className="h-4 w-4 text-[#ff6b3d]" aria-hidden="true" /> {data.streakCurrent} hari (terbaik {data.streakBest})
                </span>
              </div>
              <XpBar user={data} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 px-[18px] pb-[18px] sm:grid-cols-5">
          <Stat label="Episode" value={data.stats.episodes} />
          <Stat label="Serial" value={data.stats.series} />
          <Stat label="Komentar" value={data.stats.comments} />
          <Stat label="Postingan" value={data.stats.posts} />
          <Stat label="Upvote" value={data.stats.upvotes} />
        </div>
      </article>

      <Box title={`Lencana (${earned.length}/${data.badges.length})`} as="h2" viewAll={data.self ? '/lencana' : undefined}>
        {earned.length > 0 ? <BadgeGrid badges={earned} /> : <p className="p-[15px] text-[13px] text-muted">Belum ada lencana.</p>}
      </Box>

      {data.favorites.length > 0 && (
        <Box title="Anime favorit" as="h2">
          <ul className="grid grid-cols-3 gap-3 p-[15px] sm:grid-cols-5 md:grid-cols-6">
            {data.favorites.map((f) => (
              <li key={f.slug}>
                <Link to={seriesPath(f.slug)} className="block">
                  <Poster src={f.coverImage} alt={f.title} className="aspect-[225/317] w-full" />
                  <span className="mt-1 flex items-start gap-1 text-[12px] leading-4 text-heading">
                    <Heart className="mt-0.5 h-3 w-3 flex-none text-[#e5484d]" fill="currentColor" aria-hidden="true" />
                    <span className="line-clamp-2">{f.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </div>
  )
}
