<script setup lang="ts">
import type {Article} from "~/src/shared/api/model";
import Editor from "~/src/shared/ui/editor/editor.vue";
import { useBranchGetAll } from "~/src/shared/api/generate/article-branch";
import {useVersionGetLast} from "~/src/shared/api/generate/article-version";
import { useVersionSave } from "../model/use-version-save";
import ArticleMerge from "./article-merge.vue";
import type { BranchOptions } from "../entities/branch-options";
import ArticleBranches from "./article-branches.vue";

const { article, branch } = defineProps<{
  article: Article,
  branch?: string,
}>()

const emit = defineEmits<{
  (e: 'checkoutBrach', name: string): void
}>()

const saveTimeout = ref<NodeJS.Timeout>()

const editorContent = ref<string>("")
const currentBranch = ref<BranchOptions>({
  label: article.articleBranches![0]?.name || "main",
  value: article.articleBranches![0]?.name || "main",
  id: article.articleBranches![0].id!
});

if (!article.articleBranches || !article.articleBranches[0].id) {
  console.error('CUSTOM ERROR: No branches available');
}

const { data, isPending: isLoadingVer, refetch: fetchBranch } = useVersionGetLast(article.id!, article.articleBranches![0].id!)
const { data: branches, isPending: branchLoading, refetch: fetchBranches } = useBranchGetAll(article.id!, {
  query: {
    enabled: false
  }
})

const useSave = useVersionSave()

function debouncedSave() {
  clearTimeout(saveTimeout.value)
  saveTimeout.value = setTimeout(() => {
    saveArticle()
  }, 1500)
}

async function saveArticle() {
  useSave.mutation({
    articleId: article.id!,
    branchId: currentBranch.value.id,
    data: {
      branchId: currentBranch.value.id,
      text: editorContent.value
    }
  })
}

watch(data, (newData) => {
  if (newData?.text) {
    editorContent.value = newData.text
  }
}, { immediate: true })

watch(currentBranch, (value) => {
  console.log(value)
})

function onOpenSelectBranches(isOpen: boolean) {
  if (isOpen && !branches.value) {
    fetchBranches(); 
  }
}

function onCheckoutBranch(name: string) {
  emit("checkoutBrach", name)
  fetchBranch()
}

const branchesOptions = computed(() => {
  if (!branches.value)
    return [];

    return branches.value.map<BranchOptions>(branch => ({
      label: branch.name || "",
      value: branch.name || "",
      id: branch.id || ""
  }));
});

const { data: targetVersion } = useVersionGetLast(article.id!, '10a399a8-56cb-4579-98b3-61664a8403d3');

</script>

<template>
  <div class="flex flex-col gap-3 w-[1260px] h-full">
    <!-- <ArticleCreateBranch v-if="branches?.length" :article-id="article.id!" :branches="branches" /> -->
    <!-- <ArticleMerge
      v-if="article.id && currentBranch.id"
      :article-id="article.id"
      :base-branch-id="currentBranch.id"
      target-branch-id="10a399a8-56cb-4579-98b3-61664a8403d3"
      :base-content="editorContent"
      :target-content="targetVersion?.text || 'lolik'"
      :key="`merge-${article.title}-${currentBranch.label}-${'10a399a8-56cb-4579-98b3-61664a8403d3'}`"
    /> -->
    <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md px-5 py-4 shadow">
      <h4>{{ article.title }}</h4>
    </div>
    <div class="grid grid-cols-[1fr_239px] gap-3 h-full">
      <div class="flex flex-col gap-3">
        <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md px-5 py-3 shadow">
          <ArticleBranches
            :branches="branchesOptions"
            :current-branch="currentBranch"
            @on-checkout-branch="onCheckoutBranch"
            @on-open-select="onOpenSelectBranches"
          />
          
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
          <p>{{ $t('ARTICLE.DESCRIPTION') }}</p>
          <p>{{ article.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>