<script setup lang="ts">
import {useQuery} from "@tanstack/vue-query";

const isOpen = ref(false);

const toast = useToast()

</script>

<template>
  <h1>{{ $t("welcome") }}</h1>

  <UButton class="bg-primary" color="primary" @click="isOpen = true">Открыть</UButton>

  <UButton @click="toast.add({ title: 'Hello', color: 'green'  })">Click</UButton>

  <USlideover v-model="isOpen">
    <div class="p-4 flex-1">
      <UButton
          color="gray"
          variant="ghost"
          size="xl"
          icon="i-heroicons-x-mark-20-solid"
          class="flex sm:hidden absolute end-5 top-5 z-10"
          square
          padded
          @click="isOpen = false"
      />
      <Placeholder class="h-full" />
    </div>
  </USlideover>
</template>