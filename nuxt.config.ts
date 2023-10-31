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
  }
})
  