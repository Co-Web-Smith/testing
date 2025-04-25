import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    tailwindcss(),

  ],
  resolve: {
    alias: {
      'simple-peer': 'simple-peer/simplepeer.min.js',
    },
  },
  optimizeDeps: {
    include: ['simple-peer'],
  },
  build: {
    commonjsOptions: {
      include: [/simple-peer/, /node_modules/],
    },
  },
  
});