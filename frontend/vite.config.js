import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // Customer portal  →  eagleboxcricket.com  →  serves index.html
        main: resolve(__dirname, 'index.html'),
        // Admin panel      →  admin.eagleboxcricket.com  →  serves admin.html
        admin: resolve(__dirname, 'admin.html'),
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
