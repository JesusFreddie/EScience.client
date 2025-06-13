<script setup lang="ts">

import { useArticleGetAllByCreated } from "~/src/shared/api/generate/article";
import ROUTE from "~/src/shared/consts/ROUTE";

const { t } = useI18n()

const { data: articles, isPending } = useArticleGetAllByCreated()

const links = ref([
  {
    label: t('PAGE.ARTICLES'),
    to: ROUTE.HOME
  }
])

watch(() => articles.value, () => {
  if (!articles.value) return
  
  links.value = [
    [{
      label: t('PAGE.ARTICLES'),
      to: ROUTE.HOME
    }],
    [...articles.value.map((article) => ({
      label: article.title,
      to: `/${article.account?.name || ''}/${article.title}`
    }))]
  ]
}, { immediate: true })

</script>

<template>
  <UVerticalNavigation class="py-4 px-3 gap-0.5 bg-bg-100 dark:bg-bg-dark-200 h-full rounded-md sticky shadow"
    :links="links">
    <template #default="{ link }">
      <span class="text-text-500 dark:text-text-dark-500 relative h-10 flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
        {{ link.label }}
      </span>
    </template>
  </UVerticalNavigation>
</template>

<style scoped></style>