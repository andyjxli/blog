import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  base: '/',
  server: {
    port: 6666,
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve('src') },
      { find: /^~/, replacement: '' },
    ],
  },
  build: {
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
