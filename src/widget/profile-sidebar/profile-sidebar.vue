<script setup lang="ts">
import { useAccountSession } from '~/src/shared/api/generate/account';
import ROUTE from '~/src/shared/consts/ROUTE';


const { isOpen } = defineProps<{
  isOpen: boolean;
}>()

const emit = defineEmits(['update:isOpen'])

const { data, isPending } = useAccountSession()


</script>

<template>
  <USlideover 
    :ui="{
      rounded: 'rounded'
    }"
    class="flex-1 pr-2 py-2" 
    :model-value="isOpen" 
    @update:model-value="(value) => emit('update:isOpen', value)"
    >
    <UCard
        class="flex flex-col flex-1"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        <h4 v-if="data" >{{ data.name }}</h4>
        <div v-if="isPending">
          <USkeleton class="w-1/3 h-10" />
        </div>
      </template>

      Body
      <UButton>
        Сменить тему
      </UButton>
    </UCard>
  </USlideover>
</template>

<style scoped>

</style>