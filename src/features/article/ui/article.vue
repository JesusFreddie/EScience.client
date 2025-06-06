<script setup lang="ts">
import type { Article } from "~/src/shared/api/model";
import Editor from "~/src/shared/ui/editor/editor.vue";
import { useBranchGetAll } from "~/src/shared/api/generate/article-branch";
import { useVersionGetLast } from "~/src/shared/api/generate/article-version";
import { useVersionSave } from "../model/use-version-save";
import ArticleMerge from "./article-merge.vue";
import type { BranchOptions } from "../entities/branch-options";
import ArticleBranches from "./article-branches.vue";
import ArticleCreateBranch from "./form/article-create-branch.vue";
import ArticleEditorAvatar from "./article-editor-avatar.vue";
import ArticleMenu from "./article-menu.vue";
import { useTimeAgoMessage } from "~/src/shared/composable/useTimeAgoMessage";
import ArticleVersionHistory from "./article-version-history.vue";

const { article, branch } = defineProps<{
  article: Article,
  branch?: string,
}>()

const emit = defineEmits<{
  (e: 'checkoutBranch', name: string): void
}>()

const isOpenCreateBranch = ref(false)
function openCreateBranchModal() {
  isOpenCreateBranch.value = true
}

const isOpenCreateMerge = ref(false)
function openCreateMergeModal() {
  isOpenCreateMerge.value = true
}

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

const { data, isPending: isLoadingVer, refetch: fetchBranch } = useVersionGetLast(article.id!, currentBranch.value.id)
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

// watch(() => branch, async (newBranch) => {
//   if (newBranch) {
//     if (!branches.value) {
//       await fetchBranches()
//     }

//     if (branches.value) {
//       const foundBranch = branches.value.find(b => b.name === newBranch)
//       if (foundBranch) {
//         currentBranch.value = {
//           label: foundBranch.name || "",
//           value: foundBranch.name || "",
//           id: foundBranch.id || ""
//         }
//         fetchBranch()
//       }
//     }
//   }
// }, { immediate: true })

function onOpenSelectBranches(isOpen: boolean) {
  if (isOpen && !branches.value) {
    fetchBranches();
  }
}

function onCheckoutBranch(name: string) {
  emit("checkoutBranch", name)
  // fetchBranch()
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

</script>

<template>
  <div class="flex flex-col gap-3 w-[1260px] h-full">
    <UModal v-model="isOpenCreateBranch">
      <div class="py-4 px-2">
        <ArticleCreateBranch 
          v-if="branches?.length" 
          :article-id="article.id!" 
          :branches="branches"
          @success="fetchBranches" 
          />
      </div>
    </UModal>
    <UModal v-model="isOpenCreateMerge" fullscreen>
      <div class="h-[90vh]">

        <UButton 
          color="gray" 
          variant="ghost" 
          icon="i-heroicons-x-mark-20-solid" 
          class="-my-1"
          @click="isOpenCreateMerge = false"
          >
          {{ $t('CLOSE') }}
        </UButton>
        <ArticleMerge 
          v-if="branches?.length" 
          :article-id="article.id!" 
          :branches="branches"
          :current-branch-id="currentBranch.id" 
          />
      </div>
    </UModal>

    <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md px-5 py-3 shadow flex items-center justify-between">
      <div>
        <h4>{{ article.title }}</h4>
      </div>
      <div>
        <ArticleMenu :article-id="article.id!" />
      </div>
    </div>
    <div class="grid grid-cols-[1fr_239px] gap-3 h-full">
      <div class="flex flex-col gap-3">
        <div class="bg-bg-100 flex items-center dark:bg-bg-dark-200 rounded-md px-5 py-3 shadow flex justify-between">
          <div>
            <ArticleBranches :branches="branchesOptions" :current-branch="currentBranch"
              @on-checkout-branch="onCheckoutBranch" @on-open-select="onOpenSelectBranches"
              @on-open-create-branch="openCreateBranchModal" @on-open-create-merge="openCreateMergeModal" />
          </div>

          <div>
            <ArticleVersionHistory 
              :article-id="article.id!"
              :branch-id="currentBranch.id"
              :last-update-time="data?.updatedAt"
            />
          </div>

        </div>

        <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md h-full px-3 py-3 shadow">
          <Editor v-if="data" :debounce-time="5" v-model="editorContent" :debounce-save="true" @save="debouncedSave" />
          <div v-if="isLoadingVer">Loading</div>
        </div>
      </div>
      <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md h-full pt-5 px-4 shadow">
        <div class="flex flex-col gap-2">
          <div>
            <p class="pb-2">{{ $t('PARTICIPANTS.MANY') }}</p>
            <ArticleEditorAvatar :article-id="article.id!" />
          </div>
          <UDivider />
          <div>
            <p>{{ $t('ARTICLE.DESCRIPTION') }}</p>
            <p class="break-words">{{ article.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
