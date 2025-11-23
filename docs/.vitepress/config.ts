import { defineConfig } from 'vitepress'
import {
  markdownImagePlugin,
  markdownCodeEnhancePlugin
} from "./plugins/markdownPlugin.js";

import {transformHeadMeta} from "./plugins/headPlugin.js";
import {ThemeConfig} from "./theme/config.js";
import {rss} from "./genFeed.js";
import { generateSidebar } from "./utils/sidebar.js";

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
    theme: "nord",
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
    ]
  ],
  transformHead: (context) => {
    return transformHeadMeta(context)
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
