<script setup lang="ts">
import ProfileSidebar from "~/src/widget/profile-sidebar/profile-sidebar.vue";

const isOpen = ref(false)
</script>

<template>
  <div class="flex gap-1 items-center justify-center cursor-pointer">
    <USkeleton @click="isOpen = !isOpen" class="w-[32px] h-[32px]"/>
    <ProfileSidebar v-model:is-open="isOpen"/>
  </div>

</template>

<style scoped>

</style>