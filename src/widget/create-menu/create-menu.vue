<script setup lang="ts">
import ROUTE from "~/src/shared/consts/ROUTE";

const isOpen = ref(false)

const router = useRouter()
const route = useRoute()

const items = [
  [{
    label: 'Create',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      navigateTo(ROUTE.CREATE_ARTICLE)
    }
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
    disabled: true
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }]
]

</script>

<template>
  <UDropdown
      :items="items"
      :popper="{ placement: 'bottom-start' }"
      :ui="{ background: 'bg-red-100' }"
  >
    <UButton color="white"  variant="ghost" trailing-icon="ri:add-fill" />
  </UDropdown>

  <USlideover class="flex-1" v-model="isOpen">
    <UCard
        class="flex flex-col flex-1"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        <h4 v-if="data" >{{ data.name }}</h4>
        <div v-if="isPending">
          <USkeleton class="w-1/3 h-10" />
        </div>
      </template>

<!--      <template #default>-->
<!--        <component :is="page" v-if="isOpen" />-->
<!--      </template>-->
    </UCard>
  </USlideover>
</template>

<style scoped>

</style>