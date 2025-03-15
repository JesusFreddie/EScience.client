<script setup lang="ts">
import type {Account} from "~/src/shared/api/model";
const route = useRoute()
const accountName = route.params.accountName

const { data, error } = await useFetch<Account>(`/api/account/${accountName}`, {
  baseURL: process.server ? 'http://localhost:3000' : window.location.origin,
  headers: {
    'Content-Type': 'application/json'
  }
})

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Account not found"
  });
}

</script>

<template>
 <div v-if="data">
   {{ data.name }}
   {{ data.email }}
 </div>
</template>

<style scoped>

</style>