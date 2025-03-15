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
    <div class="flex flex-col gap-2 rounded-md bg-bg-100 p-4 w-[427px] h-[151px] hover:bg-gray-900">
      <h4 class="font-semibold">{{ article.title }}</h4>
      <p class="text-white-400">{{ article.description }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>

</style>