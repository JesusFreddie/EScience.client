<script setup lang="ts">

const links =  [
  {
    label: 'Home',
    to: "/"
  },
  {
    label: 'About',
    to: "/about"
  },
  {
    label: 'Contacts',
    to: "/contacts"
  },
]

</script>

<template>
  <UVerticalNavigation
      class="py-4 px-3 gap-0.5 bg-bg-100 h-full rounded-md sticky"
      :links="links" >
    <template #default="{ link }">
        <span class="group-hover:text-primary relative h-10 flex items-center">
          {{ link.label }}
        </span>
    </template>
  </UVerticalNavigation>
</template>

<style scoped>

</style>