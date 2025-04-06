<script setup lang="ts">
import type {Article as ArticleDto} from "~/src/shared/api/model";
import Article from '~/src/features/article/ui/article.vue'

const route = useRoute()

type Params = {
  accountName: string;
  articleName: string;
}

// некоректно работают статьи без веток

const params = route.params as Params;

const accountName = params.accountName
const articleName = params.articleName

const { branch } = route.query as {
  branch?: string
};

useHead({
  title: articleName.toString()
})

const { data, error } = await useFetch<ArticleDto>(`/api/account/${accountName}/article/${articleName}`, {
  baseURL: process.server ? 'http://localhost:3000' : window.location.origin,
  headers: {
    'Content-Type': 'application/json'
  }
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message,
    data: error.value.data
  });
}


</script>

<template>
  <div v-if="data" class="flex justify-center h-full">
    <Article 
      :article="data" 
      :branch="branch"
      :key="`${accountName}-${articleName}`"
      />
  </div>
</template>

<style scoped>

</style>