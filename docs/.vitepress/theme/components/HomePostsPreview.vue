<script setup lang="ts">
import { computed } from "vue";
import { withBase } from "vitepress";
import { usePosts } from "../post";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const allPosts = computed(() => usePosts() || []);
const recentPosts = computed(() => allPosts.value.slice(0, 5));

// 2026-10-28 -> 28 OCT 2026
function displayDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day} ${MONTHS[Number(month) - 1]} ${year}`;
}
</script>

<template>
  <div class="entries">
    <article v-for="post in recentPosts" :key="post.url" class="entry">
      <time :datetime="post.date.defaultDate">{{
        displayDate(post.date.defaultDate)
      }}</time>
      <h2>
        <a :href="withBase(post.url)">{{ post.title }}</a>
      </h2>
      <p v-if="post.subtitle" class="summary">{{ post.subtitle }}</p>
      <div v-if="post.excerpt" class="summary" v-html="post.excerpt" />
      <a class="more" :href="withBase(post.url)">继续阅读 →</a>
    </article>
  </div>
  <footer class="entries-foot">
    <span>最近 {{ recentPosts.length }} / {{ allPosts.length }}</span>
    <a :href="withBase('/articles')">全部文章 →</a>
  </footer>
</template>

<style scoped>
.entries {
  columns: 2;
  column-gap: 3.5rem;
}
.entry {
  display: flow-root;
  break-inside: avoid;
  padding-bottom: 1.75rem;
}
time {
  display: block;
  margin-bottom: 0.875rem;
  font: 700 0.75rem/1 var(--journal-font-latin);
  letter-spacing: 0.1em;
  color: var(--yohaku-neutral-5);
}
h2 {
  margin: 0 0 0.875rem;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.65;
  overflow-wrap: anywhere;
  color: var(--yohaku-neutral-10);
}
h2 a {
  padding: 0 0.1em;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 60' preserveAspectRatio='none'%3E%3Cpath fill='%237aa86c' fill-opacity='.45' d='M5 25C40 17 85 22 125 18 165 14 205 19 245 15 272 12 290 15 297 19L299 43C280 50 248 45 215 49 175 54 135 47 95 52 58 56 28 51 7 53L2 38Z'/%3E%3Cpath fill='%237aa86c' fill-opacity='.25' d='M14 28C62 23 118 26 176 22 226 19 266 23 292 26L294 40C258 45 202 42 150 46 100 50 52 46 16 47Z'/%3E%3C/svg%3E")
    0 100% / 100% 62% no-repeat;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  color: inherit;
}
.summary {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.85;
  color: var(--yohaku-neutral-8);
  overflow-wrap: anywhere;
}
.summary :deep(p),
.summary :deep(ul),
.summary :deep(ol),
.summary :deep(blockquote) {
  margin: 0 0 0.75em;
}
.summary :deep(ul),
.summary :deep(ol) {
  padding-left: 1.4em;
  list-style: disc;
}
.summary :deep(ol) {
  list-style: decimal;
}
.summary :deep(blockquote) {
  padding-left: 1em;
  border-left: 2px solid var(--yohaku-border);
  color: var(--yohaku-neutral-6);
}
.summary :deep(img) {
  display: none;
}
.summary :deep(a) {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: var(--yohaku-neutral-4);
  text-underline-offset: 0.2em;
}
.more,
.entries-foot a {
  display: inline-block;
  font-size: 0.875rem;
  color: #6f9a61;
}
.more {
  margin-top: 0.25rem;
}
.entries-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--yohaku-border);
  font-size: 0.8125rem;
  letter-spacing: 0.05em;
  color: var(--yohaku-neutral-6);
}
@media (hover: hover) {
  h2 a:hover,
  .more:hover,
  .entries-foot a:hover {
    color: var(--yohaku-neutral-6);
  }
}
@media (max-width: 860px) {
  .entries {
    columns: 1;
  }
}
@media (max-width: 700px) {
  h2 {
    font-size: 1.25rem;
  }
}
</style>
