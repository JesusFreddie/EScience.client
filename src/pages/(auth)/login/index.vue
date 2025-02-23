<script setup lang="ts">

import LoginForm from "~/src/features/auth/ui/login-form.vue";

definePageMeta({
  layout: 'no-layouts',
})

</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <LoginForm/>
  </div>
</template>

<style scoped>

</style>