<script setup lang="ts">
import CreateMenu from "~/src/widget/create-menu/create-menu.vue";
import ROUTE from "~/src/shared/consts/ROUTE";
import ProfilePopover from "../profile-sidebar/profile-popover.vue";

</script>

<template>
  <header class="mb-2 py-3.5 px-6 bg-bg-100 dark:bg-bg-dark-200 flex items-center justify-between rounded-md shadow">
    <div class="font-medium">
      <NuxtLink :to="ROUTE.HOME">EScience</NuxtLink>
    </div>
    <div class="flex items-center justify-between gap-3">
      <CreateMenu/>
      <!-- <ProfileIcon/> -->
      <ProfilePopover/>
    </div>
  </header>
</template>

<style scoped>

</style>