import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import banner from 'vite-plugin-banner';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { fileURLToPath } from 'node:url';
import LICENSE_HEADER from './src/setup-utils/license-header-built-files';

const target = process.env.VITE_APP_TARGET || '';
const buildTarget = ['ide', 'default'].includes(target) ? target : 'default';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('custom-'),
          compatConfig: {
            MODE: 2,
          },
        },
      },
    }),
    banner(LICENSE_HEADER),
    ViteEjsPlugin(),
    nodePolyfills({
      globals: { global: true, process: true },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'docc-render': fileURLToPath(new URL('./src', import.meta.url)),
      theme: fileURLToPath(new URL('./src', import.meta.url)),
      vue: '@vue/compat'
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `$build-target: '${buildTarget}'; $is-target-ide: $build-target == 'ide';`,
      },
    },
    postcss: {
      plugins: [
        autoprefixer({}),
      ],
    },
  },
  assetsInclude: ['**/*.ejs'],
  build: {
    cssCodeSplit: process.env.NODE_ENV === 'production',
    sourcemap: false,
    rollupOptions: {
      external: ['fsevents'],
    },
  },
}));
