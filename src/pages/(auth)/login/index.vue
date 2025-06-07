<script setup lang="ts">

import LoginForm from "~/src/features/auth/ui/login-form.vue";
import ROUTE from "~/src/shared/consts/ROUTE";

const { t } = useI18n();

definePageMeta({
  layout: "auth",
})

useHead({
  title: t('LOGIN'),
})

</script>

<template>
  <div class="h-screen flex flex-col">
    <header class="w-full p-4 flex justify-between items-center">
      <NuxtLink :to="ROUTE.REGISTER" class="text-blue-600 hover:text-blue-800">
        {{ $t('REGISTER') }}
      </NuxtLink>
      <h1 class="text-xl font-bold">MyApp</h1>
    </header>
    <div class="flex-1 flex flex-col items-center justify-center">
      <LoginForm/>
    </div>
  </div>
</template>

<style scoped>

</style>