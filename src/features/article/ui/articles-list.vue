<script setup lang="ts">
import type { Article } from '~/src/shared/api/model';
import CardArticle from '~/src/shared/ui/card-article.vue';

const { articles } = defineProps<{
    articles: Article[]
}>()

const emit = defineEmits<{
  (e: "setFavorite", id: string): void
  (e: "removeFavorite", id: string): void
}>()

function setFavorite(id: string) {
  emit("setFavorite", id)
}

function removeFavorite(id: string) {
  emit("removeFavorite", id)
}

</script>

<template>
  <div class="flex gap-2 flex-wrap">
    <CardArticle
        v-if="articles"
        v-for="article in articles"
        :id="article.id"
        :article="article"
        @removeFavorite="removeFavorite"
        @setFavorite="setFavorite"
    />
  </div>
</template>

<style scoped>

</style>