<script lang="ts" setup>
import type { ProfileDto } from '~/src/shared/api/model';
import AccountEdit from './account-edit.vue';

interface ExtendedProfileDto extends ProfileDto {
  avatarUrl?: string;
}

const { account } = defineProps<{
    account: ProfileDto
}>();

const isEditModalOpen = ref(false);
const defaultAvatarUrl = 'https://avatars.githubusercontent.com/u/739984?v=4';
const localAccount = ref<ExtendedProfileDto>({ 
    ...account,
    avatarUrl: (account as ExtendedProfileDto).avatarUrl || defaultAvatarUrl
});

function openEditModal() {
    isEditModalOpen.value = true;
}

function handleUpdate(updatedAccount: ExtendedProfileDto) {

    if (updatedAccount.avatarUrl) {}
    Object.assign(localAccount.value, updatedAccount);
}
</script>

<template>
    <div>
        <div class="flex items-center">
            <div>
                <UAvatar 
                    :alt="localAccount.name" 
                    :src="localAccount.avatarUrl" 
                    :ui="{
                        background: 'bg-gray-100 dark:bg-gray-800',
                        placeholder: 'text-gray-500 dark:text-gray-400',
                    }" 
                    class="w-[110px] h-[110px]" 
                    size="3xl" 
                />
            </div>
            <div class="ml-4">
                <p class="text-lg font-medium">{{ localAccount.name }}</p>
                <p class="text-gray-600 dark:text-gray-400">{{ localAccount.email }}</p>
            </div>
        </div>
        <!-- <UButton class="mt-4" variant="outline" block @click="openEditModal">{{ $t('EDIT') }}</UButton> -->

        <UModal v-model="isEditModalOpen">
            <AccountEdit 
                :account="localAccount" 
                @update="handleUpdate" 
                @close="isEditModalOpen = false" 
            />
        </UModal>
    </div>
</template>
