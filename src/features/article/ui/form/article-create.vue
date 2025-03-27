<script setup lang="ts">
import {useArticleCreate} from "~/src/features/article/model/use-article-create";
import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";

const { isPending, articleMutation, schema } = useArticleCreate()

const formState = reactive({
  title: undefined,
  description: undefined,
  isPrivate: false
})

type Schema = z.output<typeof schema>

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
      @submit="submit">
    <UFormGroup :label="$t('FORM.LABEL.TITLE')" name="title">
      <UInput v-model="formState.title" :placeholder="$t('FORM.LABEL.TITLE')" name="title" />
    </UFormGroup>
    <UFormGroup :label="$t('FORM.LABEL.DESCRIPTION')" name="description">
      <UInput v-model="formState.description" :placeholder="$t('FORM.LABEL.DESCRIPTION')" name="description" />
    </UFormGroup>
    <UFormGroup :label="$t('FORM.LABEL.PRIVATE')" name="is_private">
      <UCheckbox v-model="formState.isPrivate" :placeholder="$t('FORM.LABEL.PRIVATE')" name="is_private" />
    </UFormGroup>
    <UButton :loading="isPending" type="submit" block color="primary">{{$t("CREATE")}}</UButton>
  </UForm>
</template>

<style scoped>

</style>