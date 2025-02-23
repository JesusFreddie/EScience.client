<script setup lang="ts">

import RegisterForm from "~/src/features/auth/ui/register-form.vue";

definePageMeta({
  layout: 'no-layouts',
})

</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <RegisterForm/>
  </div>
</template>

<style scoped>

</style>