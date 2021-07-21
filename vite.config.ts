import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import mdPlugin, { Mode } from 'vite-plugin-markdown';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), mdPlugin({ mode: [Mode.REACT] })],
  base: '/',
  server: {
    port: 7777,
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
