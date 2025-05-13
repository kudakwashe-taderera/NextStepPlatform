import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: {
      clientPort: 443,
    },
    cors: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
  // Explicitly allow the specified host
  define: {
    // Add global variables to client-side code
    __ALLOWED_HOST__: JSON.stringify('a8ac7d31-88ba-4790-868c-d25f1f6a126a-00-1x49w3a1671yv.kirk.replit.dev'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});