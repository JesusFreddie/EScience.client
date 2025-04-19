<script setup lang="ts">
import Article from "~/src/features/article/ui/article.vue";
import type { Article as ArticleDto } from "~/src/shared/api/model";

const route = useRoute()
const router = useRouter()

const { accountName, articleName } = route.params as {
  accountName: string
  articleName: string
}
const { branchName } = route.query as { branchName?: string }
const currentBranch = ref(branchName || 'main')

useHead({
  title: articleName.toString()
})

const { data, error, refresh } = await useFetch<ArticleDto>(
  `/api/account/${accountName}/article/${articleName}?branchName=${currentBranch.value}`,
  {
    headers: { 'Content-Type': 'application/json' },
    server: false
  },
)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message,
    fatal: true
  })
}

function checkoutBranch(name: string) {
  currentBranch.value = name
  router.push({
    query: {
      ...route.query,
      branchName: name
    },
  })
  refresh()
}

watch(() => route.query.branchName, (newBranchName) => {
  if (newBranchName && newBranchName !== currentBranch.value) {
    currentBranch.value = newBranchName as string
    refresh()
  }
})

</script>

<template>
  <div v-if="data" class="flex justify-center h-full">
    <Article 
      :article="data" 
      :branch="currentBranch"
      @checkout-brach="checkoutBranch"
      :key="`${accountName}-${articleName}-${currentBranch}`"
    />
  </div>
</template>