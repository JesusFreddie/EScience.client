<script setup lang="ts">
import { useMerge } from '../model/use-merge';
import Editor from '~/src/shared/ui/editor/editor.vue';

const props = defineProps<{
  targetContent: string
  baseContent: string
  targetBranchId: string
  baseBranchId: string
  articleId: string
}>();

const {
  calculateDiff,
  isSaving,
  mergeState,
  saveMerge,
  updateEditedContent
} = useMerge(props)

const formattedDiff = computed(() => {
  if (!mergeState.value.diff) return '';
  
  let html = '';
  mergeState.value.diff.unchanged.forEach(text => {
    html += `<span>${text}</span> `;
  });
  
  mergeState.value.diff.added.forEach(text => {
    html += `<span style="color: green; background-color: #e6ffe6">${text}</span> `;
  });
  
  mergeState.value.diff.removed.forEach(text => {
    html += `<span style="color: red; background-color: #ffe6e6; text-decoration: line-through">${text}</span> `;
  });
  
  return html;
});

const showDiff = computed(() => {
  if (!mergeState.value.targetBranchId) return false;
  return mergeState.value.diff.added.length > 0 || 
         mergeState.value.diff.removed.length > 0;
});

watch(formattedDiff, (newVal) => {
  // diffEditor.value?.commands.setContent(newVal);
  mergeState.value.baseContent = newVal;
});

</script>

<template>
  <div class="merge-editor">
    <div class="merge-controls">
      <div class="branch-selector">
        <label>Merge from:</label>
        <UButton 
          @click="calculateDiff"
          :disabled="!mergeState.targetBranchId"
        >
          Show Changes
        </UButton>
      </div>
      
      <div class="merge-actions">
        <UButton
          @click="saveMerge"
          :loading="isSaving"
          :disabled="!mergeState.targetBranchId"
          color="primary"
        >
          Save Merge
        </UButton>
      </div>
    </div>

    <div class="editor-container">
      <div v-if="showDiff" class="diff-highlights">
        <div class="diff-added">Added content</div>
        <div class="diff-removed">Removed content</div>
      </div>
      
      <Editor
        v-if="mergeState.baseContent" 
        :debounce-time="5"
        v-model="mergeState.baseContent" 
        :debounce-save="true" 
      />
    </div>
  </div>
</template>

<style scoped>
.merge-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
}

.merge-controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
}

.branch-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.editor-container {
  position: relative;
  flex-grow: 1;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
}

.merge-content {
  height: 100%;
  padding: 1rem;
  background: white;
}

.diff-highlights {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
}

.diff-added {
  color: green;
}

.diff-removed {
  color: red;
  text-decoration: line-through;
}
</style>