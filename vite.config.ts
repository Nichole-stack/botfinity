import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util'
    }
  },
  build: {
    target: 'es2020',
    minify: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      },
      external: []
    }
  },
  esbuild: {
    target: 'es2020'
  },
  optimizeDeps: {
    include: ['wagmi', 'viem', '@tanstack/react-query']
  }
})
