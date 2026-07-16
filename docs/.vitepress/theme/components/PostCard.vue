<script setup lang="ts">
import {withBase} from "vitepress";
import VPIconArrowRight from "vitepress/dist/client/theme-default/components/icons/VPIconArrowRight.vue";
import type {PostPageFrontmatter} from "../types";

defineProps<{
  post: PostPageFrontmatter;
}>();
</script>

<template>
  <a
    v-if="post.title"
    class="post-card"
    :href="withBase(post.url)"
  >
    <time :datetime="post.date.defaultDate" class="post-date">
      {{ post.date.defaultDate }}
    </time>

    <div class="post-copy">
      <div class="post-heading">
        <h3>{{ post.title }}</h3>
        <span v-if="post.tags?.[0]" class="post-tag">{{ post.tags[0] }}</span>
      </div>
      <div
        v-if="post.excerpt"
        class="post-excerpt"
        v-html="post.excerpt"
      />
    </div>

    <VPIconArrowRight class="post-arrow" aria-hidden="true"/>
  </a>
</template>

<style scoped>
.post-card {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr) 24px;
  gap: 24px;
  align-items: start;
  border-bottom: 1px solid var(--yohaku-border);
  padding: 30px 4px;
  color: inherit;
  text-decoration: none;
}

.post-card:hover {
  background: linear-gradient(
    90deg,
    transparent,
    var(--yohaku-neutral-1) 8%,
    var(--yohaku-neutral-1) 92%,
    transparent
  );
}

.post-date {
  padding-top: 3px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  letter-spacing: 0.03em;
  color: var(--yohaku-neutral-6);
  white-space: nowrap;
}

.post-copy {
  min-width: 0;
}

.post-heading {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

h3 {
  margin: 0;
  font-family: var(--content-container-font-family-base);
  font-size: 20px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--yohaku-neutral-10);
}

.post-tag {
  flex: none;
  border-radius: 4px;
  background: var(--yohaku-neutral-2);
  padding: 2px 7px;
  font-size: 10px;
  line-height: 1.5;
  color: var(--yohaku-neutral-7);
}

.post-excerpt {
  display: -webkit-box;
  margin-top: 10px;
  overflow: hidden;
  font-family: var(--content-container-font-family-base);
  font-size: 13px;
  line-height: 1.7;
  color: var(--yohaku-neutral-7);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.post-excerpt :deep(p) {
  margin: 0;
}

.post-arrow {
  width: 18px;
  height: 18px;
  margin-top: 4px;
  color: var(--yohaku-neutral-5);
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.post-card:hover .post-arrow {
  color: var(--yohaku-accent);
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .post-card {
    grid-template-columns: minmax(0, 1fr) 20px;
    gap: 16px;
    padding: 26px 0;
  }

  .post-date {
    grid-column: 1;
    grid-row: 1;
    padding-top: 0;
  }

  .post-copy {
    grid-column: 1;
    grid-row: 2;
  }

  .post-arrow {
    grid-column: 2;
    grid-row: 2;
  }

  .post-heading {
    display: block;
  }

  h3 {
    font-size: 18px;
  }

  .post-tag {
    display: inline-block;
    margin-top: 10px;
  }
}
</style>
