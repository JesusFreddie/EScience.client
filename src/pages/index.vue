<script setup lang="ts">
import ArticlesList from "~/src/features/article/ui/articles.vue";
const { t } = useI18n()

definePageMeta({
  middleware: 'session-middleware'
})

useHead({
  title: t('PAGE.ARTICLES')
})
</script>

<template>
  
  <ArticlesList/>
</template>