<script setup lang="ts">
import { withBase } from "vitepress";
import type { PostPageFrontmatter } from "../types";
defineProps<{ post: PostPageFrontmatter }>();
</script>

<template>
  <a v-if="post.title" class="post-card" :href="withBase(post.url)">
    <div class="post-meta">
      <span class="post-tag">{{ post.tags?.[0] || "随笔" }}</span>
      <time :datetime="post.date.defaultDate">{{
        post.date.defaultDate.replaceAll("-", ".")
      }}</time>
    </div>
    <h3>{{ post.title }}</h3>
    <p v-if="post.subtitle" class="post-excerpt">{{ post.subtitle }}</p>
    <div v-else-if="post.excerpt" class="post-excerpt" v-html="post.excerpt" />
    <span class="post-bottom">阅读记录 <span aria-hidden="true">↗</span></span>
  </a>
</template>

<style scoped>
.post-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 12.75rem;
  padding: 1.625rem 1.75rem;
  border: 1px solid var(--yohaku-border);
  border-radius: 1.125rem;
  background: var(--yohaku-paper);
  color: inherit;
  text-decoration: none;
  transition:
    transform 200ms ease,
    box-shadow 200ms ease,
    border-color 200ms ease;
}
.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  color: var(--yohaku-neutral-6);
  font-size: 0.6875rem;
}
.post-tag {
  padding: 0.15rem 0.5rem;
  border-radius: 0.375rem;
  background: var(--yohaku-neutral-1);
  color: var(--yohaku-neutral-7);
}
time {
  font-variant-numeric: tabular-nums;
}
h3 {
  margin: 1rem 0 0.5rem;
  overflow-wrap: anywhere;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: var(--yohaku-neutral-10);
}
.post-excerpt {
  display: -webkit-box;
  margin: 0 0 1rem;
  overflow: hidden;
  font-size: 0.8125rem;
  line-height: 1.8;
  color: var(--yohaku-neutral-7);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.post-excerpt :deep(p) {
  margin: 0;
}
.post-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.75rem;
  color: var(--yohaku-neutral-6);
  font-size: 0.6875rem;
}
.post-bottom > span {
  font-size: 1.125rem;
  color: var(--yohaku-neutral-7);
}
.post-card:active {
  transform: scale(0.985);
  transition-duration: 80ms;
  background: var(--yohaku-neutral-1);
}
@media (hover: hover) {
  .post-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--yohaku-shadow);
    border-color: var(--yohaku-neutral-3);
  }
  .post-card:hover h3,
  .post-card:hover .post-bottom > span {
    color: var(--yohaku-link-hover);
  }
}
@media (max-width: 640px) {
  .post-card {
    min-height: 11rem;
    padding: 1.375rem;
  }
}
</style>
