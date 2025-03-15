<script setup lang="ts">
import type {ArticleDto} from "~/src/shared/api/model";
import Article from "~/src/features/article/ui/article.vue";
const route = useRoute()
const id = ref(route.params.id);

const { data, status, error } = await useAsyncData<ArticleDto>(
    'article:' + id,
    () => $fetch<ArticleDto>(`/api/articles/${id.value}`)
)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Article not found"
  });
}

const articleDto = data.value as ArticleDto;

if (status.value !== 'success' && !article) {
}
</script>

<template>
  <div class="flex justify-center h-full">
    <Article :article="articleDto" />
  </div>
</template>

<style scoped>

</style>