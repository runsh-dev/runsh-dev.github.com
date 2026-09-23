<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

type ReadingSize = "small" | "default" | "large";
type ReadingFont = "serif" | "sans";
const emit = defineEmits<{
  change: [preferences: { size: ReadingSize; font: ReadingFont }];
}>();
const storageKey = "yohaku-reading-preferences";
const size = ref<ReadingSize>("default");
const font = ref<ReadingFont>("sans");
const sizes = [
  { value: "small", label: "小" },
  { value: "default", label: "标准" },
  { value: "large", label: "大" },
] as const;
const fonts = [
  { value: "sans", label: "系统字体" },
  { value: "serif", label: "思源宋体" },
] as const;

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (sizes.some((option) => option.value === saved?.size))
      size.value = saved.size;
    if (fonts.some((option) => option.value === saved?.font))
      font.value = saved.font;
  } catch {
    // Reading remains available when storage is blocked or contains invalid data.
  }
  emit("change", { size: size.value, font: font.value });
});

watch([size, font], () => {
  const preferences = { size: size.value, font: font.value };
  emit("change", preferences);
  try {
    localStorage.setItem(storageKey, JSON.stringify(preferences));
  } catch {
    // Preferences still apply for this page without persistent storage.
  }
});
</script>

<template>
  <div class="reading-controls" role="group" aria-label="阅读设置">
    <span class="reading-label">阅读设置</span>
    <div class="reading-options" role="group" aria-label="正文字号">
      <button
        v-for="option in sizes"
        :key="option.value"
        type="button"
        :aria-label="`字号：${option.label}`"
        :aria-pressed="size === option.value"
        @click="size = option.value"
      >
        {{ option.label }}
      </button>
    </div>
    <div class="reading-options" role="group" aria-label="正文字体">
      <button
        v-for="option in fonts"
        :key="option.value"
        type="button"
        :aria-pressed="font === option.value"
        @click="font = option.value"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.reading-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px 16px;
  margin: 0 0 40px;
  padding: 10px 14px;
  border-radius: 14px;
  background: var(--yohaku-neutral-1);
  font-family: var(--vp-font-family-base);
  font-size: 0.8125rem;
  color: var(--yohaku-neutral-6);
}
.reading-label {
  margin-right: auto;
}
.reading-options {
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 9px;
  background: var(--yohaku-neutral-2);
}
button {
  min-width: 40px;
  min-height: 40px;
  padding: 4px 8px;
  border-radius: 7px;
  font: inherit;
  color: var(--yohaku-neutral-7);
}
button:hover {
  background: var(--yohaku-neutral-1);
}
button[aria-pressed="true"] {
  background: var(--yohaku-paper);
  color: var(--yohaku-neutral-10);
  font-weight: 600;
  box-shadow: 0 1px 4px rgb(0 0 0 / 8%);
}
button:active {
  background: var(--yohaku-accent-soft);
}
@media (pointer: coarse) {
  button {
    min-height: 44px;
  }
}
@media (max-width: 540px) {
  .reading-label {
    flex-basis: 100%;
  }
}
@media (max-width: 380px) {
  .reading-controls {
    gap: 8px;
  }
  button {
    min-width: 34px;
    padding-inline: 6px;
  }
}
</style>
