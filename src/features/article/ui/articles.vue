<script setup lang="ts">
import { useArticleGetAll } from "~/src/shared/api/generate/article";
import ArticlesList from "./articles-list.vue";

const { data, isPending } = useArticleGetAll();

</script>

<template>
  <div class="flex gap-2 flex-wrap">
    <ArticlesList v-if="data" :articles="data" />
    <USkeleton v-if="isPending" v-for="item in 10" :key="item" class="w-[427px] h-[151px]" />
  </div>
</template>

<style scoped>

</style>