/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_TARGET: string
  readonly VITE_APP_DEV_SERVER_PROXY: string
  readonly VITE_APP_HLJS_LANGUAGES: string
  readonly VITE_APP_PERFORMANCE_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}