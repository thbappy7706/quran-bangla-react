import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'quran-bangla' with your actual GitHub repository name if it differs.
export default defineConfig({
  plugins: [react()],
  base: '/quran-bangla/',
})
