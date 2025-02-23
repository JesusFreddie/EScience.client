<script setup lang="ts">
import {useRegisterForm} from "~/src/features/auth/model/use-register-form";
import type {FormSubmitEvent} from "#ui/types";
import {z} from "zod";
import AuthForm from "~/src/features/auth/ui/auth-form.vue";

const { schema, loginMutation } = useRegisterForm();

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
  <AuthForm :dividerLabel="$t('AUTH.REGISTER')" :form-state="formState" :schema="Schema" :submit="submit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="formState.email" id="email" name="email" color="gray" variant="outline" placeholder="Email" type="text" />
    </UFormGroup>
    <UFormGroup label="User Name" name="name">
      <UInput v-model="formState.name" name="name" color="gray" variant="outline" placeholder="Name" />
    </UFormGroup>
    <UFormGroup label="Password" name="password">
      <UInput v-model="formState.password" name="password" color="gray" variant="outline" placeholder="Password" type="password" class="border-0" />
    </UFormGroup>
    <UFormGroup label="Repeat Password" name="repeatPassword">
      <UInput v-model="formState.repeatPassword" name="repeat_password" id="asd" color="gray" variant="outline" placeholder="Repeat Password" type="password" />
    </UFormGroup>
  </AuthForm>
</template>