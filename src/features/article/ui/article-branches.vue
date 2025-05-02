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
  (e: 'onOpenCreateBranch'): void
  (e: 'onOpenCreateMerge'): void
}>()

function onCheckoutBranch(name: string) {
  emit('onCheckoutBranch', name)
}

function onOpenSelect(isOpen: boolean) {
  emit('onOpenSelect', isOpen)
} 

function onOpenCreateBranch() {
  emit('onOpenCreateBranch')
}

function onOpenCreaetMerge() {
  emit('onOpenCreateMerge')
}

</script>

<template>
  <!-- <USelect
      :options="branches" 
      class="w-48"
      @click="onOpenSelect(true)"
      @change="onCheckoutBranch"
  /> -->

  <div>
    <UPopover
      @update:open="onOpenSelect(true)"
      :popper="{ placement: 'bottom-start' }"
    >
      <UButton variant="ghost" :label="currentBranch.label"/>

      <template #panel>
        <div class="flex flex-col w-[320px] p-2 gap-2">
          <div class="flex flex-col">
            <UButton 
              @click="onOpenCreateBranch"
              variant="ghost"
              >
              {{ $t('FORM.BRANCHES.CREATE') }}
            </UButton>
            <UButton 
              @click="onOpenCreaetMerge"
              variant="ghost"
              >
              {{ $t('FORM.MERGE.CREATE') }}
            </UButton>
            
          </div>

          <UDivider />
          <div class="flex flex-col">
            <p class="text-xs">{{ $t('BRANCHES') }}</p>
            <div class="flex flex-col">
              <UButton 
                variant="ghost" 
                v-for="branch in branches"
                @click="onCheckoutBranch(branch.value)"
                >
                {{ branch.label }}
              </UButton>
            </div>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>