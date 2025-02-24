<script setup lang="ts">
import {useRegisterForm} from "~/src/features/auth/model/use-register-form";
import type {FormSubmitEvent} from "#ui/types";
import {z} from "zod";
import AuthForm from "~/src/features/auth/ui/auth-form.vue";

const { schema, loginMutation, isPending } = useRegisterForm();

const formState = reactive({
  email: undefined,
  password: undefined,
  name: undefined,
  repeatPassword: undefined,
});

type Schema = z.output<typeof schema>

function submit(e: FormSubmitEvent<Schema>) {
  const data = e.data;
  loginMutation.mutate(data)
}

</script>

<template>
  <AuthForm
      :dividerLabel="$t('AUTH.REGISTER')"
      :form-state="formState"
      :schema="schema"
      :submit="submit"
      :is-pending="isPending">
    <UFormGroup :label="$t('INPUT.EMAIL')" name="email">
      <UInput icon="i-heroicons-envelope" v-model="formState.email" id="email" name="email" color="gray" variant="outline" :placeholder="$t('INPUT.EMAIL')" type="text" />
    </UFormGroup>
    <UFormGroup :label="$t('INPUT.NAME')" name="name">
      <UInput v-model="formState.name" name="name" color="gray" variant="outline" :placeholder="$t('INPUT.NAME')" />
    </UFormGroup>
    <UFormGroup :label="$t('INPUT.PASSWORD')" name="password">
      <UInput v-model="formState.password" name="password" color="gray" variant="outline" :placeholder="$t('INPUT.PASSWORD')" type="password" class="border-0" />
    </UFormGroup>
    <UFormGroup :label="$t('INPUT.REPEAT_PASSWORD')" name="repeatPassword">
      <UInput v-model="formState.repeatPassword" name="repeat_password" id="asd" color="gray" variant="outline" :placeholder="$t('INPUT.REPEAT_PASSWORD')" type="password" />
    </UFormGroup>
  </AuthForm>
</template>