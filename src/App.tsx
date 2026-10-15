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
        {/* /{slug}-episode-{n}; unmatched paths render NotFound inside Watch. */}
        <Route path=":watchSlug" element={<Watch />} />
        <Route path="*" element={<Watch />} />
      </Route>
    </Routes>
  )
}
