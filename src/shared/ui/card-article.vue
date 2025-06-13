<script setup lang="ts">
import type {Article} from "~/src/shared/api/model";
definePageMeta({

})

const { article } = defineProps<{
  article: Article
}>()

const emit = defineEmits<{
  (e: "setFavorite", id: string): void
  (e: "removeFavorite", id: string): void
}>()

function setFavorite(id: string) {
  if (id) {
    emit("setFavorite", id)
  }
}

function removeFavorite(id: string) {
  if (id) {
    emit("removeFavorite", id)
  }
}

const linkTo = `/${article.account?.name || ''}/${article.title}`;

</script>

<template>
  <div class="relative">
    <NuxtLink :to="linkTo">
      <div class="flex flex-col gap-2 rounded-md bg-bg-100 dark:bg-bg-dark-200 p-4 w-[427px] h-[151px] dark:hover:bg-bg-dark-150 shadow z-0">
        <h4 class="font-semibold text-ellipsis overflow-hidden">{{ article.title }}</h4>
        <p class="text-white-400 text-ellipsis overflow-hidden line-clamp-3">{{ article.description }}</p>
      </div>
    </NuxtLink>
    <!-- <button 
      @click.stop="article.id && setFavorite(article.id)"
      class="absolute top-2 right-2 p-2 rounded-full hover:bg-bg-200 dark:hover:bg-bg-dark-300 transition-colors"
      title="Добавить в избранное"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button> -->
  </div>
</template>

<style scoped>

</style>