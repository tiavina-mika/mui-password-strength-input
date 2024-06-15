import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    react(),
    tsconfigPaths(),
  ],
})
