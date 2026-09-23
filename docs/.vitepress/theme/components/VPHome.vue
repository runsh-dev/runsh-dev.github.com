<script setup lang="ts">
import { withBase } from "vitepress";
import HomePostsPreview from "./HomePostsPreview.vue";
</script>

<template>
  <main class="home">
    <slot name="home-hero-before" />
    <section class="journal-hero" aria-labelledby="home-title">
      <p class="hero-eyebrow">
        <span aria-hidden="true"></span> A PERSONAL JOURNAL
      </p>
      <h1 id="home-title">
        在日常与代码之间，<br /><span>留一点时间给生活。</span>
      </h1>
      <p class="hero-lead">
        记录生活的片段、技术的思考，<br
          class="mobile-break"
        />以及那些值得慢慢写下来的事。
      </p>
      <div class="hero-actions">
        <a class="hero-action primary" href="#latest-writing"
          >开始阅读 <span aria-hidden="true">↓</span></a
        >
        <a class="hero-action secondary" :href="withBase('/about')"
          >认识一下 <span aria-hidden="true">↗</span></a
        >
      </div>
    </section>
    <HomePostsPreview />
    <Content />
  </main>
</template>

<style scoped>
.journal-hero {
  max-width: 70rem;
  margin: 0 auto;
  padding: 5.75rem 1.5rem 4.5rem;
  text-align: center;
}
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  margin: 0 0 1.75rem;
  padding: 0.4rem 0.85rem;
  border: 1px solid var(--yohaku-border);
  border-radius: 2rem;
  color: var(--yohaku-neutral-7);
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.14em;
}
.hero-eyebrow span {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background: var(--yohaku-accent);
}
h1 {
  margin: 0;
  color: var(--yohaku-neutral-10);
  font-size: clamp(2.125rem, 4.8vw, 3.75rem);
  font-weight: 650;
  line-height: 1.3;
  letter-spacing: -0.045em;
  text-wrap: balance;
}
h1 span {
  color: var(--yohaku-neutral-6);
}
.hero-lead {
  margin: 1.5rem 0 0;
  color: var(--yohaku-neutral-7);
  font-size: 1rem;
  line-height: 1.9;
}
.mobile-break {
  display: none;
}
.hero-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.875rem;
}
.hero-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 2.875rem;
  padding: 0.625rem 1.375rem;
  border-radius: 2rem;
  font-size: 0.8125rem;
  font-weight: 500;
  transition:
    background-color 160ms ease,
    transform 160ms ease;
}
.primary {
  background: var(--yohaku-neutral-10);
  color: var(--yohaku-paper);
}
.secondary {
  background: var(--yohaku-neutral-1);
  color: var(--yohaku-neutral-9);
}
.hero-action:active {
  transform: scale(0.96);
  transition-duration: 80ms;
}
@media (hover: hover) {
  .primary:hover {
    background: var(--yohaku-neutral-8);
  }
  .secondary:hover {
    background: var(--yohaku-neutral-2);
  }
}
@media (max-width: 640px) {
  .journal-hero {
    padding: 3.5rem 1.25rem 3rem;
  }
  .hero-eyebrow {
    margin-bottom: 1.5rem;
  }
  h1 {
    font-size: clamp(1.85rem, 7.7vw, 2.75rem);
  }
  .hero-lead {
    font-size: 0.875rem;
  }
  .mobile-break {
    display: initial;
  }
}
</style>
