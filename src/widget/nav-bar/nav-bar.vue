<script setup lang="ts">

import ROUTE from "~/src/shared/consts/ROUTE";

const { t } = useI18n()

const links =  [
  {
    label: t('PAGE.ARTICLES'),
    to: ROUTE.HOME
  },
]

</script>

<template>
  <UVerticalNavigation
      class="py-4 px-3 gap-0.5 bg-bg-100 dark:bg-bg-dark-200 h-full rounded-md sticky shadow"
      :links="links" >
    <template #default="{ link }">
        <span class="text-text-500 dark:text-text-dark-500 relative h-10 flex items-center">
          {{ link.label }}
        </span>
    </template>
  </UVerticalNavigation>
</template>

<style scoped>

</style>