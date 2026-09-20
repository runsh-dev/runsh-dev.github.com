<script setup lang="ts">
import { withBase } from "vitepress";
import HomePostsPreview from "./HomePostsPreview.vue";
</script>

<template>
  <div class="home">
    <slot name="home-hero-before" />

    <section class="yohaku-hero" aria-labelledby="home-title">
      <div class="hero-copy">
        <p class="hero-eyebrow">
          <span class="hero-mark" aria-hidden="true"></span>
          余白 JOURNAL · RUNSH.DEV
        </p>
        <h1 id="home-title">
          在日常与代码之间，<br />
          <span>留一页纸给时间。</span>
        </h1>
        <p class="hero-lead">
          记录生活的片段、技术的思考，以及那些值得慢慢写下来的事。
        </p>
        <div class="hero-actions">
          <a class="hero-action primary" :href="withBase('/articles')"
            >阅读文章 <span aria-hidden="true">↗</span></a
          >
          <a class="hero-action secondary" :href="withBase('/about')">关于我</a>
        </div>
      </div>

      <aside class="hero-note" aria-label="站点题记">
        <div class="note-topline">
          <span class="note-index">FIELD NOTES</span
          ><span aria-hidden="true">01 / ∞</span>
        </div>
        <svg
          class="note-art"
          viewBox="0 0 280 180"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="202" cy="45" r="23" class="art-sun" />
          <path
            d="M24 144C61 132 85 138 118 151C157 122 207 120 256 134"
            class="art-land"
          />
          <path
            d="M44 48C82 42 113 56 140 77V153C110 132 81 124 44 130V48Z"
            class="art-page"
          />
          <path
            d="M140 77C169 57 202 51 236 57V138C198 131 167 139 140 153V77Z"
            class="art-page"
          />
          <path
            d="M140 77V153M61 69C83 68 105 78 123 89M61 85C83 84 105 94 123 105M61 101C80 101 95 106 109 113M160 91C177 82 199 78 220 79M160 107C177 98 199 94 220 95M160 123C177 114 187 112 204 112"
            class="art-line"
          />
          <path d="M33 151H247" class="art-line" />
        </svg>
        <p>人生不是一场赛跑，<br />而是一场旅行。</p>
        <div class="note-bottomline">
          <span class="note-caption">慢慢走，认真记录。</span
          ><span class="note-seal" aria-hidden="true">记</span>
        </div>
      </aside>
    </section>

    <HomePostsPreview />
    <Content />
  </div>
</template>

<style scoped>
.home {
  width: min(100% - 80px, 1080px);
  margin: 0 auto;
  padding: 24px 0 96px;
}

.yohaku-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 64px;
  align-items: center;
  min-height: 400px;
  padding: 40px 0 48px;
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
  font-size: 0.75rem;
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
  font-size: clamp(2.125rem, 3.65vw, 3.125rem);
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.02em;
  color: var(--yohaku-neutral-10);
}

h1 span {
  color: var(--yohaku-accent);
}

.hero-lead {
  max-width: 28em;
  margin: 28px 0 0;
  font-family: var(--content-container-font-family-base);
  font-size: 1rem;
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
  min-height: 46px;
  gap: 22px;
  border-radius: 6px;
  padding: 0 20px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
}

.hero-action.primary {
  border: 1px solid var(--yohaku-accent);
  background: var(--yohaku-accent);
  color: var(--vp-button-brand-text);
}

.hero-action.primary:hover {
  border-color: var(--vp-button-brand-hover-border);
  background: var(--vp-button-brand-hover-bg);
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
  position: relative;
  border: 1px solid var(--yohaku-border);
  border-radius: 3px 3px 40px 3px;
  padding: 22px 24px;
  background: var(--yohaku-neutral-1);
  color: var(--yohaku-neutral-7);
  box-shadow: 8px 8px 0 var(--yohaku-accent-soft);
  transform: rotate(2deg);
}
.note-topline,
.note-bottomline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  color: var(--yohaku-neutral-6);
}
.note-art {
  width: 100%;
  max-height: 130px;
  margin: 12px 0 4px;
}
.art-sun {
  fill: var(--yohaku-ochre-soft);
}
.art-land {
  stroke: var(--yohaku-neutral-4);
  stroke-width: 1;
}
.art-page {
  fill: var(--yohaku-paper);
  stroke: var(--yohaku-accent);
  stroke-width: 1.4;
  stroke-linejoin: round;
}
.art-line {
  stroke: var(--yohaku-accent);
  stroke-width: 1;
  stroke-linecap: round;
  opacity: 0.55;
}
.hero-note p {
  margin: 2px 0 20px;
  font-family: var(--content-container-font-family-base);
  font-size: 1.125rem;
  line-height: 1.9;
  color: var(--yohaku-neutral-8);
}
.note-caption {
  font-family: var(--vp-font-family-base);
  font-size: 0.75rem;
}
.note-seal {
  display: grid;
  width: 26px;
  height: 28px;
  place-items: center;
  border: 1px solid var(--yohaku-ochre);
  border-radius: 3px;
  color: var(--yohaku-ochre);
  font-family: var(--content-container-font-family-base);
  font-size: 0.875rem;
}
@media (max-width: 959px) {
  .yohaku-hero {
    grid-template-columns: minmax(0, 1fr) 240px;
    gap: 32px;
  }
  h1 {
    font-size: clamp(1.75rem, 3.8vw, 2.5rem);
  }
  .hero-note {
    padding: 18px;
  }
}
@media (max-width: 767px) {
  .home {
    width: calc(100% - 40px);
    padding-top: 24px;
  }
  .yohaku-hero {
    grid-template-columns: 1fr;
    gap: 40px;
    min-height: auto;
    padding: 32px 0 40px;
  }
  h1 {
    font-size: clamp(1.75rem, 6.7vw, 2.75rem);
    line-height: 1.6;
  }
  .hero-eyebrow {
    margin-bottom: 20px;
  }
  .hero-lead {
    margin-top: 20px;
  }
  .hero-actions {
    margin-top: 24px;
  }
  .hero-note {
    transform: none;
    padding: 20px;
    border-radius: 3px 3px 28px 3px;
  }
  .note-art {
    float: right;
    width: 130px;
    margin: 12px 0 0 12px;
  }
  .hero-note p {
    margin: 20px 0 16px;
    font-size: 1rem;
  }
  .note-bottomline {
    clear: both;
  }
}
@media (max-width: 380px) {
  .note-art {
    width: 88px;
    margin-left: 8px;
  }
  .hero-note p {
    font-size: 0.9375rem;
  }
}
</style>
