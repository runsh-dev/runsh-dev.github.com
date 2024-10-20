<script setup lang="ts">
import {withBase} from "vitepress";
import type {PostPageFrontmatter} from "../types";
import PostCover from "./PostCover.vue";

defineProps<{
  post: PostPageFrontmatter
}>()

</script>

<template>
  <a
      class=" flex flex-row items-start  group relative  sm:hover:bg-hover transition-all hover:opacity-100"
      :href="withBase(post.url)"
      v-if="post.title"
  >
    <!--    <PostCover :post="post"/>-->
    <div class="flex space-x-5 text-xs sm:text-sm ">
      <time :datetime="post.date.defaultDate"
            class="post-date whitespace-nowrap text-zinc-400 hidden sm:inline-block pt-[37px]">
        {{ post.date.defaultDate }}
      </time>
    </div>
    <div class="mx-3 w-full min-w-0 flex flex-col text-sm space-y-2 h-auto border-b border-gray-300 py-8 dark:border-gray-700">
      <!--标题-->
      <div class="space-y-3 line-clamp-3 ">
        <h2 class="font-bold text-zinc-700 text-xl dark:text-zinc-300">
          {{ post.title }}
        </h2>
        <div class="flex mt-4" v-if="post.tags[0]">
          <p class="flex items-center text-white bg-black px-4  rounded-[28px] h-[28px] dark:bg-zinc-300 dark:text-black">{{ post.tags[0]}}</p>
        </div>

        <div v-if="post.excerpt" class="text-zinc-500 line-clamp-3" style="word-break:break-word" v-html="post.excerpt || '' "></div>
      </div>
      <!--元数据-->
        <!--      <div class="h-[20px]"></div>-->
      <!--作者和发布时间-->
    </div>
  </a>

</template>

<style scoped>

</style>
