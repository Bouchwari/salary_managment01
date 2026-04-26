import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Capacitor needs a relative base path
  base: './',
  build: {
    outDir: 'dist',
  },
});
