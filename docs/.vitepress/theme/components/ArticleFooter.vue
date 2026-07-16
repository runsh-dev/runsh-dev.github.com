<script setup lang="ts">
import {computed} from "vue";
import {useData} from "vitepress";

const {frontmatter} = useData();

const tags = computed<string[]>(() => frontmatter.value.tags || []);
const readingTime = computed(() => frontmatter.value.readingTime || 1);
const wordCount = computed(() => frontmatter.value.wordCount || 0);
</script>

<template>
  <div class="article-tail">
    <div v-if="tags.length" class="article-tail-tags" aria-label="文章标签">
      <span v-for="tag in tags" :key="tag">#{{ tag }}</span>
    </div>
    <span class="article-tail-stats">
      {{ wordCount }} 字 · 约 {{ readingTime }} 分钟
    </span>
  </div>
</template>

<style scoped>
.article-tail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 18px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  line-height: 1.6;
  color: var(--yohaku-neutral-7);
}

.article-tail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: var(--yohaku-accent);
}

.article-tail-stats {
  flex: none;
}

@media (max-width: 640px) {
  .article-tail {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
