
<script setup lang="ts">
import { useGetMergeRequest } from '~/src/shared/api/generate/merge';
import type { TextDiff } from '~/src/shared/api/model';

const article = ref<TextDiff[]>()

const { mutate, data } = useGetMergeRequest()

onMounted(() => {
  mutate({
    articleId: '3e4641a6-86dd-4f42-b18d-9f376fb64c05',
    branchId: '647d7696-1a36-4f16-b456-d956dc614217',
    data: {
      originalBranchId: '2c9d942c-9b45-48e4-9615-5a6949161395'
    }
  })
})

watch(() => data.value, () => {
  if (data.value) {
    article.value = data.value
  }
})

const processedBlocks = computed(() => {
  const result = [];
  let lastType = null;

  for (const block of data.value!) {
    if (lastType === block.isOriginal) {
      result[result.length - 1].content! += block.content;
    } else {
      result.push({ ...block });
      lastType = block.isOriginal;
    }
  }
  
  return result;
});


</script>

<template>
  <template v-for="(textBlock, index) in article" :key="index">
        <span class="inline-block relative">
          <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }" v-if="!textBlock.isOriginal">
            <span class="merge-added cursor-pointer bg-green-200 px-1 rounded">
              {{ textBlock.content }}
            </span>

            <template #panel>
              <div class="p-1 flex gap-2 bg-bg-200 shadow-lg rounded-md border">
                <UButton>
                  {{ $t('SAVE') }}
                </UButton>
                <UButton @click="() => deleteItem(index)" >
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
</template>