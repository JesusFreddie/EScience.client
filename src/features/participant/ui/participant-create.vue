<script lang="ts" setup>
import { useParticipantCreate } from '../model/use-participant-create';
import type { FormSubmitEvent } from "#ui/types";
import type { z } from 'zod';
import { usePermissionLevels } from '../model/use-permission-levels';

const { t } = useI18n()

const { articleId } = defineProps<{
    articleId: string
}>()

const { permission } = usePermissionLevels()

const { error, isPending, mutation, schema } = useParticipantCreate()

type Schema = z.output<typeof schema>

interface FormState {
  email?: string
  permissionLevel: number
}

const formState: FormState = reactive({
    email: '',
    permissionLevel: 1
})

function submit(e: FormSubmitEvent<Schema>) {
    const data = e.data
    mutation({
        articleId: articleId,
        data
    })
}

</script>

<template>
    <UForm :state="formState" :schema="schema" @submit="submit">
        <UCard>
            <template #header>
                Добавить дебила
            </template>
            
            <div>
                <UFormGroup>
                    <UInput icon="i-heroicons-envelope" v-model="formState.email" id="email" name="email" color="gray" variant="outline" :placeholder="$t('INPUT.EMAIL')" type="text" />
                </UFormGroup>
                <UFormGroup>
                    <USelect
                        v-model="formState.permissionLevel"
                        :options="permission"
                    />
                </UFormGroup>
            </div>

            <template #footer>
                <UButton :loading="isPending" type="submit" block color="primary">{{ $t("CREATE") }}</UButton>
            </template>
        </UCard>
    </UForm>
</template>