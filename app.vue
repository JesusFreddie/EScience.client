<template>
  <div class="h-full">
    <NuxtLayout>
      <NuxtLoadingIndicator/>
        <NuxtPage/>
      <UNotifications/>
    </NuxtLayout>
  </div>
</template>

<style scoped>

*, *::before, *::after {
  font-family: "Monserrat", sans-serif;
}

</style>
<script setup lang="ts">

import {useTheme} from "~/src/shared/composable/useTheme";

const { toggle, theme, setTheme } = useTheme()

// useMounted(() => {
//   if (!theme.value) {
//     theme.value = 'light';
//     document.documentElement.classList.remove('dark');
//   }
// })

useHead({
  htmlAttrs: {
    class: setTheme(theme.value === 'dark' ? 'dark' : 'light')
  }
})

</script>