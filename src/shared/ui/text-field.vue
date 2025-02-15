<script setup lang="ts">
import {uuid} from "vue-uuid";

const { label, error  } = defineProps<{
  label?: string;
  error?: string;
}>();
const id = uuid.v1();
</script>

<template>
  <div class="h-20">
    <label class="mb-1.5" :id="id" v-if="label">{{ label }}</label>
    <slot class="mb-1.5" :id="id"></slot>
    <p v-if="error">{{ error }}</p>
  </div>
</template>