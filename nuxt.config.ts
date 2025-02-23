export default defineNuxtConfig({
  dir: {
    pages: 'src/pages',
    layouts: 'src/layouts',
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-typed-router',
    '@vee-validate/nuxt',
  ],
  fonts: {
    families: [
      { name: "montserrat", provider: "google" }
    ]
  },
  css: ['~/assets/css/tailwind.css'],
  tailwindcss: {
    configPath: '~/tailwind.config.js',
  },
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'ru',
        name: 'Русский',
        file: 'ru.json',
      },
    ],
    lazy: true,
    langDir: '../locales',
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  }
})