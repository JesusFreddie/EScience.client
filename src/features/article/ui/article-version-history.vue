<script setup lang="ts">
import { useVersionGetAllInfo } from "~/src/shared/api/generate/article-version";
import { useTimeAgoMessage } from "~/src/shared/composable/useTimeAgoMessage";
import type { VersionInfo } from "~/src/shared/api/model";
import ArticleVersionView from "./article-version-view.vue";

const props = defineProps<{
  articleId: string;
  branchId: string;
  lastUpdateTime: string;
}>();

const isOpen = ref(false);
const selectedVersionId = ref<string | null>(null);
const isVersionViewOpen = ref(false);
const { setTimeAgoMessage } = useTimeAgoMessage();

const { data: versions, isPending, error, refetch } = useVersionGetAllInfo(
  props.articleId,
  props.branchId,
  {
    query: {
      enabled: false,
    },
  }
);

const lastUpdateAgo = computed(() => {
  if (props.lastUpdateTime) {
    return setTimeAgoMessage(props.lastUpdateTime).value;
  }
  return '';
});

async function handleClick() {
  isOpen.value = true;
  await refetch();
}

function handleVersionSelect(version: VersionInfo) {
  selectedVersionId.value = version.id || null;
  isVersionViewOpen.value = true;
  isOpen.value = false;
}

function handleVersionViewClose(value: boolean) {
  isVersionViewOpen.value = value;
  if (!value) {
    selectedVersionId.value = null;
  }
}

// Type declarations for translations
const t = (key: string) => key;
</script>

<template>
  <div>
    <UPopover v-model="isOpen">
      <UButton
        color="gray"
        variant="ghost"
        @click="handleClick"
      >
        {{ lastUpdateAgo }}
      </UButton>

      <template #panel>
        <div class="p-4 w-80">
          <div v-if="isPending" class="flex justify-center py-4">
            <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
          </div>

          <div v-else-if="error" class="text-red-500">
            {{ t('ERROR.LOADING_VERSIONS') }}
          </div>

          <div v-else-if="versions?.length" class="space-y-2 max-h-[400px] overflow-y-auto">
            <div
              v-for="version in versions"
              :key="version.id"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer"
              @click="handleVersionSelect(version)"
            >
              <div class="text-sm">
                {{ version.updatedAt ? setTimeAgoMessage(version.updatedAt).value : '' }}
              </div>
              <div class="text-xs text-gray-500">
                {{$t('ARTICLE.VERSION')}} {{ version.id?.slice(0, 8) }}
              </div>
            </div>
          </div>

          <div v-else class="text-gray-500 text-center py-4">
            {{ t('NO_VERSIONS') }}
          </div>
        </div>
      </template>
    </UPopover>

    <ArticleVersionView
      v-if="selectedVersionId"
      :article-id="props.articleId"
      :branch-id="props.branchId"
      :version-id="selectedVersionId"
      :is-open="isVersionViewOpen"
      @update:is-open="handleVersionViewClose"
    />
  </div>
</template> 