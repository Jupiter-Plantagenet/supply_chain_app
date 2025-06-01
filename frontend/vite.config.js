import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
// Ensure dependencies are pre-bundled
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react-router-dom',
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
      '@chakra-ui/system',
      '@chakra-ui/utils',
      '@chakra-ui/icons'
    ]
  },
  resolve: {
    alias: {
      '@artifacts': path.resolve(__dirname, '../artifacts')
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
})
