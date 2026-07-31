import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // hls.js is loaded on demand for video playback and is ~508 kB minified.
    chunkSizeWarningLimit: 600,
  },
});
