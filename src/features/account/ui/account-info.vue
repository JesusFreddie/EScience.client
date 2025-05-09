<script lang="ts" setup>
import type { ProfileDto } from '~/src/shared/api/model';


const { account } = defineProps<{
    account: ProfileDto
}>()

</script>

<template>
    <div>
        <div class="flex items-center">
            <div>
                <UAvatar :alt="account.name" :src="'https://avatars.githubusercontent.com/u/739984?v=4'" :ui="{
                    background: 'bg-gray-100 dark:bg-gray-800',
                    placeholder: 'text-gray-500 dark:text-gray-400',
                }" class="w-[110px] h-[110px]" size="3xl" />
            </div>
            <div>
                <p>{{ account.name }}</p>
                <p>{{ account.name }}</p>
                <p>{{ account.email }}</p>
            </div>
        </div>
        <UButton class="mt-2" variant="outline" block>{{ $t('EDIT') }}</UButton>
    </div>
</template>