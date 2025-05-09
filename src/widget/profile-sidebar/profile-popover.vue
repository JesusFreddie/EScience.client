<script setup lang="ts">
import { useAccountSession } from '~/src/shared/api/generate/account';
import ProfileIcon from '../profile-icon/profile-icon.vue';
import ROUTE from '~/src/shared/consts/ROUTE';

const { t } = useI18n()

const emit = defineEmits(['update:isOpen'])

const { data, isPending } = useAccountSession()

const items = [
  [
    {
      label: t('PROFILE'),
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/739984?v=4'
      }
    },
    {
      label: t('SETTINGS'),
      click: () => {
        navigateTo(ROUTE.ACCOUNT.PROFILE + `/${data.value!.name}`)
      }
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