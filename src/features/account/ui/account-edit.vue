<script lang="ts" setup>
import type { ProfileDto } from '~/src/shared/api/model';
import {useProfileUploadAvatar} from "~/src/shared/api/generate/profile";

interface ExtendedProfileDto extends ProfileDto {
  avatarUrl?: string;
}

const props = defineProps<{
  account: ProfileDto
}>();

const emit = defineEmits<{
  (e: 'update', value: ExtendedProfileDto): void
  (e: 'close'): void
}>();

const defaultAvatarUrl = 'https://avatars.githubusercontent.com/u/739984?v=4';
const avatarPreview = ref(defaultAvatarUrl);
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);

const { mutate } = useProfileUploadAvatar()

const form = ref({
  name: props.account.name || '',
  email: props.account.email || '',
  avatarUrl: (props.account as ExtendedProfileDto).avatarUrl || defaultAvatarUrl
});

function onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    mutate({
      data: {
        file: input.files
      }
    })
    selectedFile.value = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        avatarPreview.value = e.target.result as string;
      }
    };
    reader.readAsDataURL(selectedFile.value);
  }
}

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function onSubmit() {
  const updatedProfile: ExtendedProfileDto = {
    id: props.account.id,
    name: form.value.name,
    email: form.value.email,
    avatarUrl: avatarPreview.value
  };

  emit('update', updatedProfile);
  emit('close');
}

function onCancel() {
  emit('close');
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">{{ $t('EDIT_PROFILE') }}</h2>
    <form @submit.prevent="onSubmit">
      <!-- Avatar section -->
      <div class="mb-6">
        <UFormGroup :label="$t('AVATAR')">
          <div class="flex flex-col items-center">
            <UAvatar
              :src="avatarPreview"
              :alt="form.name"
              class="w-[110px] h-[110px] mb-3"
              size="3xl"
              :ui="{
                background: 'bg-gray-100 dark:bg-gray-800',
                placeholder: 'text-gray-500 dark:text-gray-400',
              }"
            />
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onFileSelected"
            />
            <UButton
              type="button"
              variant="outline"
              size="sm"
              @click="triggerFileInput"
            >
              {{ $t('CHANGE_AVATAR') }}
            </UButton>
          </div>
        </UFormGroup>
      </div>

      <!-- Name field -->
      <div class="mb-4">
        <UFormGroup :label="$t('NAME')">
          <UInput v-model="form.name" />
        </UFormGroup>
      </div>

      <!-- Email field -->
      <div class="mb-4">
        <UFormGroup :label="$t('EMAIL')">
          <UInput v-model="form.email" type="email" />
        </UFormGroup>
      </div>

      <!-- Form buttons -->
      <div class="flex justify-end space-x-2">
        <UButton type="button" variant="outline" @click="onCancel">{{ $t('CANCEL') }}</UButton>
        <UButton type="submit" color="primary">{{ $t('SAVE') }}</UButton>
      </div>
    </form>
  </div>
</template>
