<script setup lang="ts">
import type {Article} from "~/src/shared/api/model";
import Editor from "~/src/shared/ui/editor/editor.vue";
import { useVersionSave } from "../model/use-version-save";
import { useErrorToast } from "~/src/shared/composable/useErrorToast";
import { AxiosError } from "axios";
import { useBranchGet, useBranchGetAll } from "~/src/shared/api/generate/article-branch";
import { useVersionGetLast } from "~/src/shared/api/generate/article-version";

const { article, branch } = defineProps<{
  article: Article,
  branch?: string,
}>()

const value = ref(
  article?.articleBranches?.[0]?.name || 'main' 
);
const saveTimeout = ref<NodeJS.Timeout>()
const editorContent = ref("")

if (!article.articleBranches || !article.articleBranches[0].id) {
  console.error('No branches available');
}

const { data, isPending: isLoadingVer } = useVersionGetLast(article.id!, article.articleBranches[0].id)
const { data: branchData } = useBranchGetAll(article.id!)

const articleVersion = useVersionSave()

function debouncedSave() {
  clearTimeout(saveTimeout.value)
  saveTimeout.value = setTimeout(() => {
    saveArticle()
  }, 1500)
}

watch(data, (newData) => {
  if (newData?.text) {
    editorContent.value = newData.text
  }
}, { immediate: true })

async function saveArticle() {
  articleVersion.mutation({
    branchId: article.articleBranches![0].id,
    data: {
      branchId: article.articleBranches![0].id,
      text: editorContent.value
    },
  },
)
}
</script>

<template>
  <div class="flex flex-col gap-3 w-[1260px] h-full">
    <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md px-5 py-4 shadow">
      <h4>{{ article.title }}</h4>
    </div>
    <div class="grid grid-cols-[1fr_239px] gap-3 h-full">
      <div class="flex flex-col gap-3">
        <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md px-5 py-3 shadow">
          <!-- <USelectMenu v-model="value" :items="branchSelect" class="w-48" /> -->
          <USelectMenu v-model="value" :items="branchData" class="w-48" />

        </div>
        <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md h-full px-5 py-3 shadow">
          <Editor
            v-if="data" 
            :debounce-time="5"
            v-model="editorContent" 
            :debounce-save="true" 
            @save="debouncedSave" 
          />
          <div v-if="isLoadingVer">Loading</div>
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