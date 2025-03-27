<script setup lang="ts">
import type {Article} from "~/src/shared/api/model";
import Editor from "~/src/shared/ui/editor/editor.vue";

const { article } = defineProps<{
  article: Article
}>()

const items = ['Backlog', 'Todo', 'In Progress', 'Done']
const value = 'Backlog'
</script>

<template>
  <div class="flex flex-col gap-3 w-[1260px] h-full">
    <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md px-5 py-4 shadow">
      <h4>{{ article.title }}</h4>
    </div>
    <div class="grid grid-cols-[1fr_239px] gap-3 h-full">
      <div class="flex flex-col gap-3">
        <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md px-5 py-3 shadow">
          <USelect v-model="value" :items="['asd', 'www']" class="w-48" />
        </div>
        <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md h-full px-5 py-3 shadow">
          <Editor/>
        </div>
      </div>
      <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md h-full pt-5 px-4 shadow">
        <div>
          <p>{{ $t('DESCRIPTION') }}</p>
          <p>{{ article.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>