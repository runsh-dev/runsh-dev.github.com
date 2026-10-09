<script lang="ts" setup>
import { computed } from "vue";
import { withBase } from "vitepress";
import VPIconArrowRight from "vitepress/dist/client/theme-default/components/icons/VPIconArrowRight.vue";
import { getPostsByYear } from "../utils";
import { usePosts } from "../post";

const filteredPosts = computed(() => getPostsByYear(usePosts()));
const total = computed(() =>
  filteredPosts.value.reduce((count, item) => count + item.data.length, 0),
);
</script>

<template>
  <main class="archives">
    <header class="archives-header">
      <div>
        <p>ARCHIVE · {{ total }} POSTS</p>
        <h1>写给时间的记录。</h1>
      </div>
      <span>文章归档 · 按年份慢慢翻阅</span>
    </header>

    <section
      v-for="item in filteredPosts"
      :key="item.year"
      class="archive-year"
      :aria-labelledby="`year-${item.year}`"
    >
      <h2 :id="`year-${item.year}`">{{ item.year }}</h2>
      <ul>
        <li v-for="subItem in item.data" :key="subItem.url">
          <a :href="withBase(subItem.url)">
            <time :datetime="subItem.date.defaultDate">
              {{ subItem.date.defaultDate.slice(5) }}
            </time>
            <span>{{ subItem.title }}</span>
            <VPIconArrowRight aria-hidden="true" />
          </a>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.archives {
  width: min(100% - 40px, 880px);
  margin: 0 auto;
  padding: 80px 0 104px;
}

.archives-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 72px;
  border-bottom: 1px solid var(--yohaku-border);
  padding-bottom: 28px;
}

.archives-header p {
  margin: 0 0 10px;
  font-family: var(--vp-font-family-base);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  color: var(--yohaku-link-color);
}

.archives-header h1 {
  margin: 0;
  font-family: var(--content-container-font-family-base);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 650;
  letter-spacing: -0.04em;
  line-height: 1.4;
  color: var(--yohaku-neutral-10);
}

.archives-header > span {
  padding-bottom: 4px;
  font-size: 0.875rem;
  color: var(--yohaku-neutral-6);
}

.archive-year {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 32px;
  margin-top: 60px;
}

.archive-year h2 {
  position: sticky;
  top: 104px;
  align-self: start;
  margin: 0;
  font-family: var(--content-container-font-family-base);
  font-size: 24px;
  font-weight: 600;
  color: var(--yohaku-neutral-10);
}

.archive-year ul {
  overflow: hidden;
  border: 1px solid var(--yohaku-border);
  border-radius: 1rem;
  background: var(--yohaku-neutral-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.archive-year li {
  border-bottom: 1px solid var(--yohaku-border);
}
.archive-year li:last-child {
  border-bottom: 0;
}

.archive-year a {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) 18px;
  gap: 18px;
  align-items: center;
  padding: 18px 20px;
  color: var(--yohaku-neutral-9);
  text-decoration: none;
}

.archive-year a:hover {
  color: var(--yohaku-link-hover);
  background: var(--yohaku-accent-soft);
}
.archive-year a:active {
  background: var(--yohaku-neutral-2);
}
.archive-year a:focus-visible {
  outline-offset: -3px;
}

.archive-year time {
  font-family: var(--vp-font-family-base);
  font-size: 0.8125rem;
  color: var(--yohaku-neutral-6);
}

.archive-year a > span {
  overflow-wrap: anywhere;
  font-family: var(--content-container-font-family-base);
  font-size: 1.0625rem;
  line-height: 1.8;
}

.archive-year svg {
  fill: currentColor;
  width: 16px;
  height: 16px;
  color: var(--yohaku-neutral-5);
  transition: transform 0.2s ease;
}

.archive-year a:hover svg {
  transform: translateX(3px);
  color: var(--yohaku-link-hover);
}

@media (max-width: 640px) {
  .archives {
    width: min(100% - 32px, 880px);
    padding-top: 64px;
  }

  .archives-header {
    display: block;
    margin-bottom: 48px;
  }

  .archives-header > span {
    display: block;
    margin-top: 14px;
  }

  .archive-year {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 48px;
  }

  .archive-year h2 {
    position: static;
  }
}
</style>
