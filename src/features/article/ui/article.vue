<script setup lang="ts">
import type {ArticleDto} from "~/src/shared/api/model";

const { article } = defineProps<{
  article: ArticleDto
}>()

const items = ['Backlog', 'Todo', 'In Progress', 'Done']
const value = 'Backlog'
</script>

<template>
  <div class="flex flex-col gap-3 w-[1260px] h-full">
    <div class="bg-bg-100 rounded-md px-5 py-4">
      <h4>{{ article.title }}</h4>
    </div>
    <div class="grid grid-cols-[1fr_239px] gap-3 h-full">
      <div class="flex flex-col gap-3">
        <div class="bg-bg-100 rounded-md px-5 py-3">
          <USelect v-model="value" :items="['asd', 'www']" class="w-48" />
        </div>
        <div class="bg-bg-100 rounded-md h-full px-5 py-3">
          TEXT
        </div>
      </div>
      <div class="bg-bg-100 rounded-md h-full pt-5 px-4">
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