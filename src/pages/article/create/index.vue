<script setup lang="ts">
import ArticleCreate from "~/src/features/article/ui/form/article-create.vue";
import { useRouter } from 'vue-router';

const router = useRouter();

definePageMeta({
  middleware: 'session-middleware'
})

function handleSuccess() {
  router.push('/article');
}
</script>

<template>
  <ArticleCreate @success="handleSuccess"/>
</template>

<style scoped>

</style>