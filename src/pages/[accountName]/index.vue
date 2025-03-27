<script setup lang="ts">
import type {ProfileDto} from "~/src/shared/api/model";
const route = useRoute()
const accountName = route.params.accountName

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
const account = data;

</script>

<template>
 <div v-if="account">
   {{ account.name }}
   {{ account.email }}
 </div>
</template>

<style scoped>

</style>