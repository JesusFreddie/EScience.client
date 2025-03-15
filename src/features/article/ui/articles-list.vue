<script setup lang="ts">
import {useGetArticles} from "~/src/shared/api/generate/article";
import CardArticle from "~/src/shared/ui/card-article.vue";

const { data: articles, isPending } = useGetArticles();

</script>

<template>
  <div class="flex gap-2 flex-wrap">
    <CardArticle
        v-if="articles"
        v-for="article in articles"
        :id="article.id"
        :article="article"
    />
    <USkeleton v-if="isPending" v-for="item in 10" :key="item" class="w-[427px] h-[151px]" />
  </div>
</template>

<style scoped>

</style>