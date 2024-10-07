import { defineConfig } from 'vitepress'
import {
  markdownImagePlugin,
  markdownCodeEnhancePlugin
} from "./plugins/markdownPlugin.js";

import {transformHeadMeta} from "./plugins/headPlugin.js";
import {ThemeConfig} from "./theme/config.js";
import {rss} from "./genFeed.js";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "随笔",
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
  ],
  transformHead: (context) => {
    return transformHeadMeta(context)
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Post', link: '/posts/index.md' },
      {text: "Articles", link: "/articles"},
      { text: 'About', link: '/about' }
    ],

    sidebar: {
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jianjiade' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2012-present JianJiaDe'
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
