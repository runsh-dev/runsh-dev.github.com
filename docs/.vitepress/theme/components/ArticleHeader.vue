<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";

const props = withDefaults(
  defineProps<{
    isPost?: boolean;
  }>(),
  {
    isPost: false,
  },
);

const { frontmatter } = useData();

const title = computed(() => frontmatter.value.title);
const subtitle = computed(() => frontmatter.value.subtitle);
const date = computed(() => {
  const value = frontmatter.value.date;
  if (!value) return "";
  if (typeof value === "string") return value.slice(0, 10);
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value.defaultDate || value.raw || "";
});
const displayDate = computed(() => date.value.replaceAll("-", "·"));
const tags = computed<string[]>(() => frontmatter.value.tags || []);
const category = computed(() => {
  const categories = frontmatter.value.categories;
  if (Array.isArray(categories) && categories.length) return categories[0];
  if (typeof categories === "string" && categories) return categories;
  return tags.value[0] || "随笔";
});
const author = computed(() => frontmatter.value.author || "RUNSH");
const authorInitial = computed(() => author.value.slice(0, 1).toUpperCase());
const readingTime = computed(() => frontmatter.value.readingTime || 1);
</script>

<template>
  <header class="article-header" :class="{ 'is-post': props.isPost }">
    <a v-if="props.isPost" class="back-to-posts" :href="withBase('/articles')"
      ><span aria-hidden="true">←</span> 所有文章</a
    >
    <div v-if="props.isPost" class="post-meta">
      <span class="post-category">{{ category }}</span>
      <time v-if="date" :datetime="date">{{ displayDate }}</time>
      <span>约 {{ readingTime }} 分钟</span>
    </div>
    <p v-else class="article-eyebrow">LIFE & BLOG · {{ date || "JOURNAL" }}</p>

    <h1>{{ title }}</h1>
    <p v-if="subtitle" class="article-subtitle">{{ subtitle }}</p>

    <div v-if="props.isPost" class="post-author">
      <span class="post-author-avatar" aria-hidden="true">{{
        authorInitial
      }}</span>
      <div>
        <span class="post-author-name">{{ author }}</span>
        <span class="post-author-date">{{ displayDate }} · RUNSH.DEV</span>
      </div>
    </div>

    <div v-else-if="tags.length" class="article-meta" aria-label="文章标签">
      <span v-for="tag in tags" :key="tag">{{ tag }}</span>
    </div>

    <figure v-if="frontmatter.headerImage" class="header-image">
      <img
        :src="withBase(frontmatter.headerImage)"
        :alt="title || '文章封面'"
      />
      <figcaption v-if="frontmatter.headerImageCredit">
        <a
          v-if="frontmatter.headerImageCreditLink"
          :href="frontmatter.headerImageCreditLink"
          target="_blank"
          rel="noreferrer"
        >
          {{ frontmatter.headerImageCredit }}
        </a>
        <span v-else>{{ frontmatter.headerImageCredit }}</span>
      </figcaption>
    </figure>
  </header>
</template>

<style scoped>
.article-header {
  margin-bottom: 52px;
  border-bottom: 1px solid var(--yohaku-border);
  padding: 12px 0 44px;
  text-align: left;
}

.article-header.is-post {
  margin-bottom: 36px;
  border-bottom: 0;
  padding: 0;
}
.back-to-posts {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  margin-bottom: 1.75rem;
  color: var(--yohaku-link-color);
  font-size: 0.8125rem;
}
.back-to-posts:hover {
  color: var(--yohaku-link-hover);
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 22px;
  font-family: var(--vp-font-family-base);
  font-size: 0.8125rem;
  line-height: 1.5;
  letter-spacing: 0.04em;
  color: var(--yohaku-neutral-7);
}

.post-category {
  color: var(--yohaku-link-color);
}

.article-eyebrow {
  margin: 0 0 18px;
  font-family: var(--vp-font-family-base);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  color: var(--yohaku-link-color);
}

h1 {
  max-width: 100%;
  margin: 0;
  font-family: var(--content-container-font-family-base);
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.44;
  letter-spacing: normal;
  overflow-wrap: anywhere;
  text-wrap: pretty;
  color: var(--yohaku-neutral-10);
}

.article-subtitle {
  max-width: 42em;
  margin: 12px 0 0;
  font-family: var(--content-container-font-family-base);
  font-size: var(--yohaku-reading-size);
  line-height: var(--yohaku-reading-leading);
  color: var(--yohaku-neutral-7);
}

.post-author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  border-bottom: 1px solid var(--yohaku-border);
  padding-bottom: 18px;
}

.post-author-avatar {
  display: grid;
  flex: none;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid var(--yohaku-border);
  border-radius: 50%;
  background: var(--yohaku-accent-soft);
  font-family: var(--content-container-font-family-base);
  font-size: 13px;
  font-weight: 500;
  color: var(--yohaku-neutral-9);
}

.post-author-name,
.post-author-date {
  display: block;
}

.post-author-name {
  font-family: var(--content-container-font-family-base);
  font-size: 14px;
  font-weight: 500;
  color: var(--yohaku-neutral-10);
}

.post-author-date {
  margin-top: 2px;
  font-family: var(--vp-font-family-base);
  font-size: 0.8125rem;
  color: var(--yohaku-neutral-7);
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

.article-meta span {
  border-radius: 4px;
  background: var(--yohaku-neutral-2);
  padding: 3px 8px;
  font-family: var(--vp-font-family-base);
  font-size: 0.8125rem;
  color: var(--yohaku-neutral-7);
}

.header-image {
  margin: 28px 0 0;
}

.header-image img {
  display: block;
  width: 100%;
  max-height: 440px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: var(--yohaku-shadow);
}

.header-image figcaption {
  margin-top: 8px;
  font-size: 0.75rem;
  text-align: right;
  color: var(--yohaku-neutral-6);
}

.header-image figcaption a {
  color: inherit;
  text-decoration: none;
}

@media (max-width: 640px) {
  .article-header {
    margin-bottom: 40px;
    padding-bottom: 32px;
  }

  .article-header.is-post {
    margin-bottom: 28px;
    padding-bottom: 0;
  }

  .post-meta {
    gap: 8px 12px;
    margin-bottom: 18px;
    font-size: 0.8125rem;
  }

  .header-image {
    margin-top: 24px;
  }

  .header-image img {
    max-height: 320px;
  }
}

@media (max-width: 1023px) {
  h1 {
    font-size: 2.25rem;
  }
}

@media (max-width: 640px) {
  h1 {
    font-size: 1.75rem;
  }
}
</style>
