import {createContentLoader} from "vitepress";
import {formatPostDate} from "./utils";
import type {PostPageDate, PostPageFrontmatter} from "./types";

declare const data: PostPageFrontmatter[];

// 声明一个全局所有文章分类的数组,结构是 {name:"分类名",text:"分类单词",count:"分类文章数量"}
declare const categoriesMeta: { name: string; text: string; count: number }[];

export {data, categoriesMeta};

// 首页摘要：优先取 <!-- more --> 之前的内容，否则取开头几段（遇到标题或足够长即停止）
const EXCERPT_MAX_CHARS = 240;
const EXCERPT_MAX_BLOCKS = 6;

function extractExcerpt(file: { content: string; excerpt?: string }) {
  const content = file.content.replace(/^\s+/, "");
  const more = content.indexOf("<!-- more -->");
  if (more > -1) {
    file.excerpt = content.slice(0, more);
    return;
  }
  const blocks: string[] = [];
  let length = 0;
  for (const block of content.split(/\n\s*\n/)) {
    const text = block.trim();
    if (!text) continue;
    if (/^#{1,6}\s/.test(text)) {
      if (blocks.length) break;
      continue;
    }
    if (/^(```|~~~|<|!\[|\||:::)/.test(text)) continue;
    blocks.push(text);
    length += text.length;
    if (length >= EXCERPT_MAX_CHARS || blocks.length >= EXCERPT_MAX_BLOCKS) break;
  }
  file.excerpt = blocks.join("\n\n");
}

export default createContentLoader("posts/**/*.md", {
  excerpt: extractExcerpt,
  transform(raw): PostPageFrontmatter[] {
    return raw
      .filter(({frontmatter}) => !frontmatter.hide && frontmatter.date)
      .map(({url, frontmatter, excerpt}) => ({
        title: frontmatter.title,
        url: url,
        path: url,
        excerpt: excerpt,
        description: excerpt as string,
        subtitle: frontmatter.subtitle,
        cover: frontmatter.headerImage || frontmatter.cover,
        date: formatDate(frontmatter.date),
        categories: frontmatter.categories,
        author: frontmatter.author,
        layout: frontmatter.layout,
        useHeaderImage: frontmatter.useHeaderImage,
        headerImage: frontmatter.headerImage,
        headerMask: frontmatter.headerMask,
        headerImageCredit: frontmatter.headerImageCredit,
        headerImageCreditLink: frontmatter.headerImageCreditLink,
        aside: frontmatter.aside || false,
        hide: frontmatter.hide || false,
        tags: frontmatter.tags || [],

      }))
      .sort((a, b) => b.date.time - a.date.time);
  },
});

function formatDate(raw: string): PostPageDate {
  const date = new Date(raw);
  date.setUTCHours(12);
  return {
    time: +date,
    raw: raw,
    defaultDate:formatPostDate(raw),
  };
}
