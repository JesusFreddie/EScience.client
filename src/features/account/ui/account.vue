<script lang="ts" setup>
import type { ProfileDto } from '~/src/shared/api/model';
import AccountCard from './account-card.vue';
import { useArticleGetByAccountId, useArticleGetCountByAccountId } from '~/src/shared/api/generate/article';
import ArticlesList from '../../article/ui/articles-list.vue';

const { account } = defineProps<{
    account: ProfileDto
}>()

const page = ref<number>(1)

const params = computed(() => ({
    page: page.value
}));

const { data: articles, refetch, isPending: isArticlePending } = useArticleGetByAccountId(account.id!, params)

watch(page, (newValue) => {
    refetch()
})

const { data: countArticles } = useArticleGetCountByAccountId(account.id!)

</script>

<template>
    <div class="flex w-[1219px] ">
        <div class="flex gap-10">
            <div>
                <AccountCard :account="account"/>
            </div>
            <div v-if="articles" class="w-[862px] justify-end">
                <div class="h-[640px]">
                    <ArticlesList :articles="articles" />
                    <USkeleton v-if="isArticlePending" v-for="item in 10" :key="item" class="w-[427px] h-[151px]" />
                </div>
                <UPagination class="float-right" v-if="countArticles && countArticles.count! > articles.length" v-model="page"  :total="countArticles.count" />
            </div>
        </div>
    </div>
</template>