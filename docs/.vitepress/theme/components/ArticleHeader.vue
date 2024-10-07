<script setup lang="ts">
import {ref, computed, onMounted, watch, nextTick} from "vue";
import {useData, withBase, useRoute, useRouter} from "vitepress";

const {frontmatter} = useData()
const route = useRoute();
const router = useRouter();
const title = computed(() => frontmatter.value.title);
const date = computed(() => frontmatter.value.date);

const headerStyle = () => {
  const style = {} as { backgroundImage: string };
  if (
      frontmatter.value.layout === "doc" &&
      frontmatter.value.useHeaderImage &&
      frontmatter.value.headerImage
  ) {
    style.backgroundImage = `url(${withBase(frontmatter.value.headerImage)})`;
  }
  return style;
};
</script>

<template>
  <div
      class="article-header"
  >
    <div
        v-if="frontmatter.useHeaderImage && frontmatter.headerMask"
        class="article-header-mask"
        :style="{ background: frontmatter.headerMask }"
    />

    <div class="article-header-content">
      <h1 class="font-bold text-3xl text-center">
        {{ frontmatter.title }}
      </h1>
      <div class="header-img-body" v-if="frontmatter && frontmatter.headerImage">
        <img class="header-img-cover" :src="frontmatter.headerImage" alt="computed" />
      </div>


      <p v-if="frontmatter.subtitle" class="article-subtitle">
        {{ frontmatter.title }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.article-header{
  //height: 200px;
  padding-bottom: 20px;
}
.article-header.use-image {
  max-width: 100%;
  position: relative;
  padding-bottom: 6rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.header-img-body{
  margin-top: 20px;
  width: 100%;
  border-radius: 10px;
  height: 400px;
  overflow: hidden;

}
.header-img-cover{
  width: 100%; /* 图片宽度为容器宽度的100% */
  height: 100%; /* 图片高度为容器高度的100% */
  object-fit: cover; /* 保持比例，覆盖容器，裁剪超出部分 */
  object-position: center; /* 显示图片的中间部分 */
}
</style>
