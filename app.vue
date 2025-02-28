<template>
  <NuxtLayout>
    <NuxtLoadingIndicator/>
    <NuxtPage/>
    <UNotifications/>
  </NuxtLayout>
</template>

<style scoped>

*, *::before, *::after {
  font-family: "Monserrat", sans-serif;
}

</style>
<script setup lang="ts">

onErrorCaptured((error) => {

})

</script>