# কুরআন শরীফ | Al-Quran Bangla App

A beautiful, full-featured Quran reading app in Bengali built with **React 19**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Features

- 📖 **All 114 Surahs** with Bengali translations
- 🎧 **5 Reciters** — full chapter + individual verse audio
- 🔍 **Live search** by name, Arabic, or surah number
- 🔖 **Bookmarks** — saved to localStorage
- ⏱️ **Last Read** — remembers where you left off
- 📱 **Responsive** — mobile bottom nav + desktop top nav
- 🌙 **Islamic aesthetic** — dark gold theme, Arabic typography
- ▶️ **Chapter Player** — sticky audio bar with seek + volume

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🛠 Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| React | 19 | UI framework |
| React DOM | 19 | DOM rendering |
| React Router DOM | 7 | Client-side routing |
| Framer Motion | 11 | Animations |
| Lucide React | 0.469 | Icons |
| clsx | 2 | Class merging |
| tailwind-merge | 2 | Tailwind class conflict resolution |
| Vite | 6 | Build tool |
| Tailwind CSS | 3 | Styling |
| PostCSS | 8 | CSS processing |
| Autoprefixer | 10 | CSS vendor prefixes |

## 📁 Project Structure

```
src/
├── components/
│   ├── AudioPlayer.jsx   # Mini + full chapter audio player
│   ├── Decorative.jsx    # Islamic ornaments, hex badges, glows
│   ├── Navbar.jsx        # Top nav (desktop) + bottom nav (mobile)
│   ├── ReciterSelector.jsx
│   ├── SurahCard.jsx     # Surah list item
│   ├── UI.jsx            # Reusable UI components
│   └── VerseCard.jsx     # Individual verse display
├── hooks/
│   └── index.js          # useQuranList, useSurahDetail, useAudioPlayer, useBookmarks, useLastRead
├── pages/
│   ├── HomePage.jsx
│   ├── QuranListPage.jsx
│   ├── SurahDetailPage.jsx
│   ├── BookmarksPage.jsx
│   └── SearchPage.jsx
├── utils/
│   ├── cn.js             # clsx + tailwind-merge helper
│   └── constants.js      # API URL, reciters, data
├── App.jsx               # Routes
├── index.css             # Tailwind + global styles
└── main.jsx              # Entry point
```

## 🌐 API

Data from: `https://quranapi.pages.dev/api/`
- Surah list: `GET /bengali.json`
- Surah detail: `GET /{surahNo}.json`

## 🎨 Fonts

- **Amiri** — Arabic text
- **Noto Serif Bengali** — Bengali translation
- **Cinzel** — Display / UI headings
