<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as posts } from '../posts.data'

const route = useRoute()
const { frontmatter } = useData()

// 从当前路径中提取年份或目录名
const currentDir = computed(() => {
  const path = route.path
  const match = path.match(/\/posts\/([^/]+)\/?/)
  return match ? match[1] : ''
})

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

// 过滤掉index页面的辅助函数
const filterIndexPages = (url: string, dir: string | number) => {
  if (!url || !url.includes(`/posts/${dir}/`)) return false
  if (url.endsWith('/index') || url.endsWith(`/${dir}/`) || url === `/posts/${dir}`) return false
  return true
}

// 前一年的文章数量
const prevYearPostsCount = computed(() => {
  if (!prevYear.value) return 0
  return posts.filter(post => filterIndexPages(post.url, prevYear.value!)).length
})

// 后一年的文章数量
const nextYearPostsCount = computed(() => {
  if (!nextYear.value) return 0
  return posts.filter(post => filterIndexPages(post.url, nextYear.value!)).length
})

// 获取当前目录下的所有文章
const dirPosts = computed(() => {
  const dir = currentDir.value
  if (!dir) return []
  
  return posts
    .filter(post => {
      // 匹配路径中包含当前目录的文章
      if (!post.url || !post.url.includes(`/posts/${dir}/`)) return false
      // 过滤掉 index 页面（避免重复展示自身）
      if (post.url.endsWith('/index') || post.url.endsWith(`/${dir}/`) || post.url === `/posts/${dir}`) return false
      return true
    })
    .sort((a, b) => {
      // 按日期降序排序
      const timeA = a.date?.time || 0
      const timeB = b.date?.time || 0
      return timeB - timeA
    })
})

// 格式化日期
const formatDate = (date: { time: number; defaultDate?: string; raw?: string }) => {
  return date?.defaultDate || date?.raw || ''
}
</script>

<template>
  <div class="year-index">
    <h1 class="title">{{ frontmatter.title || currentDir }}</h1>
    <p class="description" v-if="frontmatter.description">{{ frontmatter.description }}</p>
    
    <div class="post-count">共 {{ dirPosts.length }} 篇文章</div>
    
    <ul class="post-list">
      <li v-for="post in dirPosts" :key="post.url" class="post-item">
        <a :href="post.url" class="post-link">
          <span class="post-title">{{ post.title }}</span>
          <span class="post-date">{{ formatDate(post.date) }}</span>
        </a>
      </li>
    </ul>
    
    <div v-if="dirPosts.length === 0" class="no-posts">
      暂无文章
    </div>
    
    <!-- 年份导航 -->
    <div v-if="isYearDir && (prevYear || nextYear)" class="year-nav">
      <a v-if="nextYear" :href="`/posts/${nextYear}/`" class="nav-link nav-next">
        <svg class="nav-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span class="nav-text">{{ nextYear }} 年</span>
        <span class="nav-count">({{ nextYearPostsCount }} 篇)</span>
      </a>
      <div v-else class="nav-placeholder"></div>
      
      <a v-if="prevYear" :href="`/posts/${prevYear}/`" class="nav-link nav-prev">
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.description {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.post-count {
  color: var(--vp-c-text-3);
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-item:last-child {
  border-bottom: none;
}

.post-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  text-decoration: none;
  transition: opacity 0.2s;
}

.post-link:hover {
  opacity: 0.7;
}

.post-title {
  color: var(--vp-c-text-1);
  font-size: 1rem;
  font-weight: 500;
}

.post-date {
  color: var(--vp-c-text-3);
  font-size: 0.875rem;
  white-space: nowrap;
  margin-left: 1rem;
}

.no-posts {
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 2rem;
}

@media (max-width: 640px) {
  .post-link {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .post-date {
    margin-left: 0;
  }
}

/* 年份导航样式 */
.year-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
  gap: 1rem;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.25s ease;
}

.nav-link:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-text {
  font-size: 0.95rem;
}

.nav-count {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.nav-arrow {
  transition: transform 0.25s ease;
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
  .year-nav {
    flex-direction: column;
    gap: 0.75rem;
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

