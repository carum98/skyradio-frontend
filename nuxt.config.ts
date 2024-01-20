import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  app: {
    rootId: 'app',
    rootTag: 'section',
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    head: {
      title: 'SkyRadio',
      meta: [
        { charset: 'utf-8' },
        { name: 'supported-color-schemes', content: 'light dark' },
        { name: 'color-scheme', content: 'dark light' },
        { name: 'theme-color', content: '' },
      ],
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'es',
        class: 'dark',
      },
    },
  },
  alias: {
    '@': resolve(__dirname, './'),
    '@components': resolve(__dirname, './components'),
    '@composables': resolve(__dirname, './composables'),
    '@utils': resolve(__dirname, './utils'),
    '@pages': resolve(__dirname, './pages'),
    '@views': resolve(__dirname, './views'),
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      }
    }
  },
  css: [
    '@/assets/css/main.css',
  ],
  runtimeConfig: {
    apiBaseUrl: ''
  },
  experimental: {
    componentIslands: true,
  },
  router: {
    options: {
      linkActiveClass: 'link-active',
      linkExactActiveClass: 'link-exact-active',
    }
  },
  routeRules: {
    '/': { redirect: '/clients' },
    '/login': { prerender: true },
    '/settings': { redirect: '/settings/modalities' },
    '/reports': { prerender: true },
    '/api/**': { cors: true },
  }
})