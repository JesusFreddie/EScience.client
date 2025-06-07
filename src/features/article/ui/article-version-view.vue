<script setup lang="ts">
import { useVersionGetLast, useVersionGetById } from "~/src/shared/api/generate/article-version";
import { useTimeAgoMessage } from "~/src/shared/composable/useTimeAgoMessage";
import Editor from "~/src/shared/ui/editor/editor.vue";

const props = defineProps<{
  articleId: string;
  branchId: string;
  versionId: string;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
}>();

const id = computed(() => props.versionId)

const { data: version, isPending, error } = useVersionGetById(
  props.articleId,
  props.branchId,
  id.value,
  {
    query: {
      enabled: computed(() => props.isOpen && !!props.versionId),
      queryKey: computed(() => ['version', props.versionId]),
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    },
  }
);

const { setTimeAgoMessage } = useTimeAgoMessage();

const lastUpdateAgo = computed(() => {
  if (version.value?.updatedAt) {
    return setTimeAgoMessage(version.value.updatedAt).value;
  }
  return '';
});

onMounted(() => console.log('mounted'))
onUnmounted(() => console.log('unmounted'))

const t = (key: string) => key;
</script>

<template>
  <UModal 
    v-if="isOpen"
    :model-value="isOpen" 
    @update:model-value="emit('update:isOpen', $event)"
    :ui="{ 
      width: 'min-w-[1009px]',
      height: 'h-[90vh]',
      container: 'flex min-h-screen items-center justify-center',
      overlay: { background: 'bg-gray-800/75' }
    }"
  >
    <div class="flex flex-col h-full w-full">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-semibold">{{ t('VERSION_VIEW') }}</h3>
          <span class="text-sm text-gray-500">{{ lastUpdateAgo }}</span>
        </div>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          @click="emit('update:isOpen', false)"
        />
      </div>

      <div class="flex-1 overflow-auto bg-bg-100 dark:bg-bg-dark-200 rounded-md px-3 py-3 shadow">
        <div v-if="isPending" class="flex justify-center items-center h-full">
          <UIcon name="i-heroicons-arrow-path" class="animate-spin text-2xl" />
        </div>

        <div v-else-if="error" class="text-red-500 text-center py-4">
          {{ t('ERROR.LOADING_VERSION') }}
        </div>

        <div v-else-if="version?.text" class="h-full">
          <Editor
            :model-value="version.text"
            :debounce-save="false"
            :readonly="true"
            :editable="false"
            :is-editable="false"
          />
        </div>

        <div v-else class="text-gray-500 text-center py-4">
          {{ t('NO_CONTENT') }}
        </div>
      </div>
    </div>
  </UModal>
</template> 