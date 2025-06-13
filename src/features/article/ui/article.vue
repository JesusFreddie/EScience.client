<script setup lang="ts">
import { ArticlePermissionLevel, type Article } from "~/src/shared/api/model";
import Editor from "~/src/shared/ui/editor/editor.vue";
import { useBranchGetAll } from "~/src/shared/api/generate/article-branch";
import ArticleMerge from "./article-merge.vue";
import type { BranchOptions } from "../entities/branch-options";
import ArticleBranches from "./article-branches.vue";
import ArticleCreateBranch from "./form/article-create-branch.vue";
import ArticleEditorAvatar from "./article-editor-avatar.vue";
import ArticleMenu from "./article-menu.vue";
import ArticleVersionHistory from "./article-version-history.vue";
import type { Editor as EditorType } from '@tiptap/vue-3'

const props = defineProps<{
  article: Article,
  branch?: string,
  currentBranchData: BranchOptions,
  branches: BranchOptions[],
  versionData: any,
  isLoadingVersion: boolean,
  editorContent: string,
  permisionLevel: number
}>()

const canView = computed(() => {
    if (props.permisionLevel >= ArticlePermissionLevel.NUMBER_3)
        return true
    return false
})

const canEdit = computed(() => {
  if (props.permisionLevel <= ArticlePermissionLevel.NUMBER_1)
    return false
  return true;
})

const emit = defineEmits<{
  (e: 'checkoutBranch', name: string): void
  (e: 'update:editorContent', content: string): void
  (e: 'save'): void
  (e: 'fetchBranches'): void
  (e: 'fetchBranch'): void
}>()

const editorInstance = ref<EditorType>();

function setEditorInstance(editor: EditorType) {
  editorInstance.value = editor;
}

const isOpenCreateBranch = ref(false)
function openCreateBranchModal() {
  isOpenCreateBranch.value = true
}

const isOpenCreateMerge = ref(false)
function openCreateMergeModal() {
  isOpenCreateMerge.value = true
}

const currentBranch = ref<BranchOptions>({
  label: props.article.articleBranches![0]?.name || "main",
  value: props.article.articleBranches![0]?.name || "main",
  id: props.article.articleBranches![0].id!
});

if (!props.article.articleBranches || !props.article.articleBranches[0].id) {
  console.error('CUSTOM ERROR: No branches available');
}

const { data: branches, isPending: branchLoading, refetch: fetchBranches } = useBranchGetAll(props.article.id!, {
  query: {
    enabled: false
  }
})

watch(currentBranch, (value) => {
  console.log(value)
})

function onOpenSelectBranches(isOpen: boolean) {
  if (isOpen && !branches.value) {
    fetchBranches();
  }
}

function onCheckoutBranch(name: string) {
  emit("checkoutBranch", name)
}

function onEditorContentChange(content: string) {
  emit('update:editorContent', content)
}

function onEditorSave() {
  emit('save')
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
          :current-branch-id="currentBranchData.id" 
          />
      </div>
    </UModal>

    <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md px-5 py-3 shadow flex items-center justify-between">
      <div>
        <h4>{{ article.title }}</h4>
      </div>
      <div>
        <ArticleMenu v-if="canView" :article-id="article.id!" :editor="editorInstance" :permision-level="props.permisionLevel" />
      </div>
    </div>
    <div class="grid grid-cols-[1fr_239px] gap-3 h-full">
      <div class="flex flex-col gap-3">
        <div class="bg-bg-100 flex items-center dark:bg-bg-dark-200 rounded-md px-5 py-3 shadow flex justify-between">
          <div>
            <ArticleBranches 
              :branches="branchesOptions" 
              :current-branch="currentBranchData"
              :permision-level="props.permisionLevel"
              @on-checkout-branch="onCheckoutBranch" @on-open-select="onOpenSelectBranches"
              @on-open-create-branch="openCreateBranchModal" @on-open-create-merge="openCreateMergeModal" />
          </div>

          <div>
            <ArticleVersionHistory 
              :article-id="article.id!"
              :branch-id="currentBranchData.id"
              :last-update-time="versionData?.updatedAt"
            />
          </div>

        </div>

        <div class="bg-bg-100 dark:bg-bg-dark-200 rounded-md h-full px-3 py-3 shadow">
          <Editor 
            v-if="versionData" 
            :debounce-time="5" 
            :model-value="props.editorContent" 
            :debounce-save="true"
            :is-editable="canEdit"
            @update:model-value="onEditorContentChange"
            @save="onEditorSave" 
            @on-set-editor-instance="setEditorInstance"
          />
          <div v-if="isLoadingVersion">Loading</div>
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
