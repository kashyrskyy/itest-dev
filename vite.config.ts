import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/itest-dev/',
  optimizeDeps: {
    include: ['xlsx'], // Ensure xlsx is pre-bundled
  },
})
