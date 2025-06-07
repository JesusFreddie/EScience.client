<script setup lang="ts">
import { useAccountSession } from '~/src/shared/api/generate/account';
import ProfileIcon from '../profile-icon/profile-icon.vue';
import ROUTE from '~/src/shared/consts/ROUTE';
import { useProfileStore } from '~/src/shared/store/auth.store';
import { useAuthLogout } from '~/src/shared/api/generate/auth';

const { mutate: logout } = useAuthLogout()
const authStore = useProfileStore()

const { t } = useI18n()

const emit = defineEmits(['update:isOpen'])

const { data, isPending } = useAccountSession()

const isSettingsOpen = ref(false)
const settingsComponent = ref<any>(null)

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
        navigateTo('/' + data.value!.name!)
      }
    },
    {
      label: t('SETTINGS'),
      click: () => {
        settingsComponent.value = defineAsyncComponent(() => import('./settings-component.vue'))
        isSettingsOpen.value = true
      }
    },
    {
      label: t('AUTH.LOGOUT'),
      click: () => {
        logout()
        emit('update:isOpen', false)
        navigateTo(ROUTE.LOGIN)
      }
    }
  ]
]

</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <ProfileIcon url="https://avatars.githubusercontent.com/u/739984?v=4"/>
  </UDropdown>

  <USlideover 
    class="flex-1 pr-2 py-2" 
    v-model="isSettingsOpen"
    :ui="{
      rounded: 'rounded'
    }"
  >
    <component :is="settingsComponent" v-if="isSettingsOpen" />
  </USlideover>
</template>

<style scoped>

</style>
