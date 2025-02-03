// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
