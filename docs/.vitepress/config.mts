import { defineConfig } from 'vitepress'
import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";
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
  },
  vite: {
    plugins: [
      // add plugin
      AutoSidebar({
        ignoreList: ["README.md"], // 忽略文件夹
        path: "docs", // 侧边栏扫描路径(也就是所有笔记所在的目录)
        ignoreIndexItem: true, // 忽略首页
        collapsed: false, // 是否启用折叠，默认为false展开
        deletePrefix: "docs", // 删除路径前缀
        sideBarResolved(data) {
          // 接收完整的侧边栏对象以进行自定义修改
        //   console.log(data);
          return data;
        },
        sideBarItemsResolved(data) {
          // 接收完整的侧边栏 subItem 对象以进行自定义修改
          console.log(data);
          return data;
        },
        beforeCreateSideBarItems(data) {
          // 获取生成侧边栏子项之前扫描的文件名列表。如果要对侧边栏数据进行排序，建议使用
        //   console.log(data);
          return data;
        },
        titleFromFile: false, // 从文件中提取标题
        // You can also set options to adjust sidebar data
        // see option document below
      }),
    ],
  },
})
