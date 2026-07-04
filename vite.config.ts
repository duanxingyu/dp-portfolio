import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages 项目站: VITE_BASE_PATH=/仓库名/
// 用户站 username.github.io: VITE_BASE_PATH=/
const base = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
