// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { "http-equiv": "X-UA-Compatible", content: 'IE=edge' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1.0,viewport-fit=cover' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'mask-icon', href: '/favicon.svg', color: '#333333' },
      ],
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/test-utils/module',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
  ],
  ssr: false,
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US' },
      { code: 'ja', language: 'ja-JP' },
      { code: 'ko', language: 'ko-KR' },
      { code: 'zh', language: 'zh-CN' },
    ],
    defaultLocale: 'en',
  },
})
