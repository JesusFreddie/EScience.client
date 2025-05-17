<script setup lang="ts">
import { useTheme } from '~/src/shared/composable/useTheme';

const { t, locale, locales } = useI18n();
const { theme, toggle: toggleTheme, setTheme } = useTheme();

const availableLocales = computed(() => {
  return (locales.value || []).map(l => {
    return { code: l.code, name: l.name }
  });
});

const switchLocale = (localeCode: string) => {
  locale.value = localeCode;
};

// SVG representations of light and dark themes
const lightThemeImage = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60" viewBox="0 0 100 60">
  <rect width="100" height="60" fill="#f8fafc" />
  <rect x="10" y="10" width="80" height="10" fill="#e2e8f0" />
  <rect x="10" y="25" width="80" height="25" fill="#f1f5f9" />
</svg>
`;

const darkThemeImage = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60" viewBox="0 0 100 60">
  <rect width="100" height="60" fill="#1e293b" />
  <rect x="10" y="10" width="80" height="10" fill="#334155" />
  <rect x="10" y="25" width="80" height="25" fill="#475569" />
</svg>
`;
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">{{ t('SETTINGS') }}</h2>

    <!-- Theme Switcher -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">{{ t('THEME') }}</h3>
      <div class="flex items-center gap-4">
        <div 
          class="theme-image-container cursor-pointer" 
          :class="{ 'theme-selected': theme === 'light' }"
          @click="setTheme('light')"
          v-html="lightThemeImage"
        ></div>
        <div 
          class="theme-image-container cursor-pointer" 
          :class="{ 'theme-selected': theme === 'dark' }"
          @click="setTheme('dark')"
          v-html="darkThemeImage"
        ></div>
      </div>
    </div>

    <!-- Language Switcher -->
    <div>
      <h3 class="text-lg font-semibold mb-2">{{ t('LANGUAGE') }}</h3>
      <div class="flex items-center gap-4">
        <UButton 
          v-for="l in availableLocales" 
          :key="l.code"
          :variant="locale === l.code ? 'solid' : 'outline'"
          @click="switchLocale(l.code)"
        >
          {{ l.name }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-image-container {
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.theme-image-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.theme-selected {
  border-color: #3b82f6; /* Blue border for selected theme */
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.theme-image-container svg {
  width: 120px;
  height: 72px;
}
</style>
