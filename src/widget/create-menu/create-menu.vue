<script setup lang="ts">
import ROUTE from "~/src/shared/consts/ROUTE";

const isOpen = ref(false)

const page = ref<any>(null)

const router = useRouter()
const route = useRoute()

const items = [
  [{
    label: 'Create',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      page.value = defineAsyncComponent(() => import('~/src/features/article/ui/form/article-create.vue'))
      isOpen.value = true
    }
  }]
]

</script>

<template>
  <UDropdown
    :items="items"
    :popper="{ placement: 'bottom-start' }"
  >
    <UButton color="white"  variant="ghost" trailing-icon="ri:add-fill" />
  </UDropdown>

  <USlideover 
    class="flex-1 pr-2 py-2" 
    v-model="isOpen"
    :ui="{
      rounded: 'rounded'
    }"
    >
    <component :is="page" v-if="isOpen" />
  </USlideover>
</template>

<style scoped>

</style>