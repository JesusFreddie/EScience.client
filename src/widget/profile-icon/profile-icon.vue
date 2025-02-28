<script setup lang="ts">
import ProfileSidebar from "~/src/widget/profile-sidebar/profile-sidebar.vue";

const isOpen = ref(false)
</script>

<template>
  <div class="flex flex-col gap-1 items-center justify-center">
    <p>Constantine</p>
    <USkeleton @click="isOpen = !isOpen" class="w-[50px] h-[50px]"/>
  </div>

</template>

<style scoped>

</style>