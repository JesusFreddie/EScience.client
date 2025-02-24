<script setup lang="ts">
import {useRegisterForm} from "~/src/features/auth/model/use-register-form";
import type {FormSubmitEvent} from "#ui/types";
import {z} from "zod";
import AuthForm from "~/src/features/auth/ui/auth-form.vue";
import {useLoginForm} from "~/src/features/auth/model/use-login-form";

const { schema, loginMutation, isPending } = useLoginForm();

const formState = reactive({
  email: undefined,
  password: undefined,
});

type Schema = z.output<typeof schema>

function submit(e: FormSubmitEvent<Schema>) {
  const data = e.data;
  loginMutation.mutate(data)
}
</script>

<template>
  <AuthForm
      :dividerLabel="$t('AUTH.LOGIN')"
      :formState="formState"
      :schema="schema"
      :submit="submit"
      :is-pending="isPending">
    <UFormGroup :label="$t('INPUT.EMAIL')" name="email">
      <UInput icon="i-heroicons-envelope" v-model="formState.email" id="email" name="email" color="gray" variant="outline" :placeholder="$t('INPUT.EMAIL')" type="text" />
    </UFormGroup>
    <UFormGroup :label="$t('INPUT.PASSWORD')" name="password">
      <UInput v-model="formState.password" name="password" color="gray" variant="outline" :placeholder="$t('INPUT.PASSWORD')" type="password" class="border-0" />
    </UFormGroup>
  </AuthForm>
</template>