import { writeFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'

/**
 * 为没有 index.md 的目录生成 index.md 文件
 */
export function generateMissingIndexFiles() {
  const postsDir = join(process.cwd(), 'docs', 'posts')
  
  try {
    const entries = readdirSync(postsDir, { withFileTypes: true })
    
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'media') {
        const dirPath = join(postsDir, entry.name)
        const indexPath = join(dirPath, 'index.md')
        
        // 如果目录下没有 index.md，则生成一个
        if (!existsSync(indexPath)) {
          const dirName = entry.name
          const isYear = /^\d{4}$/.test(dirName)
          
          const content = `---
title: ${isYear ? dirName + '年文章' : dirName}
layout: doc
prev: false
next: false
---

<YearIndex />
`
          writeFileSync(indexPath, content, 'utf-8')
          console.log(`Generated index.md for /posts/${dirName}/`)
        }
      }
    }
  } catch (error) {
    console.error('Error generating index files:', error)
  }
}

/**
 * VitePress 插件：在构建开始前生成缺失的 index.md 文件
 */
export function generateIndexPlugin() {
  return {
    name: 'generate-index-plugin',
    buildStart() {
      generateMissingIndexFiles()
    }
  }
}

