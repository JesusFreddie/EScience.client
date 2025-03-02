<script setup lang="ts">
const isOpen = ref(false);
const toast = useToast()
</script>

<template>
  <h1>{{ $t("welcome") }}</h1>

  <UButton class="bg-primary" color="primary" @click="isOpen = true">Открыть</UButton>

  <UButton @click="toast.add({ title: 'Hello', color: 'green'  })">Click</UButton>

  <USlideover v-model="isOpen">
    <UCard
        class="flex flex-col flex-1"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        Header
      </template>

      Body

      <template #footer>
        <UButton>Отправить</UButton>
      </template>
    </UCard>
  </USlideover>
</template>