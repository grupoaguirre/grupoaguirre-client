// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'
import sitemap from '@astrojs/sitemap'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://xpertice.pe',
  output: 'server',
  adapter: vercel(),
  integrations: [sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        // Proxy para API local y evitar CORS en desarrollo
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  },
})
