<script lang="ts" setup>
import type { ProfileDto } from '~/src/shared/api/model';
import AccountCard from './account-card.vue';
import { useAccountArticleGet } from '~/src/shared/api/generate/account-article';

const { account } = defineProps<{
    account: ProfileDto
}>()

const {} = useAccountArticleGet(account.id)

</script>

<template>

    <div>
        <div>
            <AccountCard :account="account"/>
        </div>
        <div>

        </div>
    </div>

</template>