<script setup lang="ts">
import {useGetAccountSession} from "~/src/shared/api/generate/account";

const { isOpen } = defineProps<{
  isOpen: boolean;
}>()

const emit = defineEmits(['update:isOpen'])

const { data, isPending } = useGetAccountSession()

</script>

<template>
  <USlideover class="flex-1" :model-value="isOpen" @update:model-value="(value) => emit('update:isOpen', value)">
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
    </UCard>
  </USlideover>
</template>

<style scoped>

</style>