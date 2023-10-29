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
    layoutTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  alias: {
    '@': resolve(__dirname, './'),
    '@components': resolve(__dirname, './components'),
    '@composables': resolve(__dirname, './composables'),
    '@utils': resolve(__dirname, './utils'),
    '@pages': resolve(__dirname, './pages'),
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
    apiBaseUrl: ''
  },
  experimental: {
    componentIslands: true,
  }
})
  