import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, Clock, Coins, Gift, ShoppingBag, Sparkles, Store } from 'lucide-react'
import { accountApi, ApiError } from '../api/client'
import type { ShopItem } from '../api/accountTypes'
import { useAuth } from '../auth/AuthContext'
import { Box } from '../components/Box'
import { ItemPreview, RarityTag } from '../components/ItemPreview'
import { PageLoader } from '../components/States'
import { useToasts } from '../components/Toasts'
import { RARITY_COLOR, SLOT_LABEL } from '../lib/rarity'
import { useTitle } from '../lib/useTitle'
import { playPopSound, playTrumpetFanfare } from '../lib/gachaAudio'

function formatCountdown(totalSeconds: number): string {
  if (totalSeconds <= 0) return '00:00:00'
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export default function Shop() {
  useTitle('Toko Harian')
  const { user, loading, refresh } = useAuth()
  const client = useQueryClient()
  const toasts = useToasts()
  const [countdown, setCountdown] = useState<number>(0)
  const [error, setError] = useState<string>('')

  const shopQuery = useQuery({
    queryKey: ['daily-shop'],
    queryFn: () => accountApi.dailyShop(),
    enabled: !!user,
    staleTime: 60_000,
  })

  useEffect(() => {
    if (shopQuery.data?.resetsInSeconds != null) {
      setCountdown(shopQuery.data.resetsInSeconds)
    }
  }, [shopQuery.data?.resetsInSeconds])

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          shopQuery.refetch()
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [countdown, shopQuery])

  const buy = useMutation({
    mutationFn: (code: string) => accountApi.buyShopItem(code),
    onSuccess: async (data) => {
      setError('')
      playPopSound()
      playTrumpetFanfare(data.item.rarity === 'legendary')
      toasts.push([
        {
          tone: 'badge',
          title: `Berhasil Membeli!`,
          text: `${data.item.name} telah ditambahkan ke koleksimu.`,
        },
      ])
      await Promise.all([
        client.invalidateQueries({ queryKey: ['daily-shop'] }),
        client.invalidateQueries({ queryKey: ['profile', 'accessories'] }),
        refresh(),
      ])
    },
    onError: (e) => {
      setError(e instanceof ApiError ? e.message : 'Pembelian gagal. Silakan coba lagi.')
    },
  })

  if (loading) return <PageLoader />
  if (!user) return <Navigate to="/masuk?next=/toko" replace />

  const data = shopQuery.data
  const userCoins = data?.coins ?? user.coins
  const items = data?.items ?? []

  return (
    <div className="mx-auto max-w-[950px] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[6px] border border-line bg-box p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-accent/15 text-accent">
            <Store className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-[19px] font-black tracking-tight text-heading">Toko Harian</h1>
            <p className="text-[12.5px] text-muted">
              Pilihan 6 border avatar eksklusif yang berganti secara acak setiap hari untuk akunmu.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-[6px] border border-line bg-item px-3 py-1.5 shadow-inner">
            <Clock className="h-4 w-4 text-amber-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Reset Toko</span>
              <span className="font-mono text-[13px] font-black text-heading">
                {formatCountdown(countdown)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-[6px] border border-line bg-item px-3 py-1.5 shadow-inner">
            <Coins className="h-4 w-4 text-[#eab308]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Koin Kamu</span>
              <span className="font-mono text-[13px] font-black text-[#eab308]">
                {userCoins.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="flex items-center gap-2 rounded-[4px] bg-accent px-4 py-2 text-[13px] font-bold text-white shadow-xs"
        >
          <Store className="h-4 w-4" /> Toko Harian
        </button>
        <Link
          to="/gacha"
          className="flex items-center gap-2 rounded-[4px] border border-line bg-box px-4 py-2 text-[13px] font-medium text-sub hover:bg-item hover:text-heading transition"
        >
          <Gift className="h-4 w-4 text-[#a855f7]" /> Mesin Gacha
        </Link>
        <Link
          to="/pengaturan"
          className="flex items-center gap-2 rounded-[4px] border border-line bg-box px-4 py-2 text-[13px] font-medium text-sub hover:bg-item hover:text-heading transition"
        >
          <Sparkles className="h-4 w-4 text-[#38bdf8]" /> Pakai di Profil
        </Link>
      </div>

      {error && (
        <div role="alert" className="rounded-[4px] border border-red-500/30 bg-red-500/15 p-3 text-[13px] font-medium text-red-400">
          {error}
        </div>
      )}

      <Box title="Item Tersedia Hari Ini" as="h2">
        {shopQuery.isLoading ? (
          <PageLoader />
        ) : (
          <div className="p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {items.map((item: ShopItem) => {
                const c = RARITY_COLOR[item.rarity]
                const isLeg = item.rarity === 'legendary'
                const canAfford = userCoins >= item.price
                const isBusy = buy.isPending && buy.variables === item.code

                return (
                  <div
                    key={item.code}
                    className={`relative flex flex-col justify-between rounded-[8px] border-2 bg-item p-4 text-center transition hover:shadow-md ${
                      isLeg ? 'border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.2)]' : ''
                    }`}
                    style={{ borderColor: isLeg ? '#f59e0b' : c.border }}
                  >
                    {isLeg && (
                      <div className="absolute top-2 right-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-2 py-0.5 text-[9.5px] font-black text-black shadow-xs">
                        LEGEND
                      </div>
                    )}

                    <div className="flex flex-col items-center gap-2">
                      <div className="relative my-2">
                        <ItemPreview item={{ code: item.code, slot: item.slot, name: item.name }} />
                      </div>

                      <h3 className="text-[14px] font-bold text-heading line-clamp-1">{item.name}</h3>
                      <RarityTag rarity={item.rarity} />
                      <span className="text-[11px] text-muted">{SLOT_LABEL[item.slot]}</span>
                      <p className="min-h-[38px] text-[11.5px] leading-relaxed text-muted line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 border-t border-line/60 pt-3">
                      <div className="mb-2.5 flex items-center justify-center gap-1.5 font-bold text-[#eab308]">
                        <Coins className="h-4 w-4" />
                        <span className="text-[15px]">{item.price.toLocaleString('id-ID')}</span>
                        <span className="text-[11.5px] font-normal text-muted">koin</span>
                      </div>

                      {item.owned ? (
                        <button
                          type="button"
                          disabled
                          className="flex h-9 w-full items-center justify-center gap-1.5 rounded-[4px] border border-line bg-nav text-[12.5px] font-semibold text-muted opacity-80 cursor-default"
                        >
                          <Check className="h-4 w-4 text-emerald-400" /> Sudah Dimiliki
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={!canAfford || isBusy}
                          onClick={() => buy.mutate(item.code)}
                          className={`flex h-9 w-full items-center justify-center gap-1.5 rounded-[4px] text-[13px] font-bold text-white shadow-xs transition active:scale-[0.98] ${
                            isLeg
                              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110'
                              : 'bg-accent hover:brightness-110'
                          } disabled:cursor-not-allowed disabled:opacity-50`}
                        >
                          <ShoppingBag className="h-4 w-4" />
                          {isBusy ? 'Memproses...' : !canAfford ? 'Koin Tidak Cukup' : 'Beli Sekarang'}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </Box>
    </div>
  )
}
