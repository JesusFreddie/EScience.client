<script setup lang="ts">
import ArticleEditorAvatar from './article-editor-avatar.vue';
import ArticleEdit from './form/article-edit.vue';


const { articleId } = defineProps<{
    articleId: string
}>()

</script>

<template>
    <div class="flex">
        <ArticleEdit :article-id="articleId" />
        <div class="p-2">
            <ArticleEditorAvatar :article-id="articleId" />
        </div>
    </div>
</template>