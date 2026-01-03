<script setup lang="ts">
import {computed, ref, watch, onMounted, nextTick, watchEffect} from "vue";
import {useData, withBase, useRoute, useRouter} from "vitepress";
import PostCard from "./PostCard.vue";
import {usePosts} from "../post";

const MAX_POSTS = 10;

// 获取所有文章
const allPosts = computed(() => {
  return usePosts() || [];
});

// 获取文章总数
const totalPosts = computed(() => allPosts.value.length);

// 按年份分组的文章
const postsByYear = computed(() => {
  const result: Record<string, typeof allPosts.value> = {};
  
  // 按日期降序排序
  const sortedPosts = [...allPosts.value].sort((a, b) => {
    const timeA = a.date?.time || 0;
    const timeB = b.date?.time || 0;
    return timeB - timeA;
  });
  
  sortedPosts.forEach(post => {
    const year = post.date?.time 
      ? new Date(post.date.time).getFullYear().toString() 
      : 'unknown';
    if (!result[year]) {
      result[year] = [];
    }
    result[year].push(post);
  });
  
  return result;
});

// 获取年份列表（降序排列）
const years = computed(() => {
  return Object.keys(postsByYear.value)
    .filter(y => y !== 'unknown')
    .sort((a, b) => parseInt(b) - parseInt(a));
});

// 最新年份
const latestYear = computed(() => years.value[0] || '');

// 次最新年份
const secondLatestYear = computed(() => years.value[1] || '');

// 最新年份的文章数量
const latestYearPostsCount = computed(() => {
  return postsByYear.value[latestYear.value]?.length || 0;
});

// 获取最近年份的10篇文章，如果不够则从次最近年份补齐
const posts = computed(() => {
  if (allPosts.value.length === 0) {
    return [];
  }
  
  // 收集最近年份的文章，直到凑够10篇
  const result: typeof allPosts.value = [];
  for (const year of years.value) {
    const yearPosts = postsByYear.value[year];
    for (const post of yearPosts) {
      if (result.length >= MAX_POSTS) break;
      result.push(post);
    }
    if (result.length >= MAX_POSTS) break;
  }
  
  return result;
});

// 首页已展示的最新年份文章数量
const shownLatestYearPostsCount = computed(() => {
  return posts.value.filter(post => {
    const year = post.date?.time 
      ? new Date(post.date.time).getFullYear().toString() 
      : 'unknown';
    return year === latestYear.value;
  }).length;
});

// 是否已展示完最新年份的所有文章
const isLatestYearComplete = computed(() => {
  return shownLatestYearPostsCount.value >= latestYearPostsCount.value;
});

// 是否有更多文章
const hasMore = computed(() => totalPosts.value > MAX_POSTS);

// 查看更多的目标链接
const viewMoreLink = computed(() => {
  if (isLatestYearComplete.value && secondLatestYear.value) {
    // 如果最新年份的文章已展示完，跳转到次最新年份
    return `/posts/${secondLatestYear.value}/`;
  } else {
    // 如果最新年份的文章没展示完，跳转到最新年份
    return `/posts/${latestYear.value}/`;
  }
});

// 查看更多的描述文字
const viewMoreText = computed(() => {
  if (isLatestYearComplete.value && secondLatestYear.value) {
    const count = postsByYear.value[secondLatestYear.value]?.length || 0;
    return `查看 ${secondLatestYear.value} 年文章 (${count} 篇)`;
  } else {
    const remaining = latestYearPostsCount.value - shownLatestYearPostsCount.value;
    return `查看更多 ${latestYear.value} 年文章 (还有 ${remaining} 篇)`;
  }
});

</script>

<template>
  <div class="mx-auto relative max-w-4xl">
    <div v-if="posts"
         class="grid gap-3 grid-cols-1 ">
      <PostCard
          v-for="post in posts"
          :post="post"
      />
    </div>
    
    <!-- 查看更多入口 -->
    <div v-if="hasMore" class="view-more-container">
      <a :href="viewMoreLink" class="view-more-link">
        <span class="view-more-text">{{ viewMoreText }}</span>
        <svg class="view-more-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </div>
  </div>
</template>
<style scoped>
.home-posts-preview{
  @apply mx-auto relative max-w-6xl;
}

.view-more-container {
  margin-top: 2rem;
  padding: 1.5rem;
  text-align: center;
}

.view-more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.25s ease;
}

.view-more-link:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.view-more-text {
  font-size: 1rem;
}

.view-more-count {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.view-more-arrow {
  transition: transform 0.25s ease;
}

.view-more-link:hover .view-more-arrow {
  transform: translateX(4px);
}
</style>
