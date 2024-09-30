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

declare module 'vue' {
  import { CompatVue } from '@vue/runtime-dom';
  const Vue: CompatVue;
  export default Vue;
  export * from '@vue/runtime-dom';
  const { configureCompat } = Vue;
  export { configureCompat };
}
