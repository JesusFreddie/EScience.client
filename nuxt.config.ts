import https from 'https'

export default defineNuxtConfig({
  dir: {
    pages: 'src/pages',
    layouts: 'src/layouts',
  },

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
    '~/plugins/vue-query.ts',
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
    routeRules: {
      // Проксирование для production
      '/api/**': {
        proxy: {
          to: process.env.API_BASE_URL || 'https://localhost:7099/**',
          // Или если API требует полного пути:
          // to: (process.env.API_BASE_URL || 'https://localhost:7099') + '/api/**',
        },
        // Добавляем CORS заголовки если нужно
        cors: true,
        headers: {
          // Важные заголовки для ASP.NET Core
          'X-Forwarded-Proto': 'https',
          'X-Forwarded-Host': process.env.HOST_HEADER || 'localhost:3000'
        },
      }
    },
    // Настройки для разработки
    devProxy: {
      '/api': {
        ws: true,
        target: process.env.API_BASE_URL || 'https://localhost:7099',
        changeOrigin: true,
        secure: false,
        // Для ASP.NET Core HTTPS
        agent: new https.Agent({ rejectUnauthorized: false })
      }
    }
  },

  compatibilityDate: '2025-05-10'
})
