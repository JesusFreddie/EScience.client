<script setup lang="ts">
import ProfileIcon from "~/src/widget/profile-icon/profile-icon.vue";
import ProfileSidebar from "~/src/widget/profile-sidebar/profile-sidebar.vue";
import CreateMenu from "~/src/widget/create-menu/create-menu.vue";
const d = ref(false)

</script>

<template>
  <header class="mb-2 py-3.5 px-6 bg-bg-100 flex items-center justify-between rounded-md">
    <div class="font-medium">EScience</div>
    <div class="flex items-center justify-between gap-3">
      <CreateMenu/>
      <ProfileIcon/>
    </div>
  </header>
  <ProfileSidebar v-model:isOpen="d" />
</template>

<style scoped>

</style>