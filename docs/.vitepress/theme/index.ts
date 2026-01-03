import {Theme} from "vitepress";
import DefaultTheme from "vitepress/theme-without-fonts";
// @ts-ignore
import Layout from "./components/Layout.vue";
import Archives from "./components/Archives.vue";
import Comment from "./components/Comment.vue";
import YearIndex from "./components/YearIndex.vue";
import {customConfigProvider} from "./configProvider";
import './styles/index.scss';
import './styles/myfonts.scss';
import './styles/custom.css'
export default {
  ...DefaultTheme,
  Layout: customConfigProvider(Layout),
  enhanceApp({app}) {
    app.component("Archives", Archives);
    app.component("Comment", Comment);
    app.component("YearIndex", YearIndex);
  },
} as Theme;
