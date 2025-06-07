<script setup lang="ts">

import ArticleCreate from "~/src/features/article/ui/form/article-create.vue";

definePageMeta({
  middleware: 'session-middleware'
})
</script>

<template>
<ArticleCreate/>
</template>

<style scoped>

</style>