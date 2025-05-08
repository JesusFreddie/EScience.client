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
const emit = defineEmits<{
  success: []
}>();

watch(branchMutation, (mutation) => {
  if (mutation.isSuccess) {
    emit('success');
  }
});

const formState = reactive({
  name: '',
  parentId: branches[0]?.id || null as string | null,
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

</script>

<template>
<UForm
  :state="formState"
  :schema="schema"
  @submit="submit"
  class="flex flex-col gap-4 max-w-md mx-auto p-6 bg-white rounded-lg"
>
  <UFormGroup 
    :label="$t('BRANCH.FORM.LABEL.NAME')" 
    name="name"
    class="w-full"
  >
    <UInput 
      v-model="formState.name" 
      :placeholder="$t('BRANCH.FORM.LABEL.NAME')" 
      :disabled="isPending"
      class="w-full focus:ring-2 focus:ring-primary-500"
    />
  </UFormGroup>

  <UFormGroup 
    :label="$t('BRANCH.FORM.LABEL.PARENT')" 
    name="parentId"
    class="w-full"
  >
    <USelect
      v-if="branchesOptions.length"
      v-model="formState.parentId" 
      :options="branchesOptions"
      class="w-full focus:ring-2 focus:ring-primary-500"
    />
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