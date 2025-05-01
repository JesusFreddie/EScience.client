<script setup lang="ts">

const isOpen = ref(false)

const page = ref<any>(null)

const items = [
    [{
        label: 'Create',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => {
            page.value = defineAsyncComponent(() => import('~/src/features/article/ui/form/article-create.vue'))
            isOpen.value = true
        }
    }]
];

</script>
<template>
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
        <UButton color="white" variant="ghost" trailing-icon="qlementine-icons:menu-dots-16" />
    </UDropdown>
</template>