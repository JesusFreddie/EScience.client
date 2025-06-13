<script setup lang="ts">
import {useArticleCreate} from "~/src/features/article/model/use-article-create";
import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";
import { useQueryClient } from '@tanstack/vue-query';

const queryClient = useQueryClient();
const { isPending, articleMutation, schema } = useArticleCreate()

const emit = defineEmits<{
  success: []
}>()

const formState = reactive({
  title: undefined,
  description: undefined,
  isPrivate: false
})

type Schema = z.output<typeof schema>

watch(articleMutation, (mutation) => {
  if (mutation.isSuccess) {
    queryClient.invalidateQueries({ queryKey: ['articles'] });
    emit('success')
  }
})

function submit(e: FormSubmitEvent<Schema>) {
  const data = e.data
  articleMutation.mutate({
    data
  })
}
</script>

<template>
  <UForm
      :state="formState"
      :schema="schema"
      @submit="submit"
      class="flex flex-col flex-1"
      >
    <UCard
      class="flex flex-col flex-1"
      :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        <h2>{{ $t('ARTICLE.CREATE') }}</h2>
      </template>
      
        <div class="flex flex-col gap-4">
          <UFormGroup :label="$t('FORM.LABEL.TITLE')" name="title">
            <UInput v-model="formState.title" :placeholder="$t('FORM.LABEL.TITLE')" name="title" />
          </UFormGroup>
          <UFormGroup :label="$t('FORM.LABEL.DESCRIPTION')" name="description">
            <UTextarea v-model="formState.description" :placeholder="$t('FORM.LABEL.DESCRIPTION')" name="description" />
          </UFormGroup>
          <UCheckbox :label="$t('FORM.LABEL.PRIVATE')" v-model="formState.isPrivate" :placeholder="$t('FORM.LABEL.PRIVATE')" name="is_private" />
        </div>
      
      <template #footer>
        <UButton :loading="isPending" type="submit" block color="primary">{{$t("CREATE")}}</UButton>
      </template>
    </UCard>
  </UForm>

</template>

<style scoped>

</style>