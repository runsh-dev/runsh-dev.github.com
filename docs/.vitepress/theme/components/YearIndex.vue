<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import VPIconArrowRight from "vitepress/dist/client/theme-default/components/icons/VPIconArrowRight.vue";
import { data as posts } from '../posts.data'

const route = useRoute()
const { frontmatter } = useData()

// 从当前路径中提取年份或目录名
const currentDir = computed(() => {
  const path = route.path
  const match = path.match(/\/posts\/([^/]+)\/?/)
  return match ? match[1] : 'all'
})

const isAllDir = computed(() => currentDir.value === 'all')

// 判断当前目录是否为年份目录
const isYearDir = computed(() => {
  return /^\d{4}$/.test(currentDir.value)
})

// 当前年份（如果是年份目录）
const currentYear = computed(() => {
  return isYearDir.value ? parseInt(currentDir.value) : 0
})

// 获取所有年份目录（从文章中提取）
const allYears = computed(() => {
  const years = new Set<number>()
  posts.forEach(post => {
    if (post.url) {
      const match = post.url.match(/\/posts\/(\d{4})\//)
      if (match) {
        years.add(parseInt(match[1]))
      }
    }
  })
  return Array.from(years).sort((a, b) => b - a) // 降序排列
})

// 前一年（更早的年份）
const prevYear = computed(() => {
  if (!isYearDir.value) return null
  const index = allYears.value.indexOf(currentYear.value)
  if (index >= 0 && index < allYears.value.length - 1) {
    return allYears.value[index + 1]
  }
  return null
})

// 后一年（更新的年份）
const nextYear = computed(() => {
  if (!isYearDir.value) return null
  const index = allYears.value.indexOf(currentYear.value)
  if (index > 0) {
    return allYears.value[index - 1]
  }
  return null
})

// 前一年的文章数量
const prevYearPostsCount = computed(() => {
  if (!prevYear.value) return 0
  return posts.filter(post => post.url?.includes(`/posts/${prevYear.value}/`)).length
})

// 后一年的文章数量
const nextYearPostsCount = computed(() => {
  if (!nextYear.value) return 0
  return posts.filter(post => post.url?.includes(`/posts/${nextYear.value}/`)).length
})

// 获取当前目录下的所有文章
const dirPosts = computed(() => {
  const dir = currentDir.value

  if (isAllDir.value) return posts
  return posts.filter(post => post.url?.includes(`/posts/${dir}/`))
})

// 格式化日期
const formatDate = (date: { time: number; defaultDate?: string; raw?: string }) => {
  return date?.defaultDate || date?.raw || ''
}
</script>

<template>
  <div class="year-index">
    <header class="year-header">
      <p class="eyebrow">COLLECTION · {{ isAllDir ? 'ALL' : currentDir }}</p>
      <h1 class="title">{{ frontmatter.title || currentDir }}</h1>
      <p class="description" v-if="frontmatter.description">{{ frontmatter.description }}</p>
      <div class="post-count">共 {{ dirPosts.length }} 篇文章</div>
    </header>
    
    <ul class="post-list">
      <li v-for="post in dirPosts" :key="post.url" class="post-item">
        <a :href="withBase(post.url)" class="post-link">
          <span class="post-date">{{ formatDate(post.date) }}</span>
          <span class="post-title">{{ post.title }}</span>
          <VPIconArrowRight class="post-arrow" aria-hidden="true"/>
        </a>
      </li>
    </ul>
    
    <div v-if="dirPosts.length === 0" class="no-posts">
      暂无文章
    </div>
    
    <!-- 年份导航 -->
    <div v-if="isYearDir && (prevYear || nextYear)" class="year-nav">
      <a v-if="nextYear" :href="withBase(`/posts/${nextYear}/`)" class="nav-link nav-next">
        <svg class="nav-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span class="nav-text">{{ nextYear }} 年</span>
        <span class="nav-count">({{ nextYearPostsCount }} 篇)</span>
      </a>
      <div v-else class="nav-placeholder"></div>
      
      <a v-if="prevYear" :href="withBase(`/posts/${prevYear}/`)" class="nav-link nav-prev">
        <span class="nav-text">{{ prevYear }} 年</span>
        <span class="nav-count">({{ prevYearPostsCount }} 篇)</span>
        <svg class="nav-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </a>
      <div v-else class="nav-placeholder"></div>
    </div>
  </div>
</template>

<style scoped>
.year-index {
  max-width: 880px;
  margin: 0 auto;
  padding: 96px 20px 120px;
}

.year-header {
  margin-bottom: 48px;
  border-bottom: 1px solid var(--yohaku-neutral-5);
  padding-bottom: 28px;
}

.eyebrow {
  margin: 0 0 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--yohaku-accent);
}

.title {
  margin: 0;
  font-family: var(--content-container-font-family-base);
  font-size: 36px;
  font-weight: 400;
  line-height: 1.3;
  color: var(--yohaku-neutral-10);
}

.description {
  max-width: 42em;
  margin: 14px 0 0;
  font-family: var(--content-container-font-family-base);
  font-size: 14px;
  line-height: 1.7;
  color: var(--yohaku-neutral-7);
}

.post-count {
  margin-top: 18px;
  font-size: 11px;
  color: var(--yohaku-neutral-6);
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  border-bottom: 1px solid var(--yohaku-border);
}

.post-link {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr) 18px;
  gap: 22px;
  align-items: center;
  padding: 20px 2px;
  color: var(--yohaku-neutral-9);
  text-decoration: none;
}

.post-link:hover {
  color: var(--yohaku-accent);
}

.post-title {
  overflow: hidden;
  font-family: var(--content-container-font-family-base);
  font-size: 15px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-date {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  color: var(--yohaku-neutral-6);
  white-space: nowrap;
}

.post-arrow {
  width: 16px;
  height: 16px;
  color: var(--yohaku-neutral-5);
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.post-link:hover .post-arrow {
  color: var(--yohaku-accent);
  transform: translateX(3px);
}

.no-posts {
  color: var(--yohaku-neutral-6);
  text-align: center;
  padding: 48px 0;
}

.year-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 56px;
  border-top: 1px solid var(--yohaku-border);
  padding-top: 28px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--yohaku-border);
  border-radius: 6px;
  background: var(--yohaku-neutral-1);
  padding: 10px 14px;
  color: var(--yohaku-neutral-8);
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  border-color: var(--yohaku-neutral-5);
  background: var(--yohaku-neutral-2);
  color: var(--yohaku-neutral-10);
}

.nav-text {
  font-size: 12px;
}

.nav-count {
  font-size: 11px;
  color: var(--yohaku-neutral-6);
}

.nav-arrow {
  transition: transform 0.2s ease;
}

.nav-next:hover .nav-arrow {
  transform: translateX(-4px);
}

.nav-prev:hover .nav-arrow {
  transform: translateX(4px);
}

.nav-placeholder {
  flex: 1;
}

@media (max-width: 640px) {
  .year-index {
    padding-top: 64px;
  }

  .post-link {
    grid-template-columns: minmax(0, 1fr) 18px;
    gap: 8px 16px;
  }

  .post-date {
    grid-column: 1;
    grid-row: 1;
  }

  .post-title {
    grid-column: 1;
    grid-row: 2;
    white-space: normal;
  }

  .post-arrow {
    grid-column: 2;
    grid-row: 2;
  }

  .year-nav {
    flex-direction: column;
    gap: 12px;
  }
  
  .nav-link {
    width: 100%;
    justify-content: center;
  }
  
  .nav-placeholder {
    display: none;
  }
}
</style>
