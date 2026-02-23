import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import HomePage        from './pages/HomePage'
import QuranListPage   from './pages/QuranListPage'
import SurahDetailPage from './pages/SurahDetailPage'
import BookmarksPage   from './pages/BookmarksPage'
import SearchPage      from './pages/SearchPage'

export default function App() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Ambient background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(120,53,15,0.12), transparent)',
        }}
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative z-10">
        <Routes>
          <Route path="/"           element={<HomePage />}        />
          <Route path="/quran"      element={<QuranListPage />}   />
          <Route path="/quran/:surahNo" element={<SurahDetailPage />} />
          <Route path="/bookmarks"  element={<BookmarksPage />}   />
          <Route path="/search"     element={<SearchPage />}      />
          <Route path="*"           element={<HomePage />}        />
        </Routes>
      </main>
    </div>
  )
}
