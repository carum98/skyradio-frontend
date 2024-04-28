import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  ignore: [
    'pages/*/*.dialog.vue'
  ],
  app: {
    rootId: 'app',
    rootTag: 'section',
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    viewTransition: true,
    head: {
      title: 'SkyRadio',
      meta: [
        { charset: 'utf-8' },
        { name: 'supported-color-schemes', content: 'light dark' },
        { name: 'color-scheme', content: 'dark light' },
        { name: 'theme-color', content: '' },
        { property: 'og:description', content: 'SkyRadio - Control radios SkyData' },
        { property: 'og:title', content: 'SkyRadio' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://skyradio.skydatacontrol.com' },
        { property: 'og:image', content: '/banner.webp' },
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
        propsDestructure: true,
        globalTypeFiles: [
          './types'
        ]
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
    viewTransition: true,
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
    '/api/**': { 
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': 'https://skyradio.skydatacontrol.com',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      }
    },
  }
})