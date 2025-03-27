<script setup lang="ts">

import LoginForm from "~/src/features/auth/ui/login-form.vue";

definePageMeta({
  layout: 'no-default',
})

// h-screen flex flex-col items-center justify-center

</script>

<template>
  <div class="items-center justify-center h-full flex">
    <LoginForm/>
  </div>
</template>

<style scoped>

</style>