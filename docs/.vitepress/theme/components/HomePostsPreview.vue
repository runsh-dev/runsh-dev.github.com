<script setup lang="ts">
import {computed} from "vue";
import {withBase} from "vitepress";
import VPIconArrowRight from "vitepress/dist/client/theme-default/components/icons/VPIconArrowRight.vue";
import PostCard from "./PostCard.vue";
import {usePosts} from "../post";

const MAX_POSTS = 10;

const allPosts = computed(() => usePosts() || []);
const totalPosts = computed(() => allPosts.value.length);

const postsByYear = computed(() => {
  const result: Record<string, typeof allPosts.value> = {};

  allPosts.value.forEach((post) => {
    const year = post.date?.time
      ? new Date(post.date.time).getFullYear().toString()
      : "unknown";
    (result[year] ||= []).push(post);
  });

  return result;
});

const years = computed(() =>
  Object.keys(postsByYear.value)
    .filter((year) => year !== "unknown")
    .sort((a, b) => Number(b) - Number(a))
);

const latestYear = computed(() => years.value[0] || "");
const secondLatestYear = computed(() => years.value[1] || "");
const latestYearPostsCount = computed(
  () => postsByYear.value[latestYear.value]?.length || 0
);

const posts = computed(() => {
  const result: typeof allPosts.value = [];

  for (const year of years.value) {
    for (const post of postsByYear.value[year]) {
      if (result.length >= MAX_POSTS) break;
      result.push(post);
    }
    if (result.length >= MAX_POSTS) break;
  }

  return result;
});

const shownLatestYearPostsCount = computed(
  () =>
    posts.value.filter((post) => {
      const year = post.date?.time
        ? new Date(post.date.time).getFullYear().toString()
        : "unknown";
      return year === latestYear.value;
    }).length
);

const isLatestYearComplete = computed(
  () => shownLatestYearPostsCount.value >= latestYearPostsCount.value
);
const hasMore = computed(() => totalPosts.value > MAX_POSTS);

const viewMoreLink = computed(() => {
  const targetYear =
    isLatestYearComplete.value && secondLatestYear.value
      ? secondLatestYear.value
      : latestYear.value;
  return `/posts/${targetYear}/`;
});

const viewMoreText = computed(() => {
  if (isLatestYearComplete.value && secondLatestYear.value) {
    const count = postsByYear.value[secondLatestYear.value]?.length || 0;
    return `继续阅读 ${secondLatestYear.value} 年的 ${count} 篇文章`;
  }

  const remaining =
    latestYearPostsCount.value - shownLatestYearPostsCount.value;
  return `继续阅读 ${latestYear.value} 年的 ${remaining} 篇文章`;
});
</script>

<template>
  <section class="home-posts" aria-labelledby="latest-writing">
    <header class="section-header">
      <div>
        <p class="section-eyebrow">LATEST WRITING</p>
        <h2 id="latest-writing">最近写下的</h2>
      </div>
      <span class="section-count">{{ totalPosts }} 篇记录</span>
    </header>

    <div v-if="posts.length" class="post-list">
      <PostCard
        v-for="post in posts"
        :key="post.url"
        :post="post"
      />
    </div>

    <div v-if="hasMore" class="view-more-container">
      <a :href="withBase(viewMoreLink)" class="view-more-link">
        <span>{{ viewMoreText }}</span>
        <VPIconArrowRight aria-hidden="true"/>
      </a>
    </div>
  </section>
</template>

<style scoped>
.home-posts {
  padding-top: 88px;
}

.section-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--yohaku-neutral-5);
}

.section-eyebrow {
  margin: 0 0 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--yohaku-accent);
}

h2 {
  margin: 0;
  font-family: var(--content-container-font-family-base);
  font-size: 28px;
  font-weight: 400;
  line-height: 1.3;
  color: var(--yohaku-neutral-10);
}

.section-count {
  padding-bottom: 3px;
  font-size: 12px;
  color: var(--yohaku-neutral-6);
}

.post-list {
  display: grid;
}

.view-more-container {
  display: flex;
  justify-content: flex-end;
  padding-top: 28px;
}

.view-more-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--yohaku-border);
  padding: 8px 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--yohaku-neutral-7);
  text-decoration: none;
}

.view-more-link:hover {
  border-color: var(--yohaku-accent);
  color: var(--yohaku-neutral-10);
}

.view-more-link svg {
  width: 17px;
  height: 17px;
  transition: transform 0.2s ease;
}

.view-more-link:hover svg {
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .home-posts {
    padding-top: 64px;
  }

  .section-header {
    align-items: start;
  }

  h2 {
    font-size: 24px;
  }
}
</style>
