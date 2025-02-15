<script setup lang="ts">
import TextField from "~/src/shared/ui/text-field.vue";
</script>

<template>
  <form class="bg-bg-100 rounded-md pt-20 flex flex-col items-center w-max px-24 pb-28 min-w-[600px]">
    <h3 class="mb-12 font-medium text-2xl">Register</h3>

    <div class="mb-12 w-full">
      <TextField label="Email">
        <UInput color="gray" variant="outline" te placeholder="Email" type="email" />
      </TextField>
      <TextField label="User Name">
        <UInput color="gray" variant="outline" te placeholder="Email" />
      </TextField>
      <TextField label="Password">
        <UInput color="gray" variant="outline" te placeholder="Email" type="password" />
      </TextField>
      <TextField label="Repeat Password">
        <UInput id="asd" color="gray" variant="outline" te placeholder="Email" type="password" />
      </TextField>
    </div>

    <UButton type="submit" block color="sky">Continue</UButton>
  </form>
</template>

<style scoped>

</style>