import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import mdPlugin, { Mode } from 'vite-plugin-markdown';
import hljs from 'highlight.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    mdPlugin({
      mode: [Mode.HTML],
      markdownIt: {
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre class="hljs"><code>' +
                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                '</code></pre>'
              );
            } catch (__) {}
          }

          return str;
        },
      },
    }),
  ],
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
