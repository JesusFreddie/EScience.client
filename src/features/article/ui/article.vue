<script setup lang="ts">
import {useGetArticlesArticleId} from "~/src/shared/api/generate/article";

const { id } = defineProps<{
  id: string
}>()
const { data, isPending } = useGetArticlesArticleId()

</script>
  <h4>{{}}</h4>
<template>

</template>

<style scoped>

</style>