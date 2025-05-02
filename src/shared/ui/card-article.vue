<script setup lang="ts">
import type {Article} from "~/src/shared/api/model";
definePageMeta({

})

const { article } = defineProps<{
  article: Article
}>()

const linkTo = `/${article.account.name}/${article.title}`;

</script>

<template>
  <NuxtLink :to="linkTo">
    <div class="flex flex-col gap-2 rounded-md bg-bg-100 dark:bg-bg-dark-200 p-4 w-[427px] h-[151px] dark:hover:bg-bg-dark-150 shadow z-0">
      <h4 class="font-semibold text-ellipsis overflow-hidden">{{ article.title }}</h4>
      <p class="text-white-400 text-ellipsis overflow-hidden line-clamp-3">{{ article.description }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>

</style>