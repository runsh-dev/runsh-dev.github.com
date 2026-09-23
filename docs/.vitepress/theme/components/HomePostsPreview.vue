<script setup lang="ts">
import { computed } from "vue";
import { withBase } from "vitepress";
import PostCard from "./PostCard.vue";
import { usePosts } from "../post";

const allPosts = computed(() => usePosts() || []);
const latestPost = computed(() => allPosts.value[0]);
const recentPosts = computed(() => allPosts.value.slice(1, 7));
</script>

<template>
  <div class="writing">
    <div class="featured-wrap">
      <a
        v-if="latestPost"
        class="featured-story"
        :href="withBase(latestPost.url)"
      >
        <div class="featured-image">
          <img
            :src="withBase('/journal-city.jpg')"
            alt="傍晚的城市与舒展的云层"
            width="1500"
            height="2250"
            fetchpriority="high"
          />
          <span class="image-caption">日子很慢，风景很长。</span>
        </div>
        <div class="featured-copy">
          <div class="featured-label">
            <span aria-hidden="true"></span> 最新一篇
            <span class="label-en">LATEST ENTRY</span>
          </div>
          <h2>{{ latestPost.title }}</h2>
          <p v-if="latestPost.subtitle" class="featured-excerpt">
            {{ latestPost.subtitle }}
          </p>
          <div
            v-else-if="latestPost.excerpt"
            class="featured-excerpt"
            v-html="latestPost.excerpt"
          />
          <p v-else class="featured-excerpt">
            {{ latestPost.tags?.join(" · ") || "生活与思考的记录" }}
          </p>
          <div class="featured-bottom">
            <time :datetime="latestPost.date.defaultDate">{{
              latestPost.date.defaultDate.replaceAll("-", ".")
            }}</time>
            <span class="read-story"
              >阅读全文
              <span class="arrow-circle" aria-hidden="true">↗</span></span
            >
          </div>
        </div>
      </a>
    </div>
    <section
      id="latest-writing"
      class="recent-writing"
      aria-labelledby="writing-heading"
    >
      <div class="writing-container">
        <header class="section-header">
          <div>
            <p class="section-eyebrow">THE JOURNAL</p>
            <h2 id="writing-heading">
              最近写下的<span>平凡日子里的小小注脚。</span>
            </h2>
          </div>
          <a class="all-posts" :href="withBase('/articles')"
            >全部文章 <span class="post-count">{{ allPosts.length }}</span
            ><span aria-hidden="true">↗</span></a
          >
        </header>
        <div class="post-list">
          <PostCard v-for="post in recentPosts" :key="post.url" :post="post" />
        </div>
        <a class="archive-link" :href="withBase('/articles')"
          >去时间里翻一翻 <span aria-hidden="true">→</span></a
        >
      </div>
    </section>
    <aside class="journal-note" aria-label="站点题记">
      <span class="note-symbol" aria-hidden="true">✳</span>
      <p>人生不是一场赛跑，而是一场旅行。</p>
      <span>保持好奇，慢慢走，认真记录。</span>
      <a :href="withBase('/about')"
        >关于这个博客 <span aria-hidden="true">↗</span></a
      >
    </aside>
  </div>
</template>

