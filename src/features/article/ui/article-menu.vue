<script setup lang="ts">
import { ArticlePermissionLevel } from '~/src/shared/api/model';
import { exportToWord } from '../helpers/exportToWord'
import type { Editor } from '@tiptap/vue-3'

const { articleId, editor, permisionLevel } = defineProps<{
    articleId: string,
    editor: Editor,
    permisionLevel: number
}>()

const isOpen = ref(false)
const modal = shallowRef<any>(null)
const props = ref<any>(null)
const ui = ref<any>()

const { t } = useI18n()

const isEditor = computed(() => {
    if (permisionLevel >= ArticlePermissionLevel.NUMBER_3)
        return true
    return false
})

const isAuthor = computed(() => {
    if (permisionLevel == ArticlePermissionLevel.NUMBER_4)
        return true
    return false
})

const items = [
    [
        ...(isAuthor.value ? [{
            label: t('SETTINGS'),
            icon: 'i-heroicons-cog-6-tooth-20-solid',
            click: () => {
                modal.value = defineAsyncComponent(() => import('~/src/features/article/ui/article-settings.vue'))
                props.value = {
                    articleId
                }
                ui.value = {
                    width: 'min-w-[1000px]',
                    heigth: 'min-h-[600px]'
                }
                isOpen.value = true
            }
        }] : []),
        {
            label: t('PARTICIPANTS.ADD'),
            icon: 'i-heroicons-user-plus-20-solid',
            click: () => {
                modal.value = defineAsyncComponent(() => import('~/src/features/participant/ui/participant-create.vue'))
                props.value = {
                    articleId
                }
                ui.value = {}
                isOpen.value = true
            }
        },
        {
            label: t('EXPORT_TO_WORD'),
            icon: 'i-heroicons-document-arrow-down-20-solid',
            click: () => {
                exportToWord(editor, 'article')
            }
        },
        ...(isAuthor.value ? [{
            label: t('ARTICLE.ARCHIVE'),
            icon: 'i-heroicons-archive-box-20-solid',
            click: () => {
                modal.value = defineAsyncComponent(() => import('~/src/features/article/ui/form/article-create.vue'))
                isOpen.value = true
                ui.value = {}
            }
        }] : [])
    ]
];

</script>
<template>
    <UDropdown 
        :items="items"
        >
        <UButton color="white" variant="ghost" trailing-icon="qlementine-icons:menu-dots-16" />
    </UDropdown>
    <UModal 
        v-model="isOpen"
        :ui="ui"
        >
        <component :is="modal" v-bind="props"></component>
    </UModal>
</template>