<script setup lang="ts">
import {withBase} from "vitepress";
import HomePostsPreview from "./HomePostsPreview.vue";
</script>

<template>
  <div class="home">
    <slot name="home-hero-before"/>

    <section class="yohaku-hero" aria-labelledby="home-title">
      <div class="hero-copy">
        <p class="hero-eyebrow">
          <span class="hero-mark" aria-hidden="true"></span>
          RUNSH.DEV · 余白
        </p>
        <h1 id="home-title">
          在日常与代码之间，<br>
          留一页纸给时间。
        </h1>
        <p class="hero-lead">
          记录生活的片段、技术的思考，以及那些值得慢慢写下来的事。
        </p>
        <div class="hero-actions">
          <a class="hero-action primary" :href="withBase('/articles')">阅读文章</a>
          <a class="hero-action secondary" :href="withBase('/about')">关于我</a>
        </div>
      </div>

      <aside class="hero-note" aria-label="站点题记">
        <span class="note-index">NOTE · 01</span>
        <p>人生不是一场赛跑，<br>而是一场旅行。</p>
        <span class="note-rule" aria-hidden="true"></span>
        <span class="note-caption">WRITING SINCE 2014</span>
      </aside>
    </section>

    <HomePostsPreview/>
    <Content/>
  </div>
</template>

<style scoped>
.home {
  width: min(100% - 40px, 960px);
  margin: 0 auto;
  padding: 72px 0 112px;
}

.yohaku-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 80px;
  align-items: end;
  min-height: 440px;
  padding: 64px 0 72px;
  border-bottom: 1px solid var(--yohaku-border);
}

.hero-copy {
  max-width: 650px;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 28px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  color: var(--yohaku-neutral-7);
}

.hero-mark {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--yohaku-accent);
}

h1 {
  margin: 0;
  font-family: var(--content-container-font-family-base);
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 400;
  line-height: 1.24;
  letter-spacing: -0.025em;
  color: var(--yohaku-neutral-10);
}

.hero-lead {
  max-width: 38em;
  margin: 28px 0 0;
  font-family: var(--content-container-font-family-base);
  font-size: 16px;
  line-height: 1.75;
  color: var(--yohaku-neutral-7);
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 36px;
}

.hero-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  border-radius: 6px;
  padding: 0 20px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
}

.hero-action.primary {
  border: 1px solid var(--yohaku-accent);
  background: var(--yohaku-accent);
  color: #fff;
}

.hero-action.primary:hover {
  border-color: var(--vp-c-brand-2);
  background: var(--vp-c-brand-2);
}

.hero-action.secondary {
  border: 1px solid var(--yohaku-border);
  background: var(--yohaku-neutral-1);
  color: var(--yohaku-neutral-9);
}

.hero-action.secondary:hover {
  background: var(--yohaku-neutral-2);
}

.hero-note {
  border-top: 1px solid var(--yohaku-neutral-5);
  padding-top: 18px;
  color: var(--yohaku-neutral-7);
}

.note-index,
.note-caption {
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--yohaku-neutral-6);
}

.hero-note p {
  margin: 22px 0;
  font-family: var(--content-container-font-family-base);
  font-size: 15px;
  line-height: 1.8;
  color: var(--yohaku-neutral-8);
}

.note-rule {
  display: block;
  width: 32px;
  height: 1px;
  margin-bottom: 14px;
  background: var(--yohaku-accent);
}

@media (max-width: 767px) {
  .home {
    width: min(100% - 32px, 960px);
    padding-top: 32px;
  }

  .yohaku-hero {
    grid-template-columns: 1fr;
    gap: 56px;
    min-height: auto;
    padding: 48px 0 56px;
  }

  h1 {
    font-size: clamp(34px, 11vw, 44px);
  }

  .hero-note {
    max-width: 220px;
    margin-left: auto;
  }
}
</style>
