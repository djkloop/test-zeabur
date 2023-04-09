// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // 私钥
    privateKey: process.env.PRIVATE_KEY,
    privateId: process.env.PRIVATE_ID,
  },
  modules: [
    'tdesign-vue-next/es/nuxt',
    '@unocss/nuxt',
    'nuxt-icon',
    '@vue-macros/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  build: {
    transpile: [/tdesign-vue-next\/es\/.*\.mjs/],
  },
  unocss: {
    uno: true,
    attributify: true,
    icons: true,
    components: false,
  },
  typescript: {
    tsConfig: {
      include: ['node_modules/tdesign-vue-next/global.d.ts'],
    },
  },
})
