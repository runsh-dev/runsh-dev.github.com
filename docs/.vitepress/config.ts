import { defineConfig } from 'vitepress'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  markdownImagePlugin,
  markdownCodeEnhancePlugin
} from "./plugins/markdownPlugin.js";

import {transformHeadMeta} from "./plugins/headPlugin.js";
import {ThemeConfig} from "./theme/config.js";
import {rss} from "./genFeed.js";
import { generateSidebar } from "./utils/sidebar.js";
import { generateMissingIndexFiles } from "./plugins/generateIndex.js";
import { isPostDetail } from "./utils/page.js";

// 在配置加载时生成缺失的 index.md 文件
generateMissingIndexFiles();

const getReadingStats = (source: string) => {
  const content = source
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[#>*_`~[\]()-]/g, ' ')

  const chineseCharacters = content.match(/[\u3400-\u9fff]/g)?.length || 0
  const latinWords = content.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length || 0
  const wordCount = chineseCharacters + latinWords
  const minutes = Math.max(1, Math.ceil(chineseCharacters / 400 + latinWords / 200))

  return { wordCount, minutes }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Life & BLOG",
  description: "人生不是一场赛跑，而是一场旅行。",
  cleanUrls: true,
  buildEnd: rss,
  appearance: true,
  ignoreDeadLinks: true,
  base: "/",
  markdown: {
    lineNumbers: false,
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
    config: (md) => {
      md.use(markdownImagePlugin);
      md.use(markdownCodeEnhancePlugin);
    },
  },
  head: [
    [
      "meta",
      {
        name: "keywords",
        content:
            "runsh dev jianjiade",
      },
    ],
    [
      "meta",
      {
        name: "description",
        content:
            "runsh sh script devops",
      },
    ],
    [
      'link', {'rel':'icon', href:'/favicon.ico'}
    ],
    [
      'script',
      {async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-7RNEYK877J'}
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-7RNEYK877J');`
    ],
	  ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
	  ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
	  ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500&display=swap' }]
  ],
  transformHead: (context) => {
    return transformHeadMeta(context)
  },
  transformPageData(pageData, { siteConfig }) {
    if (!isPostDetail(pageData.relativePath)) return

    const source = readFileSync(join(siteConfig.srcDir, pageData.filePath), 'utf-8')
    const { wordCount, minutes } = getReadingStats(source)
    const pageClass = [pageData.frontmatter.pageClass, 'yohaku-post-page']
      .filter(Boolean)
      .join(' ')

    return {
      frontmatter: {
        ...pageData.frontmatter,
        sidebar: false,
        aside: false,
        outline: false,
        pageClass,
        readingTime: minutes,
        wordCount
      }
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: "Articles", link: "/articles" },
	    { text: "Lab", link: "/lab" },
      { text: 'About', link: '/about' }
    ],

    sidebar: {
      '/lab': [
        {
          text: 'Lab',
          items: [
            { text: '2020', link: '/posts/2020' },
            { text: '2021', link: '/posts/2021' },
            { text: '2022', link: '/posts/2022' },
            { text: '2023', link: '/posts/2023' },
            { text: '2024', link: '/posts/2024' },
            { text: '2025', link: '/posts/2025' },
            { text: 'Guide', link: '/posts/guide' },
            { text: 'Tech', link: '/posts/tech' }
          ]
        }
      ],
      ...generateSidebar()
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/runsh-dev' }
    ],

    outline: {
      level: [2, 3],
      label: 'CONTENTS'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    footer: {
      message: 'Released under the CC BY-NC-ND 3.0',
      copyright: 'Copyright © 1990-2024 RUNSH.DEV'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
})
