<script setup lang="ts">
import type { BranchOptions } from '../entities/branch-options';

const route = useRoute()

const { branches, currentBranch } = defineProps<{
    branches: BranchOptions[],
    currentBranch: BranchOptions
}>()

const emit = defineEmits<{
  (e: 'onCheckoutBranch', name: string): void
  (e: 'onOpenSelect', isOpen: boolean): void
}>()

function onCheckoutBranch(name: string) {
  emit('onCheckoutBranch', name)
}

function onOpenSelect(isOpen: boolean) {
  emit('onOpenSelect', isOpen)
} 

</script>

<template>
  <USelect
      :options="branches" 
      class="w-48"
      @click="onOpenSelect(true)"
      @change="onCheckoutBranch"
  />
</template>