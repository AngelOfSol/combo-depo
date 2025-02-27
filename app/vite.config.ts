import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    origin: 'http://localhost:5173',
    cors: {
      origin: 'http://localhost:3000'
    }
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: ["index.html"],
    },
  },
});
