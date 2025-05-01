<script lang="ts" setup>
import { useParticipantCreate } from '../model/use-participant-create';
import type { FormSubmitEvent } from "#ui/types";
import type { z } from 'zod';

const { articleId } = defineProps<{
    articleId: string
}>()

const permission = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const { error, isPending, mutation, schema } = useParticipantCreate()

type Schema = z.output<typeof schema>

interface FormState {
  email?: string;  // или string | undefined
  permissionLevel: number;
}

const formState: FormState = reactive({
    email: undefined,
    permissionLevel: permission[0]
})

function submit(e: FormSubmitEvent<Schema>) {
    console.log(e)
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
                    <UInput v-model="formState.email" name="email" />
                </UFormGroup>
                <UFormGroup>
                    <USelectMenu name="permissionLevel" v-model="formState.permissionLevel" :options="permission" />
                </UFormGroup>
            </div>

            <template #footer>
                <UButton :loading="isPending" type="submit" block color="primary">{{ $t("CREATE") }}</UButton>
            </template>
        </UCard>
    </UForm>
</template>