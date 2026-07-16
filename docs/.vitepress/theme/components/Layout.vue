<script setup lang="ts">
import {computed} from "vue";
import {useData} from "vitepress";
import {isPostDetail, isPostIndex} from "../../utils/page";
import ArticleFooter from "./ArticleFooter.vue";
import ArticleHeader from "./ArticleHeader.vue";
import BaseLayout from "./VPLayout.vue";

const {page} = useData();
const postIndex = computed(() => isPostIndex(page.value.relativePath));
const postDetail = computed(() => isPostDetail(page.value.relativePath));
</script>

<template>
  <BaseLayout>
    <template #doc-before>
      <ArticleHeader v-if="!postIndex" :is-post="postDetail"/>
    </template>
    <template #doc-footer-before>
      <ArticleFooter v-if="postDetail"/>
    </template>
  </BaseLayout>
</template>
