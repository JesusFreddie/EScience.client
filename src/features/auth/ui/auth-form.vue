<script setup lang="ts">

const { formState, schema, submit } = defineProps<{
  dividerLabel: string,
  formState: object,
  schema: object,
  isPending?: boolean,
  submit: () => void
}>();

</script>

<template>
  <UForm
      :state="formState"
      :schema="schema"
      @submit="submit"
      class="auth-form bg-bg-100 rounded-md pt-20 flex flex-col items-center w-max px-20 pb-28 min-w-[600px]">
    <UDivider class="mb-12 font-normal" :ui="{ label: 'text-2xl font-normal' }" :label="dividerLabel" />
    <div class="mb-12 w-full flex flex-col gap-4">
      <slot></slot>
    </div>
    <UButton :loading="isPending" type="submit" block color="primary">{{ $t('CONTINUE') }}</UButton>
  </UForm>
</template>

<style scoped>
.auth-form {
  position: relative;
}

.auth-form::before {
  content: "";
  display: block;
  width: 442px;
  height: 442px;
  position: absolute;
  background: rgba(95, 82, 246, 0.3);
  top: -100px;
  left: -588px;
  border-radius: 50%;
  z-index: -1;
  filter: blur(250px);
}

.auth-form::after {
  content: "";
  display: block;
  width: 442px;
  height: 442px;
  position: absolute;
  background: rgba(134, 246, 82, 0.2);
  bottom: -100px;
  right: -588px;
  border-radius: 50%;
  z-index: -1;
  filter: blur(250px);
}
</style>