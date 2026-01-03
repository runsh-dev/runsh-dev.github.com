import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, extname } from 'path'

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
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
    
    frontmatterStr.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim()
        const value = line.substring(colonIndex + 1).trim().replace(/^['"]|['"]$/g, '')
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
  
  return fileName.replace(/\.md$/, '')
}

/**
 * 生成目录下的所有文件的sidebar items
 * @param dirPath 目录的绝对路径
 * @param urlBasePath URL基础路径，如 /posts/2024/
 */
function generateSidebarItems(dirPath: string, urlBasePath: string): SidebarItem[] {
  const items: SidebarItem[] = []
  
  if (!existsSync(dirPath)) {
    return items
  }
  
  try {
    const entries = readdirSync(dirPath, { withFileTypes: true })
      .filter(dirent => {
        const name = dirent.name
        return !name.startsWith('.') && 
               name !== 'index.md' && 
               name !== 'README.md' &&
               name !== 'media' &&
               (dirent.isDirectory() || extname(name) === '.md')
      })
      .sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1
        if (!a.isDirectory() && b.isDirectory()) return 1
        return a.name.localeCompare(b.name)
      })
    
    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name)
      
      if (entry.isDirectory()) {
        const subItems = generateSidebarItems(fullPath, `${urlBasePath}${entry.name}/`)
        if (subItems.length > 0) {
          items.push({
            text: entry.name,
            collapsed: true,
            items: subItems
          })
        }
      } else if (extname(entry.name) === '.md') {
        const fileName = entry.name.replace(/\.md$/, '')
        const link = `${urlBasePath}${fileName}`
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

/**
 * 获取posts目录下的所有子目录（年份文件夹、guide、tech等）
 */
function getPostsSubDirs(): string[] {
  const postsDir = join(process.cwd(), 'docs', 'posts')
  const dirs: string[] = []
  
  try {
    const entries = readdirSync(postsDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'media') {
        dirs.push(entry.name)
      }
    }
  } catch (error) {
    console.error('Error reading posts directory:', error)
  }
  
  return dirs.sort((a, b) => {
    // 年份目录排在后面，其他目录排在前面
    const aIsYear = /^\d{4}$/.test(a)
    const bIsYear = /^\d{4}$/.test(b)
    if (aIsYear && !bIsYear) return 1
    if (!aIsYear && bIsYear) return -1
    return a.localeCompare(b)
  })
}

/**
 * 生成完整的sidebar配置，所有/posts/下的页面共享同一个sidebar
 */
function generateAllPostsSidebar(): SidebarItem[] {
  const postsDir = join(process.cwd(), 'docs', 'posts')
  const subDirs = getPostsSubDirs()
  const sidebarItems: SidebarItem[] = []
  
  for (const dir of subDirs) {
    const dirPath = join(postsDir, dir)
    const items = generateSidebarItems(dirPath, `/posts/${dir}/`)
    
    if (items.length > 0) {
      sidebarItems.push({
        text: dir,
        collapsed: true,
        items: items
      })
    }
  }
  
  return sidebarItems
}

export function generateSidebar() {
  const allPostsSidebar = generateAllPostsSidebar()
  const subDirs = getPostsSubDirs()
  
  // 为每个子目录生成相同的sidebar配置
  const sidebar: Record<string, SidebarItem[]> = {}
  
  // 为 /posts/ 根路径添加sidebar
  sidebar['/posts/'] = allPostsSidebar
  
  for (const dir of subDirs) {
    sidebar[`/posts/${dir}/`] = allPostsSidebar
  }
  
  return sidebar
}
