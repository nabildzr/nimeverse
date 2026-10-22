import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'

// Home ships in the main bundle; other pages load on demand.
const Series = lazy(() => import('./pages/Series'))
const Watch = lazy(() => import('./pages/Watch'))
const AnimeList = lazy(() => import('./pages/AnimeList'))
const AZList = lazy(() => import('./pages/AZList'))
const Schedule = lazy(() => import('./pages/Schedule'))
const Genres = lazy(() => import('./pages/Genres'))
const Login = lazy(() => import('./pages/Login'))
const Settings = lazy(() => import('./pages/Settings'))
const Premium = lazy(() => import('./pages/Premium'))
const Profile = lazy(() => import('./pages/Profile'))
const Watchlist = lazy(() => import('./pages/Watchlist'))
const Badges = lazy(() => import('./pages/Badges'))
const Leaderboard = lazy(() => import('./pages/Leaderboard'))
const Communities = lazy(() => import('./pages/Communities'))
const Community = lazy(() => import('./pages/Community'))
const PostPage = lazy(() => import('./pages/PostPage'))
const Gacha = lazy(() => import('./pages/Gacha'))
const Shop = lazy(() => import('./pages/Shop'))
const Quests = lazy(() => import('./pages/Quests'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="page/:page" element={<Home />} />
        <Route path="series/:slug" element={<Series />} />
        <Route path="anime" element={<AnimeList mode="list" />} />
        <Route path="search" element={<AnimeList mode="search" />} />
        <Route path="genres" element={<Genres />} />
        <Route path="genres/:slug" element={<AnimeList mode="genre" />} />
        <Route path="az-list" element={<AZList />} />
        <Route path="jadwal" element={<Schedule />} />
        <Route path="masuk" element={<Login />} />
        <Route path="pengaturan" element={<Settings />} />
        <Route path="premium" element={<Premium />} />
        <Route path="profil/:name" element={<Profile />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="lencana" element={<Badges />} />
        <Route path="peringkat" element={<Leaderboard />} />
        <Route path="gacha" element={<Gacha />} />
        <Route path="toko" element={<Shop />} />
        <Route path="misi" element={<Quests />} />
        <Route path="komunitas" element={<Communities />} />
        <Route path="komunitas/post/:id" element={<PostPage />} />
        <Route path="komunitas/:slug" element={<Community />} />
        {/* /{slug}-episode-{n}; unmatched paths render NotFound inside Watch. */}
        <Route path=":watchSlug" element={<Watch />} />
        <Route path="*" element={<Watch />} />
      </Route>
    </Routes>
  )
}
