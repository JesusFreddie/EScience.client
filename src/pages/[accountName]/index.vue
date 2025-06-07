<script setup lang="ts">
import Account from "~/src/features/account/ui/account.vue";
import type {ProfileDto} from "~/src/shared/api/model";
const route = useRoute()
const accountName = route.params.accountName

definePageMeta({
  middleware: 'session-middleware'
})

const { data, error } = await useFetch<ProfileDto>(`/api/account/${accountName}`, {
  baseURL: process.server ? 'http://localhost:3000' : window.location.origin,
  headers: {
    'Content-Type': 'application/json'
  }
})

if (error.value?.statusCode == 404) {
  throw createError({
    statusCode: 404,
    statusMessage: "Account not found"
  });
}

</script>

<template>
 <div v-if="data" class="justify-center h-full flex" >
   <Account :account="data" />
 </div>
</template>

<style scoped>

</style>