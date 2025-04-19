<script setup lang="ts">
import NavBar from "~/src/widget/nav-bar/nav-bar.vue";
import Header from "~/src/widget/header/header.vue";
</script>

<template>
  <div class="pt-5 px-4">
    <Header class="mb-3" />
    <main class="main grid grid-cols-[220px_1fr] h-[90vh]">
      <NavBar/>
      <div class="pl-10 pt-6">
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
  position: absolute;
  background: rgba(246, 82, 82, 0.2);
  bottom: 0;
  right: 0;
  border-radius: 50%;
  z-index: -1;
  filter: blur(250px);
}
</style>