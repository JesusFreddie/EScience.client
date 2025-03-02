<script setup lang="ts">
const route = useRoute()
const name = route.params.accountName
</script>

<template>
<div>
  Name: {{ name }}
</div>
</template>

<style scoped>

</style>