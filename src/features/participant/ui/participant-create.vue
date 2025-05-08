<script lang="ts" setup>
import { useParticipantCreate } from '../model/use-participant-create';
import type { FormSubmitEvent } from "#ui/types";
import type { z } from 'zod';
import { usePermissionLevels } from '../model/use-permission-levels';
import { ArticlePermissionLevel } from '~/src/shared/api/model';

const { t } = useI18n()

const { articleId } = defineProps<{
    articleId: string
}>()

const { permission } = usePermissionLevels()
const { error, isPending, mutation, schema } = useParticipantCreate()

type Schema = z.output<typeof schema>

const formState = reactive({
    email: '',
    permissionLevel: ArticlePermissionLevel.NUMBER_1
})

function submit(e: FormSubmitEvent<Schema>) {
    mutation({
        articleId,
        data: {
            email: e.data.email,
            permissionLevel: e.data.permissionLevel
        }
    })
}
</script>

<template>
    <UForm :state="formState" :schema="schema" @submit="submit" class="flex flex-col gap-4">
        <UCard :ui="{ body: { base: 'flex-1 space-y-4' } }">
            <template #header>
                <h3 class="text-base font-semibold">{{ $t('PARTICIPANT.INVITE') }}</h3>
            </template>

            <UFormGroup :label="$t('INPUT.EMAIL')" name="email">
                <UInput
                    v-model="formState.email"
                    icon="i-heroicons-envelope"
                    name="email"
                    color="gray"
                    variant="outline"
                    :placeholder="$t('INPUT.EMAIL')"
                    type="text"
                />
            </UFormGroup>

            <UFormGroup :label="$t('PARTICIPANT.PERMISSION_LEVEL')" name="permissionLevel">
                <USelect
                    v-model.number="formState.permissionLevel"
                    :options="permission"
                    :placeholder="$t('PARTICIPANT.SELECT_PERMISSION')"
                />
            </UFormGroup>

            <template #footer>
                <UButton
                    type="submit"
                    :loading="isPending"
                    :disabled="isPending"
                    block
                    color="primary"
                >
                    {{ $t("PARTICIPANT.INVITE") }}
                </UButton>
            </template>
        </UCard>
    </UForm>
</template>