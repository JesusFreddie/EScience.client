<script setup lang="ts">
import { useAccountInfoUpdate, useAccountInfoDelete } from '~/src/shared/api/generate/account-info';
import { ref } from 'vue';

interface Props {
  field: string;
  value: string;
  id: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update', id: string, value: string): void;
  (e: 'delete', id: string): void;
}>();

const { mutate: updateField } = useAccountInfoUpdate();
const { mutate: deleteField } = useAccountInfoDelete();

const isEditing = ref(false);
const isSaving = ref(false);
const editField = ref(props.field);
const editValue = ref(props.value);

const startEditing = () => {
  isEditing.value = true;
  editField.value = props.field;
  editValue.value = props.value;
};

const saveEdit = async () => {
  if (!editValue.value) return;
  
  isSaving.value = true;
  try {
    await updateField({
      id: props.id,
      data: {
        field: props.field,
        value: editValue.value
      }
    });
    
    isEditing.value = false;
    emit('update', props.id, editValue.value);
  } finally {
    isSaving.value = false;
  }
};

const handleDelete = async () => {
  try {
    await deleteField({
      id: props.id
    });
    emit('delete', props.id);
  } catch (error) {
    // Error handling is done by the parent component
  }
};
</script>

<template>
  <div class="flex gap-2 items-center group">
    <template v-if="isEditing">
      <div class="flex gap-2 items-center max-w-[307px]">
        <UInput
          v-model="editField"
          placeholder="Название поля"
          class="w-[150px]"
          :disabled="true"
        />
        <UInput
          v-model="editValue"
          placeholder="Значение"
          class="w-[150px]"
          :disabled="isSaving"
          @blur="saveEdit"
        />
        <UButton
          v-if="isSaving"
          icon="i-heroicons-arrow-path"
          class="animate-spin"
          color="gray"
          variant="ghost"
        />
      </div>
    </template>
    <template v-else>
      <div 
        class="flex gap-2 cursor-pointer"
        @click="startEditing"
      >
        <span class="font-semibold">{{ field }}:</span>
        <span>{{ value }}</span>
      </div>
      <UButton
        icon="i-heroicons-x-mark"
        color="gray"
        variant="ghost"
        size="xs"
        class="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
        @click.stop="handleDelete"
      />
    </template>
  </div>
</template> 