<script setup lang="ts">

const { url } = defineProps<{
  url?: string
}>()

const isOpen = ref(false)
</script>

<template>
  <div class="flex gap-1 items-center justify-center cursor-pointer">

    <div v-if="url" class="flex gap-1 items-center justify-center cursor-pointer">
      <UAvatar
        @click="isOpen = !isOpen"
        :src="url"
        :ui="{
          background: 'bg-gray-100 dark:bg-gray-800',
          placeholder: 'text-gray-500 dark:text-gray-400'
        }"
        size="sm"
      />
    </div>

    <USkeleton v-else @click="isOpen = !isOpen" class="w-[32px] h-[32px]"/>
  </div>

</template>

<style scoped>

</style>