<script lang="ts" setup>
import { useParticipantGetAllByArticle } from '~/src/shared/api/generate/article-participant';

const { articleId } = defineProps<{
    articleId: string
}>()

const { data: participants } = useParticipantGetAllByArticle(articleId)

</script>

<template>

    <UAvatarGroup size="sm" :max="5">
        <UAvatar
            v-for="p in participants"
            :alt="p.id"
        />
    </UAvatarGroup>

</template>