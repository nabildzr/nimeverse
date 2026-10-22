import { useMemo, useState } from 'react'
import { Download, ExternalLink, Archive, Layers } from 'lucide-react'
import type { AnimeDownload } from '../api/types'

function qualityRank(q: string): number {
  const n = parseInt(q, 10)
  return Number.isFinite(n) ? n : 0
}

export function SeriesDownloads({ downloads }: { downloads: AnimeDownload[] }) {
  // Separate batch downloads from individual episode downloads
  const { batchList, episodeList } = useMemo(() => {
    const batches: AnimeDownload[] = []
    const episodes: AnimeDownload[] = []

    for (const dl of downloads) {
      const isBatch =
        dl.format.toLowerCase() === 'batch' ||
        dl.host.toLowerCase().includes('batch') ||
        dl.url.includes('.zip') ||
        dl.url.includes('.rar')
      if (isBatch) {
        batches.push(dl)
      } else {
        episodes.push(dl)
      }
    }
    return { batchList: batches, episodeList: episodes }
  }, [downloads])

  // Group batch downloads by quality
  const batchGroups = useMemo(() => {
    const map = new Map<string, AnimeDownload[]>()
    for (const dl of batchList) {
      const key = dl.quality || 'HD'
      map.set(key, [...(map.get(key) ?? []), dl])
    }
    return [...map.entries()]
      .map(([quality, items]) => ({ quality, items }))
      .sort((a, b) => qualityRank(b.quality) - qualityRank(a.quality))
  }, [batchList])

  // Group episode downloads by episode number
  const episodesByNumber = useMemo(() => {
    const map = new Map<number, AnimeDownload[]>()
    for (const dl of episodeList) {
      const num = dl.episodeNumber || 1
      map.set(num, [...(map.get(num) ?? []), dl])
    }
    return [...map.entries()]
      .map(([number, items]) => ({ number, items }))
      .sort((a, b) => b.number - a.number)
  }, [episodeList])

  // State for single-episode download selector
  const [selectedEpNum, setSelectedEpNum] = useState<number>(() => episodesByNumber[0]?.number ?? 1)
  const currentEpItems = useMemo(
    () => episodesByNumber.find((e) => e.number === selectedEpNum)?.items ?? [],
    [episodesByNumber, selectedEpNum],
  )

  const currentEpQualities = useMemo(() => {
    const map = new Map<string, AnimeDownload[]>()
    for (const dl of currentEpItems) {
      const key = `${dl.format.toUpperCase()} ${dl.quality}`
      map.set(key, [...(map.get(key) ?? []), dl])
    }
    return [...map.entries()]
      .map(([key, items]) => ({ key, items }))
      .sort((a, b) => qualityRank(b.items[0].quality) - qualityRank(a.items[0].quality))
  }, [currentEpItems])

  const [epQualityKey, setEpQualityKey] = useState('')
  const activeQuality = currentEpQualities.find((q) => q.key === epQualityKey) ?? currentEpQualities[0]

  if (downloads.length === 0) return null

  return (
    <div className="flex flex-col gap-4 p-[15px]">
      {/* 1. Batch Downloads (if available) */}
      {batchGroups.length > 0 && (
        <div className="rounded-[8px] border border-[#263e60] bg-[#071426] p-4">
          <div className="mb-3 flex items-center gap-2 text-[15px] font-semibold text-white">
            <span className="flex items-center justify-center text-accent">
              <Archive className="h-4 w-4" />
            </span>
            <strong>Download Batch (Semua Episode)</strong>
          </div>
          <div className="flex flex-col gap-2.5">
            {batchGroups.map(({ quality, items }) => (
              <div
                key={quality}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-[6px] border border-[#1b2e47] bg-[#0b1b30] px-3.5 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded bg-accent/20 border border-accent/40 px-2 py-0.5 text-[12px] font-bold text-accent uppercase tracking-wider">
                    BATCH {quality}
                  </span>
                  {items[0].size && <span className="text-[11.5px] text-muted">({items[0].size})</span>}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {items.map((dl) => (
                    <a
                      key={dl.id || dl.url}
                      href={dl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#2b405f] bg-[#17263e] px-2.5 py-1 text-[12px] font-medium text-white hover:border-accent hover:bg-accent/80 transition-all"
                    >
                      <Download className="h-3 w-3 opacity-70" />
                      {dl.host.replace(/\s*\(Batch\)/i, '')}
                      <span className="text-[10px] text-muted opacity-80">({dl.provider})</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Episode Downloads (if available) */}
      {episodesByNumber.length > 0 && (
        <div className="rounded-[8px] border border-[#263e60] bg-[#071426] p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[15px] font-semibold text-white">
              <span className="flex items-center justify-center text-accent">
                <Layers className="h-4 w-4" />
              </span>
              <strong>Download Per Episode</strong>
            </div>
            {episodesByNumber.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-muted">Pilih Episode:</span>
                <select
                  aria-label="Pilih Episode"
                  value={selectedEpNum}
                  onChange={(e) => {
                    setSelectedEpNum(Number(e.target.value))
                    setEpQualityKey('')
                  }}
                  className="h-8 rounded-[4px] border border-[#2b405f] bg-[#17263e] px-2 text-[12px] text-white outline-none focus:border-accent"
                >
                  {episodesByNumber.map((ep) => (
                    <option key={ep.number} value={ep.number}>
                      Episode {ep.number}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {activeQuality ? (
            <div className="flex flex-col gap-2.5">
              {currentEpQualities.map(({ key, items }) => (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-[6px] border border-[#1b2e47] bg-[#0b1b30] px-3.5 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-accent/20 border border-accent/40 px-2 py-0.5 text-[12px] font-bold text-accent uppercase tracking-wider">
                      {key}
                    </span>
                    {items[0].size && <span className="text-[11.5px] text-muted">({items[0].size})</span>}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {items.map((dl) => (
                      <a
                        key={dl.id || dl.url}
                        href={dl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#2b405f] bg-[#17263e] px-2.5 py-1 text-[12px] font-medium text-white hover:border-accent hover:bg-accent/80 transition-all"
                      >
                        <ExternalLink className="h-3 w-3 opacity-70" />
                        {dl.host}
                        <span className="text-[10px] text-muted opacity-80">({dl.provider})</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-muted">Belum ada link unduhan untuk episode ini.</p>
          )}
        </div>
      )}
    </div>
  )
}
