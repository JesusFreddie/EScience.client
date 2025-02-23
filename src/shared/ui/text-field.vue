<script setup lang="ts">

const { label, error  } = defineProps<{
  label?: string;
  error?: string;
}>();

</script>

<template>
  <div class="h-20">
    <label class="mb-1.5" v-if="label">{{ label }}</label>
    <slot class="mb-1.5"></slot>
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>