import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "随笔",
  description: "人生不是一场赛跑，而是一场旅行。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '技术', link: '/tech/index.md' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'API', link: '/api-examples' },
      
      { text: 'About', link: '/about' }
    ],

    sidebar: {
      '/tech/' : [
        {
          text: '',
          items: [
            { 
              text: '技术', 
              link: '/tech/index.md',
              items: [
                { text: 'TypeScript', link: '/tech/javasript' },
              ]
            },
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' },
            { text: 'About', link: '/about' }
          ]
        },
      ],
      '/about/' : [
        {
          text: '',
          items: [
            { text: 'About', link: '/about' }
          ]
        },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jianjiade' }
    ],
    editLink: {
      pattern: 'https://github.com/ShuYu-Studio/shuyu-studio.github.com/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
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