<style scoped>
.featured-wrap,
.writing-container {
  width: min(100% - 5rem, 66rem);
  margin: 0 auto;
}
.featured-wrap {
  padding-bottom: 4.5rem;
}
.featured-story {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  overflow: hidden;
  min-height: 19rem;
  border: 1px solid var(--yohaku-border);
  border-radius: 1.5rem;
  background: var(--yohaku-neutral-1);
  transition:
    transform 220ms ease,
    box-shadow 220ms ease;
}
.featured-image {
  position: relative;
  min-height: 19rem;
  overflow: hidden;
  background: #89aec8;
}
.featured-image::after {
  position: absolute;
  inset: 55% 0 0;
  background: linear-gradient(transparent, rgb(10 31 51 / 48%));
  content: "";
}
.featured-image img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 65%;
}
.image-caption {
  position: absolute;
  z-index: 1;
  bottom: 1.5rem;
  left: 1.75rem;
  color: #fff;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
}
.featured-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  padding: 2.5rem;
}
.featured-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--yohaku-accent);
  font-size: 0.6875rem;
  font-weight: 600;
}
.featured-label > span:first-child {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background: currentColor;
}
.label-en {
  margin-left: 0.375rem;
  color: var(--yohaku-neutral-6);
  font-size: 0.5625rem;
  letter-spacing: 0.1em;
}
.featured-copy h2 {
  margin: 1.5rem 0 0.75rem;
  font-size: clamp(1.625rem, 3vw, 2.375rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.35;
  overflow-wrap: anywhere;
  color: var(--yohaku-neutral-10);
}
.featured-excerpt {
  display: -webkit-box;
  overflow: hidden;
  margin: 0 0 1.5rem;
  font-size: 0.875rem;
  color: var(--yohaku-neutral-7);
  line-height: 1.8;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.featured-excerpt :deep(p) {
  margin: 0;
}
.featured-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  margin-top: auto;
}
time {
  color: var(--yohaku-neutral-6);
  font-size: 0.6875rem;
  font-variant-numeric: tabular-nums;
}
.read-story {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--yohaku-neutral-9);
}
.arrow-circle {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--yohaku-border);
  border-radius: 50%;
  font-size: 1rem;
}
.featured-story:active {
  transform: scale(0.992);
  transition-duration: 80ms;
}
.recent-writing {
  padding: 3.75rem 0;
  background: var(--yohaku-neutral-1);
  scroll-margin-top: calc(var(--vp-nav-height) + 1rem);
}
.section-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.75rem;
}
.section-eyebrow {
  margin: 0 0 0.625rem;
  font-size: 0.5625rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--yohaku-neutral-6);
}
.section-header h2 {
  font-size: 1.625rem;
  font-weight: 600;
  letter-spacing: -0.035em;
  color: var(--yohaku-neutral-10);
  line-height: 1.5;
}
.section-header h2 span {
  margin-left: 1rem;
  color: var(--yohaku-neutral-6);
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: 0;
}
.all-posts {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  min-height: 2.75rem;
  color: var(--yohaku-neutral-7);
  font-size: 0.75rem;
  white-space: nowrap;
}
.post-count {
  padding: 0.125rem 0.45rem;
  border-radius: 1rem;
  background: var(--yohaku-neutral-2);
  font-size: 0.625rem;
}
.post-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.archive-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: fit-content;
  min-height: 2.75rem;
  margin: 2rem auto 0;
  font-size: 0.8125rem;
  color: var(--yohaku-neutral-7);
}
.journal-note {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 4.5rem 1.5rem;
  text-align: center;
}
.note-symbol {
  font-size: 1.75rem;
  color: var(--yohaku-neutral-6);
}
.journal-note p {
  margin: 0.5rem 0 0;
  color: var(--yohaku-neutral-9);
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.02em;
}
.journal-note > span:not(.note-symbol) {
  font-size: 0.8125rem;
  color: var(--yohaku-neutral-6);
}
.journal-note a {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--yohaku-accent);
}
@media (hover: hover) {
  .featured-story:hover {
    transform: translateY(-3px);
    box-shadow: var(--yohaku-shadow);
  }
  .all-posts:hover,
  .archive-link:hover {
    color: var(--yohaku-accent);
  }
}
@media (max-width: 767px) {
  .featured-wrap,
  .writing-container {
    width: calc(100% - 2.5rem);
  }
  .featured-wrap {
    padding-bottom: 3rem;
  }
  .featured-story {
    grid-template-columns: 1fr;
    border-radius: 1.25rem;
  }
  .featured-image {
    min-height: 13rem;
  }
  .featured-copy {
    padding: 1.5rem;
    min-height: 15rem;
  }
  .featured-copy h2 {
    margin-top: 1rem;
  }
  .recent-writing {
    padding: 2.5rem 0;
  }
  .section-header h2 span {
    display: block;
    margin: 0.375rem 0 0;
  }
  .section-header h2 {
    font-size: 1.375rem;
  }
  .post-list {
    grid-template-columns: 1fr;
  }
  .journal-note {
    padding: 3rem 1.25rem;
  }
  .journal-note p {
    font-size: 1.0625rem;
  }
}
@media (prefers-contrast: more) {
  .image-caption {
    padding: 0.25rem 0.5rem;
    background: #1d1d1f;
    border-radius: 0.25rem;
  }
}
</style>
