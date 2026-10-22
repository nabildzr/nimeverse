import { useMemo, useState } from 'react'
import { Download, ExternalLink } from 'lucide-react'
import type { EpisodeDownload } from '../api/types'

const selectCls =
  'h-9 min-w-0 flex-1 rounded-[4px] border border-[#2b405f] bg-[#17263e] px-2.5 text-[13px] text-white outline-none focus:border-accent'

/** Highest resolution first; anything unrecognised goes last. */
function qualityRank(q: string): number {
  const n = parseInt(q, 10)
  return Number.isFinite(n) ? n : 0
}

/**
 * Downloads for one episode as two dropdowns (resolution, then server) and a button. The list can hold dozens of
 * mirrors, so buttons for each would bury the page.
 */
export function DownloadPicker({ downloads, episode }: { downloads: EpisodeDownload[]; episode: number }) {
  const groups = useMemo(() => {
    const map = new Map<string, EpisodeDownload[]>()
    for (const dl of downloads) {
      const key = `${dl.format.toUpperCase()} ${dl.quality}`
      map.set(key, [...(map.get(key) ?? []), dl])
    }
    return [...map.entries()]
      .map(([key, items]) => ({ key, items }))
      .sort((a, b) => qualityRank(b.items[0].quality) - qualityRank(a.items[0].quality) || a.key.localeCompare(b.key))
  }, [downloads])

  const [groupKey, setGroupKey] = useState('')
  const [url, setUrl] = useState('')

  const group = groups.find((g) => g.key === groupKey) ?? groups[0]
  if (!group) return null
  const chosen = group.items.find((d) => d.url === url) ?? group.items[0]

  return (
    <div className="my-[15px] rounded-[8px] border border-[#263e60] bg-[#071426] p-[14px]">
      <div className="mb-3 flex items-center gap-2 text-[15px] font-semibold text-white">
        <span className="flex items-center justify-center text-accent">
          <Download className="h-4 w-4" />
        </span>
        <strong>Download Episode {episode}</strong>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <select
          aria-label="Resolusi unduhan"
          value={group.key}
          onChange={(e) => {
            setGroupKey(e.target.value)
            setUrl('')
          }}
          className={selectCls}
        >
          {groups.map((g) => (
            <option key={g.key} value={g.key}>
              {g.key}
              {g.items[0].size ? ` (${g.items[0].size})` : ''}
            </option>
          ))}
        </select>
        <select aria-label="Server unduhan" value={chosen.url} onChange={(e) => setUrl(e.target.value)} className={selectCls}>
          {group.items.map((d) => (
            <option key={d.id || d.url} value={d.url}>
              {d.host} ({d.provider})
            </option>
          ))}
        </select>
        <a
          href={chosen.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 flex-none items-center justify-center gap-1.5 rounded-[4px] bg-accent px-5 text-[13px] font-semibold text-white hover:brightness-110"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> Unduh
        </a>
      </div>
    </div>
  )
}
