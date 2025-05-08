<script setup lang="ts">
import ArticleEditorAvatar from './article-editor-avatar.vue';
import ArticleEdit from './form/article-edit.vue';


const { articleId } = defineProps<{
  articleId: string
}>()

</script>

<template>
  <UCard class="flex flex-col flex-1 border-red"
    :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', }">
    <template #header>
      <h2>{{ $t('ARTICLE.EDIT') }}</h2>
    </template>

    <div class="flex gap-4">
      <ArticleEdit :article-id="articleId" />
      <UDivider orientation="vertical" />
      <div class="p-2">
        <div>
          <p class="pb-2">{{ $t('PARTICIPANTS.MANY') }}</p>
          <ArticleEditorAvatar :article-id="articleId" />
        </div>
      </div>
    </div>
  </UCard>
</template>