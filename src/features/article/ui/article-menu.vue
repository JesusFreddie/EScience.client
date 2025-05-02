<script setup lang="ts">

const { articleId } = defineProps<{
    articleId: string
}>()

const isOpen = ref(false)
const modal = shallowRef<any>(null)
const props = ref<any>(null)

const { t } = useI18n()



const items = [
    [{
        label: t('SETTINGS'),
        icon: 'i-heroicons-cog-6-tooth-20-solid',
        click: () => {
            modal.value = defineAsyncComponent(() => import('~/src/features/article/ui/article-settings.vue'))
            props.value = {
                articleId
            }
            isOpen.value = true
        }
    },{
        label: t('PARTICIPANTS.ADD'),
        icon: 'i-heroicons-user-plus-20-solid',
        click: () => {
            modal.value = defineAsyncComponent(() => import('~/src/features/participant/ui/participant-create.vue'))
            props.value = {
                articleId
            }
            isOpen.value = true
        }
    },{
        label: t('ARTICLE.ARCHIVE'),
        icon: 'i-heroicons-archive-box-20-solid',
        click: () => {
            modal.value = defineAsyncComponent(() => import('~/src/features/article/ui/form/article-create.vue'))
            isOpen.value = true
        }
    },]
];

</script>
<template>
    <UDropdown 
        :items="items"
        >
        <UButton color="white" variant="ghost" trailing-icon="qlementine-icons:menu-dots-16" />
    </UDropdown>
    <UModal v-model="isOpen">
        <component :is="modal" v-bind="props"></component>
    </UModal>
</template>