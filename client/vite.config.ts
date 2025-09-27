// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist', // Ensure the build output is directed to the 'dist' directory
    rollupOptions: {
      output: {
        manualChunks: undefined, // Optional: Adjust chunking if needed
      },
    },
  },
});
