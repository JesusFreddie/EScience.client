<script setup lang="ts">
import NavBar from "~/src/widget/nav-bar/nav-bar.vue";
import Header from "~/src/widget/header/header.vue";

</script>

<template>
  <div class="h-screen flex flex-col pt-5 px-4">
    <Header class="mb-3" />
    <main class="main flex-1 grid grid-cols-[220px_1fr] pb-5">
      <NavBar class="pt-6"/>
      <div class="pl-10 pt-6 h-[calc(100vh-105px)] overflow-y-auto custom-scrollbar">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<style scoped>
.main::after {
  content: "";
  display: block;
  width: 442px;
  height: 442px;
  position: fixed;
  background: rgba(246, 82, 82, 0.2);
  bottom: 0;
  right: 0;
  border-radius: 50%;
  z-index: -1;
  filter: blur(250px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>