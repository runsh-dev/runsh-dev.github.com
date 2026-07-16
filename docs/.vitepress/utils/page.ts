export const isPostIndex = (relativePath: string) =>
  relativePath === "posts/index.md" ||
  (relativePath.startsWith("posts/") && relativePath.endsWith("/index.md"));

export const isPostDetail = (relativePath: string) =>
  relativePath.startsWith("posts/") &&
  relativePath.endsWith(".md") &&
  !isPostIndex(relativePath);
