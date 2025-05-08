<script lang="ts" setup>
import type { ProfileDto } from '~/src/shared/api/model';
import AccountInfo from './account-info.vue';

const { account } = defineProps<{
    account: ProfileDto
}>()

</script>

<template>
    <div>
        <div>
            <AccountInfo :account="account" />
        </div>
        <UDivider/>
        <div>
            <p>Info</p>
        </div>
    </div>
</template>