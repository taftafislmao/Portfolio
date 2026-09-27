import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Fixed port so the dev URL never changes. strictPort makes Vite fail
    // loudly instead of silently drifting to the next free port.
    port: 5183,
    strictPort: true,
    open: false,
  },
  preview: {
    port: 5183,
    strictPort: true,
  },
})
