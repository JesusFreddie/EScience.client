<script setup lang="ts">
import type { Article } from '~/src/shared/api/model';
import CardArticle from '~/src/shared/ui/card-article.vue';

const { articles } = defineProps<{
    articles: Article[]
}>()

</script>

<template>
  <div class="flex gap-2 flex-wrap">
    <CardArticle
        v-if="articles"
        v-for="article in articles"
        :id="article.id"
        :article="article"
    />
  </div>
</template>

<style scoped>

</style>