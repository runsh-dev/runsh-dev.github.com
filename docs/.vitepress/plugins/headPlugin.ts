import type {HeadConfig, TransformContext} from "vitepress";


export async function transformHeadMeta(context: TransformContext): Promise<HeadConfig[]> {
    
    // console.log('transformHeadMeta', context.assets);
    const fontsList = context.assets.filter(item => item.endsWith('.woff2'));
    
    // console.log('fontsList', fontsList);
    console.log('transformHeadMeta', fontsList);

    //字体
    const headFontsList:any = [];

    fontsList.forEach(font => {
        headFontsList.push(["link", {rel: "preload", as: "font", href: font, type: "font/woff2", crossorigin: "anonymous"}]);
    })


    const {pageData} = context;
    const head: HeadConfig[] = [];
    
    const url = addBase(pageData.relativePath.slice(0, -3)) + '.html';
    const title = pageData.title || context.title;
    const description = pageData.description || context.description;
    const image = pageData.frontmatter.cover || "https://cdnv2.ruguoapp.com/FgUG5YDx1bS0JhSSUK8Z-QlXdYgPv3.jpg";
    const type = context.page.startsWith('/blog') ? 'article' : 'website';

    const ogUrl: HeadConfig = ["meta", {property: "og:url", content: url}];
    const ogTitle: HeadConfig = ["meta", {property: "og:title", content: title}];
    const ogDescription: HeadConfig = ["meta", {property: "og:description", content: description}];
    const ogImage: HeadConfig = ["meta", {property: "og:image", content: image}];
    const ogType: HeadConfig = ["meta", {property: "og:type", content: type}];
    head.push(ogUrl, ogTitle, ogDescription, ogImage, ogType);

    const twitterCard: HeadConfig = ["meta", {name: "twitter:card", content: "summary_large_image"}];
    const twitterTitle: HeadConfig = ["meta", {name: "twitter:title", content: title}];
    const twitterDescription: HeadConfig = ["meta", {name: "twitter:description", content: description}];
    const twitterImage: HeadConfig = ["meta", {name: "twitter:image", content: image}];
    head.push(twitterCard, twitterTitle, twitterImage, twitterDescription);
    head.push(...headFontsList);
    return head;
}

export function addBase(relativePath: string) {
    const host = 'https://runsh.dev'
    if (relativePath && relativePath.startsWith('/')) {
        return host + relativePath
    } else {
        return host + '/' + relativePath
    }
}
