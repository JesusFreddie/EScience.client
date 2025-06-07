<script setup lang="ts">

import RegisterForm from "~/src/features/auth/ui/register-form.vue";
import ROUTE from "~/src/shared/consts/ROUTE";

const { t } = useI18n();

definePageMeta({
  layout: 'no-layouts',
})

useHead({
  title: t('REGISTER'),
})

</script>

<template>
  <div class="h-screen flex flex-col">
    <header class="w-full p-4 flex justify-between items-center">
      <NuxtLink :to="ROUTE.LOGIN" class="text-blue-600 hover:text-blue-800">
        {{ $t('LOGIN') }}
      </NuxtLink>
      <h1 class="text-xl font-bold">MyApp</h1>
    </header>
    <div class="flex-1 flex flex-col items-center justify-center">
      <RegisterForm/>
    </div>
  </div>
</template>

<style scoped>

</style>