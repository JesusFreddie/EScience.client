<script setup lang="ts">

import NavBar from "~/src/widget/nav-bar/nav-bar.vue";
import Header from "~/src/widget/header/header.vue";
</script>

<template>
  <div class="pt-5 px-4 h-screen">
    <Header class="mb-3" />
    <main class="grid grid-cols-[220px_1fr] h-[100%] max-h-screen overflow-hidden">
      <NavBar/>
      <div class="px-2  ">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>