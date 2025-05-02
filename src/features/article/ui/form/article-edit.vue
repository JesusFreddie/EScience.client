<script setup lang="ts">
import { useArticleGet } from '~/src/shared/api/generate/article';
import { useArticleEdit } from '../../model/use-article-edit';
import type {FormSubmitEvent} from "#ui/types";
import type { z } from 'zod';

const { articleId } = defineProps<{
    articleId: string
}>()

const { data: article } = useArticleGet(articleId)

const { articleMutation, isPending, schema } = useArticleEdit()

const formState = reactive({
  title: '',
  description: '',
  isPrivate: false
})

const a = ref<any>('123')

watch(article, () => {
    if (article.value) {
        a.value = 'ffff'
        formState.title = article.value!.title!
        formState.description = article.value!.description ?? ''
        formState.isPrivate = article.value!.isPrivate ?? false
    }
}, { immediate: true })

type Schema = z.output<typeof schema>

function submit(e: FormSubmitEvent<Schema>) {
  const data = e.data
  articleMutation.mutate({
    articleId,
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
      class="flex flex-col flex-1 border-red"
      :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
    >
      <template #header>
        <h2>{{ $t('ARTICLE.EDIT') }}</h2>
      </template>
      
        <div class="flex flex-col gap-2">
          <UFormGroup :label="$t('FORM.LABEL.TITLE')" name="title">
            <UInput v-model="formState.title" :placeholder="$t('FORM.LABEL.TITLE')" name="title" />
          </UFormGroup>
          <UFormGroup :label="$t('FORM.LABEL.DESCRIPTION')" name="description">
            <UTextarea v-model="formState.description" :placeholder="$t('FORM.LABEL.DESCRIPTION')" name="description" />
          </UFormGroup>
          <UCheckbox :label="$t('FORM.LABEL.PRIVATE')" v-model="formState.isPrivate" :placeholder="$t('FORM.LABEL.PRIVATE')" name="is_private" />
        </div>
      
      <template #footer>
        <UButton :loading="isPending" type="submit" block color="primary">{{$t("SAVE")}}</UButton>
      </template>
    </UCard>
  </UForm>
</template>