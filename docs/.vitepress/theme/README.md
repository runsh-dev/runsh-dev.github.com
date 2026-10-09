# Life & BLOG · 阅读主题

以 apple-design 为基础的个人博客：白色画布、浅灰内容分区、思源宋体、克制的蓝色链接，配合半透明导航和轻微的按压反馈。深色模式使用中性灰黑，不改变信息层级。

## 页面结构

- 首页：居中介绍、最新文章与城市照片、六篇近期文章、站点题记。
- 归档：按年份分组的文章列表；年份索引保持原有路由。
- 阅读页：返回入口、文章信息、阅读设置、正文和上下篇导航。
- 页脚：品牌、归档、关于和 GitHub 链接；版权配置沿用站点设置。

## 排版与阅读偏好

| 项目         | 默认值                                       |
| ------------ | -------------------------------------------- |
| 界面与正文   | 思源宋体，优先已安装字体，再加载随站字体     |
| 正文宽度     | 45rem                                        |
| 桌面字号     | 小 17px、标准 19px、大 21px，使用 rem        |
| 手机字号     | 小 15px、标准 17px、大 19px，使用 rem        |
| 正文行高     | 桌面约 1.4211（27px），手机约 1.4706（25px） |
| 文章标题     | 桌面 48px / 52px，手机 32px / 39px           |
| 二级标题     | 桌面 24px / 31px，手机 21px / 28px           |
| 可选字体     | 系统字体栈，优先 Apple 系统字体与苹方        |
| 阅读偏好存储 | yohaku-reading-preferences，兼容已有设置     |

字号和字体设置只改变正文。页面标题与导航维持默认思源宋体，避免阅读设置改变整个界面。已有字体选择继续沿用；没有保存偏好时使用思源宋体。禁用本地存储时，即时切换仍可使用。

字号、行距和段落间距参考 [Apple Newsroom 文章](https://www.apple.com.cn/newsroom/2026/10/new-data-shows-app-store-ecosystem-is-fueling-developer-success/) 的实际样式；734px 及以下使用手机排版。字号切换时，正文和二级标题按比例缩放。

## 交互与无障碍

按压时即时反馈；悬停效果仅在支持 hover 的设备启用。没有自动播放或入场动画。减少动态效果时关闭位移、缩放和顺滑滚动；减少透明度时导航使用实色；高对比度时加深文字与边界。所有内容链接可用键盘访问。

## 维护入口

- styles/vars.scss：共享色彩、字体和阅读尺寸。
- styles/yohaku.scss：正文排版、焦点与无障碍样式。
- styles/layouts/nav.scss：半透明导航与移动布局。
- components/VPHome.vue、HomePostsPreview.vue、PostCard.vue：首页。
- components/ReadingControls.vue、VPDoc.vue：阅读偏好。
- components/JournalFooter.vue：通用页脚。
- docs/public/journal-city.jpg：由已有 docs/publish/img.png 转换的压缩照片，原图保留。

验证命令为 npm run docs:build。检查首页、文章归档、年份索引、关于页和长文章，覆盖浅深主题、320px / 390px / 768px / 桌面宽度及字号切换。skills/design-system/ 是早期设计参考，当前页面以此目录为准。
