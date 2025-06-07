<script setup lang="ts">
import Article from "~/src/features/article/ui/article.vue";
import type { Article as ArticleDto } from "~/src/shared/api/model";

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

const { data, error, refresh } = await useFetch<ArticleDto>(
  `/api/account/${accountName}/article/${articleName}`,
  {
    headers: { 'Content-Type': 'application/json' },
    server: false,
    params: computed(() => ({ branchName: currentBranch.value })),
    watch: [currentBranch]
  }
)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message,
    fatal: true
  })
}

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

</script>

<template>
  <div v-if="data" class="flex justify-center h-full">
    <Article
      :article="data" 
      :branch="currentBranch"
      @checkout-branch="checkoutBranch"
      :key="`${accountName}-${articleName}-${currentBranch}`"
    />
  </div>
</template>
