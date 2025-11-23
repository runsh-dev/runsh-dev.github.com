import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
}

interface FrontMatter {
  title?: string
  [key: string]: any
}

function parseFrontMatter(content: string): { frontmatter: FrontMatter; content: string } {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontMatterRegex)
  
  if (match) {
    const frontmatterStr = match[1]
    const contentStr = match[2]
    const frontmatter: FrontMatter = {}
    
    // 简单的YAML解析（仅支持基本的key: value格式）
    frontmatterStr.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim()
        const value = line.substring(colonIndex + 1).trim()
        frontmatter[key] = value
      }
    })
    
    return { frontmatter, content: contentStr }
  }
  
  return { frontmatter: {}, content }
}

function getFileTitle(filePath: string, fileName: string): string {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const { frontmatter } = parseFrontMatter(content)
    
    if (frontmatter.title) {
      return frontmatter.title
    }
  } catch (error) {
    // 如果读取失败，使用文件名
  }
  
  // 使用文件名作为标题，去掉扩展名
  return fileName.replace(/\.md$/, '')
}

function generateSidebarItems(dirPath: string, basePath: string = ''): SidebarItem[] {
  const items: SidebarItem[] = []
  
  try {
    const entries = readdirSync(dirPath, { withFileTypes: true })
      .filter(dirent => {
        const name = dirent.name
        // 过滤掉隐藏文件和特定文件
        return !name.startsWith('.') && 
               name !== 'index.md' && 
               name !== 'README.md' &&
               (dirent.isDirectory() || extname(name) === '.md')
      })
      .sort((a, b) => {
        // 目录排在前面，然后按名称排序
        if (a.isDirectory() && !b.isDirectory()) return -1
        if (!a.isDirectory() && b.isDirectory()) return 1
        return a.name.localeCompare(b.name)
      })
    
    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name)
      const relativePath = join(basePath, entry.name)
      
      if (entry.isDirectory()) {
        // 处理目录
        const subItems = generateSidebarItems(fullPath, relativePath)
        if (subItems.length > 0) {
          items.push({
            text: entry.name,
            items: subItems
          })
        }
      } else if (extname(entry.name) === '.md') {
        console.log('basePath', basePath)
        console.log('relativePath', relativePath)
        // 处理markdown文件
        const link = relativePath.replace(/\.md$/, '')
        const title = getFileTitle(fullPath, entry.name)
        
        items.push({
          text: title,
          link: link
        })
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
  }
  
  return items
}

