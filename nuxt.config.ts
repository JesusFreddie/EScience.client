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
  plugins: [
      '~/plugins/theme.client.ts',
  ],
  fonts: {
    families: [
      { name: "montserrat", provider: "google" }
    ]
  },
  css: [
      '~/assets/css/tailwind.css',
      '~/assets/css/tiptap.css',
  ],
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
  },
  nitro: {
    devProxy: {
      '/api' : {
        target: 'https://localhost:7099/',
        changeOrigin: true,
        secure: false,
      }
    },
    routeRules: {
      '/api/**' : {
        proxy: 'https://localhost:7099/**',
        headers: {
            'X-Forwarded-Proto': 'https',
            'X-Forwarded-Host': 'localhost:3000'
        },
        
      }
    }
  }
})