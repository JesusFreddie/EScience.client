<script setup lang="ts">
import { useCreateBranch } from "~/src/features/article/model/use-create-branch";
import type { FormSubmitEvent } from "#ui/types";
import type { z } from "zod";
import type { ArticleBranch } from "~/src/shared/api/model";

const { schema, isPending, branchMutation } = useCreateBranch();

const { branches, articleId } = defineProps<{
  articleId: string;
  branches: ArticleBranch[];
}>();

const formState = reactive({
  name: '',
  parentId: null as string | null,
});

const branchesOptions = computed(() => {
  return branches.map(branch => ({
    label: branch.name,
    value: branch.id,
  }));
});

async function submit(e: FormSubmitEvent<z.output<typeof schema>>) {
  branchMutation.mutate({
    articleId: articleId,
    data: {
      name: e.data.name,
      parentId: e.data.parentId
    }
  });
}



// const branchesOptions = [
//   {
//     label: "ASD",
//     value: "ASD"
//   },
//   {
//     label: "ASD",
//     value: "ASD"
//   },
//   {
//     label: "ASD",
//     value: "ASD"
//   },
//   {
//     label: "ASD",
//     value: "ASD"
//   },
// ]

</script>

<template>
  <UForm
    :state="formState"
    :schema="schema"
    @submit="submit"
  >
    <UFormGroup :label="$t('BRANCH.FORM.LABEL.NAME')" name="name">
      <UInput 
        v-model="formState.name" 
        :placeholder="$t('BRANCH.FORM.LABEL.NAME')" 
        :disabled="isPending"
      />
    </UFormGroup>

    <UFormGroup :label="$t('BRANCH.FORM.LABEL.PARENT')" name="parentId">
      <USelect
        v-if="branchesOptions.length"
        v-model="formState.parentId" 
        :options="branchesOptions"
      ></USelect>
    </UFormGroup>

    <UButton 
      type="submit" 
      :loading="isPending"
      :disabled="isPending"
    >
      {{ $t("FORM.CREATE") }}
    </UButton>
  </UForm>
</template>