export function generateSidebar() {
  const postsDir1 = join(process.cwd(), 'docs', 'posts', 'guide')
  const postsDir2 = join(process.cwd(), 'docs', 'posts', 'tech')
  return {
    '/posts/guide/': [
      {
        text: 'Guide',
        items: generateSidebarItems(postsDir1, '/posts/guide/')
      },
      {
        text: 'Tech',
        items: generateSidebarItems(postsDir2, '/posts/tech/')
      },
      {
        text: '2020',
        items: generateSidebarItems(postsDir1, '/posts/2020/')
      },
      {
        text: '2021',
        items: generateSidebarItems(postsDir1, '/posts/2021/')
      },
      {
        text: '2022',
        items: generateSidebarItems(postsDir1, '/posts/2022/')
      },
      {
        text: '2023',
        items: generateSidebarItems(postsDir1, '/posts/2023/')
      },
      {
        text: '2024',
        items: generateSidebarItems(postsDir1, '/posts/2024/')
      }
    ],
    '/posts/tech/': [
      {
        text: 'Guide',
        items: generateSidebarItems(postsDir1, '/posts/guide/')
      },
      {
        text: 'Tech',
        items: generateSidebarItems(postsDir2, '/posts/tech/')
      },
      {
        text: '2020',
        items: generateSidebarItems(postsDir1, '/posts/2020/')
      },
      {
        text: '2021',
        items: generateSidebarItems(postsDir1, '/posts/2021/')
      },
      {
        text: '2022',
        items: generateSidebarItems(postsDir1, '/posts/2022/')
      },
      {
        text: '2023',
        items: generateSidebarItems(postsDir1, '/posts/2023/')
      },
      {
        text: '2024',
        items: generateSidebarItems(postsDir1, '/posts/2024/')
      }
    ],
    '/posts/2020/': [
      {
        text: 'Guide',
        items: generateSidebarItems(postsDir1, '/posts/guide/')
      },
      {
        text: 'Tech',
        items: generateSidebarItems(postsDir2, '/posts/tech/')
      },
      {
        text: '2020',
        items: generateSidebarItems(postsDir1, '/posts/2020/')
      },
      {
        text: '2021',
        items: generateSidebarItems(postsDir1, '/posts/2021/')
      },
      {
        text: '2022',
        items: generateSidebarItems(postsDir1, '/posts/2022/')
      },
      {
        text: '2023',
        items: generateSidebarItems(postsDir1, '/posts/2023/')
      },
      {
        text: '2024',
        items: generateSidebarItems(postsDir1, '/posts/2024/')
      }
    ],
    '/posts/2021/': [
      {
        text: 'Guide',
        items: generateSidebarItems(postsDir1, '/posts/guide/')
      },
      {
        text: 'Tech',
        items: generateSidebarItems(postsDir2, '/posts/tech/')
      },
      {
        text: '2020',
        items: generateSidebarItems(postsDir1, '/posts/2020/')
      },
      {
        text: '2021',
        items: generateSidebarItems(postsDir1, '/posts/2021/')
      },
      {
        text: '2022',
        items: generateSidebarItems(postsDir1, '/posts/2022/')
      },
      {
        text: '2023',
        items: generateSidebarItems(postsDir1, '/posts/2023/')
      },
      {
        text: '2024',
        items: generateSidebarItems(postsDir1, '/posts/2024/')
      }
    ],
    '/posts/2022/': [
      {
        text: 'Guide',
        items: generateSidebarItems(postsDir1, '/posts/guide/')
      },
      {
        text: 'Tech',
        items: generateSidebarItems(postsDir2, '/posts/tech/')
      },
      {
        text: '2020',
        items: generateSidebarItems(postsDir1, '/posts/2020/')
      },
      {
        text: '2021',
        items: generateSidebarItems(postsDir1, '/posts/2021/')
      },
      {
        text: '2022',
        items: generateSidebarItems(postsDir1, '/posts/2022/')
      },
      {
        text: '2023',
        items: generateSidebarItems(postsDir1, '/posts/2023/')
      },
      {
        text: '2024',
        items: generateSidebarItems(postsDir1, '/posts/2024/')
      }
    ],
    '/posts/2023/': [
      {
        text: 'Guide',
        items: generateSidebarItems(postsDir1, '/posts/guide/')
      },
      {
        text: 'Tech',
        items: generateSidebarItems(postsDir2, '/posts/tech/')
      },
      {
        text: '2020',
        items: generateSidebarItems(postsDir1, '/posts/2020/')
      },
      {
        text: '2021',
        items: generateSidebarItems(postsDir1, '/posts/2021/')
      },
      {
        text: '2022',
        items: generateSidebarItems(postsDir1, '/posts/2022/')
      },
      {
        text: '2023',
        items: generateSidebarItems(postsDir1, '/posts/2023/')
      },
      {
        text: '2024',
        items: generateSidebarItems(postsDir1, '/posts/2024/')
      }
    ],
    '/posts/2024/': [
      {
        text: 'Guide',
        items: generateSidebarItems(postsDir1, '/posts/guide/')
      },
      {
        text: 'Tech',
        items: generateSidebarItems(postsDir2, '/posts/tech/')
      },
      {
        text: '2020',
        items: generateSidebarItems(postsDir1, '/posts/2020/')
      },
      {
        text: '2021',
        items: generateSidebarItems(postsDir1, '/posts/2021/')
      },
      {
        text: '2022',
        items: generateSidebarItems(postsDir1, '/posts/2022/')
      },
      {
        text: '2023',
        items: generateSidebarItems(postsDir1, '/posts/2023/')
      },
      {
        text: '2024',
        items: generateSidebarItems(postsDir1, '/posts/2024/')
      }
    ]
  }
}
