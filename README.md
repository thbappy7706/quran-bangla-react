# কুরআন শরীফ | Al-Quran Bangla App

A beautiful, full-featured Quran reading app in Bengali built with **React 19**, **Vite**, **Tailwind CSS**, and **Framer Motion**. It is also a Progressive Web App (PWA) — installable and offline-capable via a web manifest and service worker.

## ✨ Features

- 📖 **All 114 Surahs** with Bengali translations
- 🎧 **5 Reciters** — full chapter + individual verse audio
- 🔍 **Live search** by name, Arabic, or surah number
- 🔖 **Bookmarks** — saved to localStorage
- ⏱️ **Last Read** — remembers where you left off
- 📱 **Responsive** — mobile bottom nav + desktop top nav
- 🌙 **Islamic aesthetic** — dark gold theme, Arabic typography
- ▶️ **Chapter Player** — sticky audio bar with seek + volume
- 🛠️ **PWA (Installable)** — offline-capable, web manifest, service worker registration, and an update prompt component

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

## ⚡ Progressive Web App (PWA)

This app includes Progressive Web App support so users can install the app and get a more native-like experience.

- Installable: Add the app to your home screen (mobile) or install on desktop when prompted.
- Offline support: Cached static assets and basic data caching allow reading the app when offline or with flaky connections.
- Update prompt: A dedicated UI component notifies users when a new version is available and lets them reload to update.

How to test the PWA features locally:

1. Build and preview the production bundle:

```bash
npm run build
npm run preview
```

2. Open the preview URL in Chrome/Edge, then open DevTools → Application to inspect the Web App Manifest and Service Worker.
3. Run Lighthouse (Audits) to verify PWA best practices and offline capability.
4. On mobile, open the site in the browser and use the Add to Home screen prompt (or the browser menu) to install.

Relevant files/locations in this repo:

- public/ — app icons used by the web manifest
- src/main.jsx — service worker / PWA registration occurs here
- src/components/PWAUpdatePrompt.jsx — UI that prompts users when an update is available
