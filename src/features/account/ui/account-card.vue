<script lang="ts" setup>
import type { ProfileDto } from '~/src/shared/api/model';
import AccountInfo from './account-info.vue';
import AccountFields from './account-fields.vue';

const { account } = defineProps<{
    account: ProfileDto
}>()


</script>

<template>
    <div class="flex flex-col gap-2">
        <div>
            <AccountInfo :account="account" />
        </div>
        <UDivider/>
        <div>
            <AccountFields/>
        </div>
    </div>
</template>