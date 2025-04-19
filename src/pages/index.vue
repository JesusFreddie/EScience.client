<script setup lang="ts">
import ArticlesList from "~/src/features/article/ui/articles-list.vue";
const { t } = useI18n()
const isOpen = ref(false)

useHead({
  title: t('PAGE.ARTICLES')
})
</script>

<template>
  <h1 class="mb-3">{{ $t("ARTICLE.ARTICLES") }}</h1>

  <UButton label="Open" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <div class="p-4">
        <Placeholder class="h-48" />
      </div>
    </UModal>

  <ArticlesList/>
</template>