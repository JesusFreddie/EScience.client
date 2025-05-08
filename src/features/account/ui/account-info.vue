<script lang="ts" setup>
import type { ProfileDto } from '~/src/shared/api/model';


const { account } = defineProps<{
    account: ProfileDto
}>()

</script>

<template>
    <div>
        <div class="flex">
            <div>
                <UAvatar :src="account.id" :ui="{
                    background: 'bg-gray-100 dark:bg-gray-800',
                    placeholder: 'text-gray-500 dark:text-gray-400'
                }" class="w-[32px] h-[32px]" size="md" />
            </div>
            <div>
                <p>{{ account.name }}</p>
                <p>{{ account.name }}</p>
                <p>{{ account.email }}</p>
            </div>
        </div>
        <UButton block>{{ $t('EDIT') }}</UButton>
    </div>
</template>