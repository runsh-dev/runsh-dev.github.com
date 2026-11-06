<script lang="ts" setup>
import { computed } from "vue";
import { withBase } from "vitepress";
import { getPostsByYear } from "../utils";
import { usePosts } from "../post";

const filteredPosts = computed(() => getPostsByYear(usePosts()));
const total = computed(() =>
  filteredPosts.value.reduce((count, item) => count + item.data.length, 0),
);
</script>

<template>
  <main class="archives">
    <h1 class="page-title">Archive</h1>
    <p class="motto">{{ total }} posts</p>

    <section
      v-for="item in filteredPosts"
      :key="item.year"
      :aria-labelledby="`year-${item.year}`"
    >
      <h2 :id="`year-${item.year}`" class="archive-year">{{ item.year }}</h2>
      <ul class="archive-list">
        <li v-for="subItem in item.data" :key="subItem.url">
          <time :datetime="subItem.date.defaultDate">
            {{ subItem.date.defaultDate.slice(5) }}
          </time>
          <a :href="withBase(subItem.url)">{{ subItem.title }}</a>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.archives {
  width: min(100% - 3.5rem, 60.5rem);
  margin: 0 auto;
  padding: 3rem 0 6rem;
}

.page-title {
  margin: 0 0 0.75rem;
  font: 700 2.625rem/1.2 var(--journal-font-family);
  letter-spacing: -0.6px;
  color: var(--yohaku-neutral-10);
}

.motto {
  margin: 0 0 3.5rem;
  font-size: 0.8125rem;
  letter-spacing: 2px;
  color: var(--yohaku-neutral-6);
}

.archive-year {
  margin: 3rem 0 1.125rem;
  font: 700 1.625rem/1.2 var(--journal-font-latin);
  color: var(--yohaku-neutral-10);
}

section:first-of-type .archive-year {
  margin-top: 0;
}

.archive-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.archive-list li {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  padding: 0.625rem 0;
}

.archive-list time {
  flex: 0 0 auto;
  width: 3.25rem;
  font: 400 0.8125rem/1 var(--journal-font-latin);
  letter-spacing: 1px;
  font-variant-numeric: tabular-nums;
  color: var(--yohaku-neutral-5);
}

.archive-list a {
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--yohaku-neutral-8);
  text-decoration: none;
}

@media (hover: hover) {
  .archive-list a:hover {
    color: #6f9a61;
  }
}

@media (max-width: 700px) {
  .archives {
    width: calc(100% - 2.25rem);
    padding-top: 2rem;
  }

  .page-title {
    font-size: 2.125rem;
  }

  .archive-list li {
    gap: 1rem;
  }
}
</style>
