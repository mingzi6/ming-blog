import { defineConfig } from 'vitepress'
import { copy } from 'fs-extra'
import { resolve } from 'path'
// 导入主题的配置
import { blogTheme } from './blog-theme.ts'

// 部署在 Cloudflare Pages，自定义域名直接留空 base
// 只有部署在 xxx.github.io/仓库名 才需要填 base
export default defineConfig({
  extends: blogTheme,
  lang: 'zh-cn',
  title: 'Mr·明先森 - 个人学院',
  description: 'Mr·明先森 的个人博客，记录技术、设计与生活随笔',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    // 目录读取 2、3级标题
    outline: {
      level: [2, 3],
      label: '目录'
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdated: {
      text: '上次更新于',
    },

    logo: '/logo.png',

    // 顶部导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '归档', link: '/archive/' },
      { text: '标签', link: '/tags/' },
      { text: '友链', link: '/friends/' },
      { text: '关于', link: '/about/' }
    ],

    // 社交图标（按需替换你的链接）
    socialLinks: [
      // { icon: 'github', link: 'https://github.com/xxx' }
    ],

    // 博客基础信息
    blog: {
      name: 'Mr·明先森',
      motto: '慢慢来，会更好',
      avatar: '',
      // 开启公告面板（和mooyan.me一样右上角公告）
      notice: {
        title: '公告',
        content: '本站使用 VitePress + @sugarat/theme 搭建，静态托管于 Cloudflare Pages。',
      }
    },

    // 开启全站搜索（主题内置搜索）
    search: {
      provider: 'local'
    }
  },

  vite: {
    plugins: [
      {
        name: 'copy-admin',
        async writeBundle() {
          // resolve 自动定位：项目根目录/admin
          const src = resolve(__dirname, '../../admin')
          const dest = resolve(__dirname, '../dist/admin')
          await copy(src, dest, {
            overwrite: true
          })
        }
      }
    ]
  }
})
