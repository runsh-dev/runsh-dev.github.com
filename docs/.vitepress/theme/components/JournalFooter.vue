<script setup lang="ts">
import { useData, withBase } from "vitepress";
import { useSidebar } from "vitepress/dist/client/theme-default/composables/sidebar.js";
const { theme, frontmatter } = useData();
const { hasSidebar } = useSidebar();
</script>

<template>
  <footer
    v-if="theme.footer && frontmatter.footer !== false"
    class="journal-footer"
    :class="{ 'has-sidebar': hasSidebar }"
  >
    <div class="footer-inner">
      <div class="footer-brand">
        <a :href="withBase('/')"
          >Life & BLOG<span aria-hidden="true">.</span></a
        >
        <p>生活在继续，记录也在继续。</p>
      </div>
      <div class="footer-details">
        <nav aria-label="页脚导航">
          <a :href="withBase('/articles')">文章归档</a
          ><a :href="withBase('/about')">关于我</a
          ><a
            href="https://github.com/runsh-dev"
            target="_blank"
            rel="noreferrer"
            >GitHub ↗</a
          >
        </nav>
        <p v-if="theme.footer?.message" v-html="theme.footer.message" />
        <p v-if="theme.footer?.copyright" v-html="theme.footer.copyright" />
      </div>
    </div>
  </footer>
</template>

<style scoped>
.journal-footer {
  border-top: 1px solid var(--yohaku-border);
}
.footer-inner {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 2rem;
  width: min(100% - 5rem, 66rem);
  margin: auto;
  padding: 2.5rem 0;
}
.footer-brand > a {
  font-size: 1rem;
  font-weight: 650;
  letter-spacing: -0.035em;
  color: var(--yohaku-neutral-10);
}
.footer-brand > a span {
  color: var(--yohaku-accent);
}
.footer-brand p {
  margin-top: 0.5rem;
  color: var(--yohaku-neutral-6);
  font-size: 0.75rem;
}
.footer-details {
  text-align: right;
}
nav {
  display: flex;
  justify-content: end;
  gap: 1.25rem;
  margin-bottom: 0.75rem;
  font-size: 0.6875rem;
  color: var(--yohaku-neutral-7);
}
nav a {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
}
nav a:hover {
  color: var(--yohaku-accent);
}
.footer-details > p {
  color: var(--yohaku-neutral-6);
  font-size: 0.625rem;
  line-height: 1.8;
}
@media (min-width: 960px) {
  .journal-footer.has-sidebar {
    margin-left: var(--vp-sidebar-width);
  }
}
@media (min-width: 1440px) {
  .journal-footer.has-sidebar {
    margin-left: calc(
      (100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width)
    );
  }
}
@media (max-width: 640px) {
  .footer-inner {
    width: calc(100% - 2.5rem);
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 0;
  }
  .footer-details {
    text-align: left;
  }
  nav {
    justify-content: start;
    margin-bottom: 0.5rem;
  }
}
</style>
