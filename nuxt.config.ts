import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@sidebase/nuxt-session'],
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
      ],
      viewport: 'width=device-width, initial-scale=1',

      // Polyfill css anchor
      script: [
        { src: './polyfill.js'}
      ]
    },
  },
  alias: {
    '@': resolve(__dirname, './'),
    '@components': resolve(__dirname, './components'),
    '@composables': resolve(__dirname, './composables'),
    '@utils': resolve(__dirname, './utils'),
    '@pages': resolve(__dirname, './pages'),
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
  session: {
    api: {
      methods: ['get']
    }
  },
  runtimeConfig: {
    apiBaseUrl: 'http://192.168.10.147:8080'
  },
  experimental: {
    componentIslands: true,
  },
  router: {
    options: {
      linkActiveClass: 'link-active',
      linkExactActiveClass: 'link-exact-active',
    }
  }
})
  