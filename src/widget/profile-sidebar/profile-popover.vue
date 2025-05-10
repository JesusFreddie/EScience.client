<script setup lang="ts">
import { useAccountSession } from '~/src/shared/api/generate/account';
import ProfileIcon from '../profile-icon/profile-icon.vue';
import ROUTE from '~/src/shared/consts/ROUTE';
import { useProfileStore } from '~/src/shared/store/auth.store';

const authStore = useProfileStore()

const { t } = useI18n()

const emit = defineEmits(['update:isOpen'])

const { data, isPending } = useAccountSession()

watch(data, (newValue) => {
  if (newValue) {
    authStore.setProfile(newValue)
  }
})

const items = [
  [
    {
      label: t('PROFILE'),
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/739984?v=4'
      },
      click: () => {
        navigateTo(data.value!.name!)
      }
    },
    {
      label: t('SETTINGS'),
      
    },
    {
      label: t('AUTH.LOGOUT')
    }
  ]
]

</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <ProfileIcon url="https://avatars.githubusercontent.com/u/739984?v=4"/>
  </UDropdown>
</template>

<style scoped>

</style>