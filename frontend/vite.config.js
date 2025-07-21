import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/api': "https://send-files-backend.onrender.com"
    }
  
  },
  base: process.env.VITE_BASE_PATH || "/portfolio-website",
})
