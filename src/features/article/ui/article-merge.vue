<script setup lang="ts">
import type { ArticleBranch } from '~/src/shared/api/model';
import { useMerge } from '../model/use-merge';


const { articleId, branches } = defineProps<{
  articleId: string
  currentBranchId: string,
  branches: ArticleBranch[]
}>()

const { baseBranchId, data, mutate, deleteItem, currentBranchId } = useMerge({ articleId })

const selectedBranch = ref<string>()

const branchesOptions = computed(() => {
  return branches.map(branch => ({
    label: branch.name,
    value: branch.id,
  }))
})

function handleMerge() {
  mutate({
    articleId,
    branchId: currentBranchId.value!,
    data: {
      originalBranchId: selectedBranch.value
    }
  })
}

const sanitizeHtml = (html: string) => {
  return html;
};


</script>

<template>
  <div class="h-full">
    <div class="flex flex-col h-full">
      <div>
        <div class="flex justify-center items-center gap-4 p-4 bg-bg-50 rounded-lg">
          <div class="w-64">
            <label class="block text-sm font-medium text-gray-700 mb-1">Source Branch</label>
            <USelect 
              v-if="branchesOptions.length" 
              v-model="selectedBranch" 
              :options="branchesOptions"
              @update:model-value="handleMerge"
              class="w-full" 
            />
          </div>
          
          <div class="h-12 w-px bg-gray-200"></div>
          
          <div class="w-64">
            <label class="block text-sm font-medium text-gray-700 mb-1">Target Branch</label>
            <USelect 
              v-if="branchesOptions.length" 
              v-model="currentBranchId" 
              :options="branchesOptions"
              @update:model-value="handleMerge"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <div class="w-[1000px] mx-auto p-2 flex justify-center bg-bg-100 shadow flex-1">
        <div v-if="data" class="w-full">
          <template v-for="(textBlock, index) in data" :key="index">
            <span class="inline-block relative">
              <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }"
                v-if="!textBlock.isOriginal">
                <span class="merge-added cursor-pointer bg-green-200 px-1 rounded">
                  {{ textBlock.content }}
                </span>

                <template #panel>
                  <div class="p-1 flex gap-2 bg-bg-200 shadow-lg rounded-md border">
                    <UButton>
                      {{ $t('SAVE') }}
                    </UButton>
                    <UButton @click="() => deleteItem(index)">
                      {{ $t('DELETE') }}
                    </UButton>
                  </div>
                </template>
              </UPopover>

              <span v-else class="merge-original">
                {{ textBlock.content }}
              </span>
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>