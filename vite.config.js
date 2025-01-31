import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/limbusdle/',
  server: {
    https: false, 
    host: "0.0.0.0",
    port: 8081,
    secure: false,
    strictPort: true,
    hmr: {
      port: 8081,
      host: "localhost",
    }, 
  },
})
