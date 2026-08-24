import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Production deploys to GitHub Pages under https://bkallaus.github.io/quick/,
// so assets need the `/quick/` prefix. Preview deploys are served from the
// root of their own host, where that prefix would 404.
const base = process.env.NODE_ENV === 'preview' ? '/' : '/quick/'

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
