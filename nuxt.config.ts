// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@sidebase/nuxt-session'],
  session: {
    api: {
      methods: ['get']
    }
  },
})
  