import { Link } from 'react-router-dom'
import { Check, Crown, Flame, Image, Palette, Sparkles } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { Box } from '../components/Box'
import { useTitle } from '../lib/useTitle'

const PERKS = [
  { icon: Image, title: 'Foto profil GIF', text: 'Pakai GIF animasi (sampai 2 MB) sebagai foto profil.' },
  { icon: Image, title: 'Banner GIF', text: 'Banner profil animasi (sampai 3 MB) yang terlihat oleh semua pengunjung profilmu.' },
  { icon: Sparkles, title: 'Aksesoris eksklusif', text: 'Bingkai Halo Emas dan Pelangi, plus efek banner Aurora, tanpa perlu menunggu level.' },
  { icon: Flame, title: '3 perlindungan streak per bulan', text: 'Akun biasa mendapat 1. Satu hari terlewat tidak memutus streak-mu.' },
  { icon: Palette, title: 'Warna aksen', text: 'Pilih warna untuk nama dan bingkai fotomu di komentar dan profil.' },
  { icon: Crown, title: 'Mahkota Premium', text: 'Tanda mahkota di samping namamu di komentar, komunitas, dan papan peringkat.' },
]

export default function Premium() {
  useTitle('Premium')
  const { user } = useAuth()
  const until = user?.premiumUntil ? new Date(user.premiumUntil) : null

  return (
    <div className="mx-auto max-w-[680px]">
      <Box title="AniVerse Premium" as="h1">
        <div className="p-[18px]">
          {user?.premium ? (
            <p role="status" className="mb-4 rounded-[3px] bg-sub/15 px-4 py-3 text-[13.5px]">
              <Crown className="mr-1.5 inline h-4 w-4 text-sub" aria-hidden="true" />
              Premium aktif{until ? ` sampai ${until.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` : ''}.
            </p>
          ) : (
            <p className="mb-4 text-[14px] leading-[1.7]">
              Premium memberi kenyamanan tambahan untuk akunmu. Tidak ada fitur nonton yang dikunci: semua orang tetap bisa menonton, berkomentar, dan naik level.
            </p>
          )}
          <ul className="flex flex-col gap-3">
            {PERKS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-item text-sub">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <div className="flex items-center gap-1.5 text-[14px] font-semibold text-heading">
                    {title} {user?.premium && <Check className="h-4 w-4 text-[#2ecc71]" aria-label="Aktif" role="img" />}
                  </div>
                  <div className="text-[13px] text-muted">{text}</div>
                </div>
              </li>
            ))}
          </ul>
          {!user?.premium && (
            <div className="mt-5 rounded-[3px] bg-item px-4 py-3 text-[13px] leading-6">
              Pembayaran online belum tersedia. Premium saat ini diberikan oleh admin, misalnya untuk kontributor dan anggota aktif komunitas.
              {!user && (
                <>
                  {' '}
                  <Link to="/masuk" className="font-semibold text-accent hover:underline">
                    Masuk
                  </Link>{' '}
                  untuk mulai.
                </>
              )}
            </div>
          )}
        </div>
      </Box>
    </div>
  )
}
