<script setup lang="ts">
import type {Article as ArticleData} from "~/src/shared/api/model";
import Article from '~/src/features/article/ui/article.vue'

const route = useRoute()
const accountName = route.params.accountName
const articleName = route.params.articleName

useHead({
  title: articleName
})

const { data, error } = await useFetch<ArticleData>(`/api/account/${accountName}/article/${articleName}`, {
  baseURL: process.server ? 'http://localhost:3000' : window.location.origin,
  headers: {
    'Content-Type': 'application/json'
  }
})

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Account not found"
  });
}

</script>

<template>
  <div class="flex justify-center h-full">
    <Article :article="data" />
  </div>
</template>

<style scoped>

</style>