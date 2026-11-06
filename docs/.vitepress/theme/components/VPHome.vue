<script setup lang="ts">
import HomePostsPreview from "./HomePostsPreview.vue";
</script>

<template>
  <main class="home">
    <slot name="home-hero-before" />
    <section class="journal-panel" aria-labelledby="home-title">
      <header class="journal-head">
        <h1 id="home-title" class="journal-label">Blog</h1>
        <p class="journal-motto">记录生活 · 思考技术 · 慢慢走</p>
      </header>
      <HomePostsPreview />
    </section>
    <Content />
  </main>
</template>

<style scoped>
.home {
  padding: 2.5rem 0 3rem;
}
.journal-panel {
  width: min(100% - 3.5rem, 60.5rem);
  margin: 0 auto;
  padding: 2.5rem 1.75rem 1.75rem;
  border: 1px solid var(--yohaku-border);
  border-radius: 1rem;
  background: var(--yohaku-paper);
}
.journal-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2.25rem;
}
.journal-label {
  margin: 0;
  font: 700 0.75rem/1 var(--journal-font-latin);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--yohaku-neutral-6);
}
.journal-motto {
  margin: 0;
  font-size: 0.8125rem;
  letter-spacing: 0.15em;
  color: var(--yohaku-neutral-6);
}
@media (max-width: 700px) {
  .home {
    padding: 1.25rem 0 2rem;
  }
  .journal-panel {
    width: calc(100% - 2.25rem);
    padding: 1.5rem 1.125rem 1.25rem;
    border-radius: 0.75rem;
  }
  .journal-head {
    margin-bottom: 1.75rem;
  }
}
</style>
