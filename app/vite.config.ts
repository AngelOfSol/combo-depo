import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    origin: 'http://localhost:5173',
    cors: {
      origin: 'http://localhost:3000'
    }
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: ["src/main.tsx"],
    },
  },
});
