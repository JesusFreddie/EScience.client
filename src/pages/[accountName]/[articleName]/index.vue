<script setup lang="ts">
import type { BranchOptions } from "~/src/features/article/entities/branch-options";
import Article from "~/src/features/article/ui/article.vue";
import type { Article as ArticleDto, ArticlePermissionLevel } from "~/src/shared/api/model";
import { useBranchGetAll } from "~/src/shared/api/generate/article-branch";
import { useVersionGetLast } from "~/src/shared/api/generate/article-version";
import { useVersionSave } from "~/src/features/article/model/use-version-save";
import { apiInstance } from "~/src/shared/api/api-instance";

const route = useRoute()
const router = useRouter()

definePageMeta({
  middleware: 'session-middleware'
})

const { accountName, articleName } = route.params as {
  accountName: string
  articleName: string
}
const { branchName } = route.query as { branchName?: string }
const currentBranch = ref(route.query.branchName?.toString() || 'main')

useHead({
  title: articleName.toString()
})

const { data: article, error, refresh } = await useFetch<ArticleDto>(
  `https://localhost:7099/account/${accountName}/article/${articleName}`,
  {
    headers: { 'Content-Type': 'application/json' },
    server: false,
    params: computed(() => ({ branchName: currentBranch.value })),
    watch: [currentBranch]
  }
)

const { data: permisionLevel } = await apiInstance.get<ArticlePermissionLevel>(`/permision/article/${article.value!.id}`);

console.log(permisionLevel)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message,
    fatal: true
  })
}

const currentBranchData = ref<BranchOptions>({
  label: "main",
  value: "main",
  id: ""
})

const { data: branches, refetch: fetchBranches } = useBranchGetAll(computed(() => article.value?.id || ""), {
  query: {
    enabled: false
  }
})

const { data: versionData, isPending: isLoadingVer, refetch: fetchBranch } = useVersionGetLast(
  computed(() => article.value?.id || ""),
  computed(() => currentBranchData.value.id)
)

onMounted(() => {
  fetchBranch()
})

const editorContent = ref<string>("")
const saveTimeout = ref<NodeJS.Timeout>()
const useSave = useVersionSave()

function debouncedSave() {
  clearTimeout(saveTimeout.value)
  saveTimeout.value = setTimeout(() => {
    saveArticle()
  }, 1500)
}

async function saveArticle() {
  if (!article.value?.id) return
  
  useSave.mutation({
    articleId: article.value.id,
    branchId: currentBranchData.value.id,
    data: {
      text: editorContent.value
    }
  })
}

watch(versionData, (newData) => {
  if (newData?.text) {
    editorContent.value = newData.text
  }
}, { immediate: true })

watch(() => article.value, (newArticle) => {
  if (newArticle?.articleBranches?.[0]?.id) {
    currentBranchData.value = {
      label: newArticle.articleBranches[0].name || "main",
      value: newArticle.articleBranches[0].name || "main",
      id: newArticle.articleBranches[0].id
    }
    fetchBranches()
  }
}, { immediate: true })

watch(() => currentBranch.value, async (newBranch) => {
  if (newBranch && branches.value) {
    const foundBranch = branches.value.find(b => b.name === newBranch)
    if (foundBranch) {
      currentBranchData.value = {
        label: foundBranch.name || "",
        value: foundBranch.name || "",
        id: foundBranch.id || ""
      }
      await nextTick()
      fetchBranch()
    }
  }
}, { immediate: true })

async function checkoutBranch(name: string) {
  currentBranch.value = name
  await router.push({
    query: {
      ...route.query,
      branchName: name
    }
  })
}

watch(() => route.query.branchName, (newBranchName) => {
  const branch = newBranchName?.toString() || 'main'
  if (branch !== currentBranch.value) {
    currentBranch.value = branch
  }
}, { immediate: true })

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
  <div v-if="article" class="flex justify-center h-full">
    <Article
      :article="article" 
      :branch="currentBranch"
      :current-branch-data="currentBranchData"
      :branches="branchesOptions"
      :version-data="versionData"
      :is-loading-version="isLoadingVer"
      :editor-content="editorContent"
      :key="`${accountName}-${articleName}-${currentBranch}`"
      :permision-level="permisionLevel"
      @checkout-branch="checkoutBranch"
      @update:editor-content="editorContent = $event"
      @save="debouncedSave"
      @fetch-branches="fetchBranches"
      @fetch-branch="fetchBranch"
    />
  </div>
</template>
