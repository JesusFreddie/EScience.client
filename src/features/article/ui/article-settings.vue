<script setup lang="ts">

const { articleId } = defineProps<{
    articleId: string
}>()

</script>

<template>
    Article = {{ articleId }}
</template>