<script setup lang="ts">
import { useAccountInfoCreate, useAccountInfoGetAll, useAccountInfoUpdate } from '~/src/shared/api/generate/account-info';
import AccountField from './account-field.vue';
import { ref, watch } from 'vue';

interface AccountField {
  field: string;
  value: string;
  id: string;
}

const { data: accountInfo, isLoading: accountInfoLoading } = useAccountInfoGetAll();
const { mutate: createField } = useAccountInfoCreate();
const isAddingField = ref(false);
const newField = ref('');
const newValue = ref('');
const isSaving = ref(false);
const fields = ref<AccountField[]>([]);

// Watch for changes in accountInfo
watch(accountInfo, (newValue) => {
  if (newValue) {
    fields.value = newValue.map((item) => ({
      field: item.field || '',
      value: item.value || '',
      id: item.id || ''
    }));
  }
}, { immediate: true });

const startAddingField = () => {
  isAddingField.value = true;
  newField.value = '';
  newValue.value = '';
};

const saveNewField = async () => {
  if (!newField.value || !newValue.value) return;
  
  isSaving.value = true;
  try {
    // Optimistically update local data
    const newItem: AccountField = {
      field: newField.value,
      value: newValue.value,
      id: 'temp-' + Date.now() // Temporary ID until server response
    };
    fields.value = [...fields.value, newItem];
    
    // Reset the form immediately
    isAddingField.value = false;
    newField.value = '';
    newValue.value = '';
    
    // Send mutation
    await createField({
      data: {
        field: newItem.field,
        value: newItem.value
      }
    });
  } finally {
    isSaving.value = false;
  }
};

const handleFieldUpdate = (id: string, value: string) => {
  const fieldIndex = fields.value.findIndex(f => f.id === id);
  if (fieldIndex !== -1) {
    fields.value = fields.value.filter(item => {
        if (item.id == id)
            item.value = value
        return item;
    });
    console.log(fields.value)
  }
  
};

const handleFieldDelete = (id: string) => {
    fields.value = fields.value.filter(item => item.id != id);
}

</script>

<template>
  <div>
    Пользовательская информация
    <div v-if="accountInfoLoading" class="space-y-4">
      <USkeleton v-for="i in 3" :key="i" class="h-6 w-48" />
    </div>

    <template v-else>
      <div class="space-y-4">
        <div v-if="!fields || fields.length === 0" class="text-sm text-gray-500">
          Нет полей
        </div>

        <div v-else>
          <AccountField
            v-for="item in fields"
            :key="item.id"
            :field="item.field"
            :value="item.value"
            :id="item.id"
            @update="(id: string, value: string) => handleFieldUpdate(id, value)"
            @delete="handleFieldDelete"
          />
        </div>

        <div v-if="isAddingField" class="flex gap-2 items-center max-w-[307px]">
          <UInput
            v-model="newField"
            placeholder="Название поля"
            class="w-[150px]"
            :disabled="isSaving"
            @blur="saveNewField"
          />
          <UInput
            v-model="newValue"
            placeholder="Значение"
            class="w-[150px]"
            :disabled="isSaving"
            @blur="saveNewField"
          />
          <UButton
            v-if="isSaving"
            icon="i-heroicons-arrow-path"
            class="animate-spin"
            color="gray"
            variant="ghost"
          />
        </div>
        <UButton
          v-if="!isAddingField"
          icon="i-heroicons-plus"
          color="gray"
          variant="ghost"
          size="xs"
          class="w-8 h-8 p-0"
          @click="startAddingField"
        />
      </div>
    </template>
  </div>
</template>