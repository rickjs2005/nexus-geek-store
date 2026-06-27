import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // libera preview por túnel (ex.: Cloudflare) p/ testar/gravar no celular
    allowedHosts: ['.trycloudflare.com'],
  },
})
