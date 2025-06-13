<script setup lang="ts">
import { useArticleGetAll, useArticleGetAllFavorite } from "~/src/shared/api/generate/article";
import { useSetFavorite, useRemoveFavorite } from "~/src/shared/api/generate/favorite";
import ArticlesList from "./articles-list.vue";
import type { Article } from "~/src/shared/api/model";

interface ArticlesResponse {
  articles: Article[];
  allCount: number;
}

const currentPageArticle = ref(1);
const pageSizeArticle = ref(10);

const paramsArticle = computed(() => ({
  limit: pageSizeArticle.value,
  offset: currentPageArticle.value
}));

const { data: articles, isPending: isPendingArticle, refetch: refetchArticle } = useArticleGetAll<ArticlesResponse>(paramsArticle);

const currentPageFavorite = ref(1);
const pageSizeFavorite = ref(10);

const paramsFavorite = computed(() => ({
  limit: pageSizeFavorite.value,
  offset: currentPageFavorite.value
}));

const { data: articlesFacorite, isPending: isPendingFavorite, refetch: refetchFavorite } = useArticleGetAllFavorite<ArticlesResponse>(paramsArticle);

const handlePageChangeArticle = (page: number) => {
  currentPageArticle.value = page;
  refetchArticle();
};

const handlePageChangeFavorite = (page: number) => {
  currentPageFavorite.value = page;
  refetchArticle();
};

const { mutate: setFavoriteMutate } = useSetFavorite()
const { mutate: removeFavoriteMutate } = useRemoveFavorite()

function setFavorite(id: string) {
  setFavoriteMutate({
    articleId: id
  })
}

function removeFavorite(id: string) {
  removeFavoriteMutate({
    articleId: id
  })
}
</script>

<template>
  <div>
    <div class="flex justify-between">
      <h1 class="mb-3">{{ $t("ARTICLE.ARTICLES") }}</h1>
      <div class="flex justify-center">
        <UPagination v-if="articles && articles.allCount > 1" v-model="currentPageArticle" :total="articles.allCount" :ui="{
          wrapper: 'flex items-center justify-center',
          default: {
            size: 'md',
            activeButton: {
              color: 'primary'
            }
          }
        }" @update:model-value="handlePageChangeArticle" />
      </div>
    </div>
    <div class="space-y-6">
      <div class="">
        <ArticlesList 
          v-if="articles?.articles" 
          :articles="articles.articles"
          @removeFavorite="removeFavorite"
          @setFavorite="setFavorite" 
          />
        <USkeleton v-if="isPendingArticle" v-for="item in pageSizeArticle" :key="item" class="w-[427px] h-[151px]" />
      </div>


    </div>
  </div>
  <!-- <div>
    <div class="flex justify-between">
      <h1 class="mb-3">{{ $t("ARTICLE.ARTICLES") }}</h1>
      <div class="flex justify-center">
        <UPagination v-if="articlesFacorite && articlesFacorite.allCount > 1" v-model="currentPageArticle" :total="articlesFacorite.allCount" :ui="{
          wrapper: 'flex items-center justify-center',
          default: {
            size: 'md',
            activeButton: {
              color: 'primary'
            }
          }
        }" @update:model-value="handlePageChangeFavorite" />
      </div>
    </div>
    <div class="space-y-6">
      <div class="">
        <ArticlesList 
          v-if="articlesFacorite?.articles" 
          :articles="articlesFacorite.articles" 
          @removeFavorite="removeFavorite"
          @setFavorite="setFavorite"
          />
        <USkeleton v-if="isPendingFavorite" v-for="item in pageSizeFavorite" :key="item" class="w-[427px] h-[151px]" />
      </div>


    </div>
  </div> -->
</template>

<style scoped></style>