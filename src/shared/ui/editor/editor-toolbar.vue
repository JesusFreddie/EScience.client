<script setup lang="ts">
import type {Editor} from "@tiptap/vue-3";
const { editor } = defineProps<{
  editor: Editor
}>()

function setFontFamily() {
  editor.chain().focus().setFontFamily('').run()
}

function setFontSize() {
  editor.chain().focus();
}

</script>

<template>
  <div class="mb-2 flex gap-1">
    <div class="flex gap-1">
      <UButton variant="ghost" @click="editor.chain().focus().toggleBold().run()" icon="i-ph-text-b-bold" />
      <UButton variant="ghost" @click="editor.chain().focus().toggleItalic().run()" icon="i-ph-text-italic" />
      <UButton variant="ghost" @click="editor.chain().focus().toggleUnderline().run()" icon="i-ph-text-underline" />
    </div>

    <UPopover>
      <UButton variant="ghost" icon="i-ph-text-h" trailing-icon="i-heroicons-chevron-down-20-solid" />
      <template #panel>
        <div class="p-1 flex flex-col gap-1">
          <UButton variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" icon="i-ph-text-h-one" />
          <UButton variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" icon="i-ph-text-h-two" />
          <UButton variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" icon="i-ph-text-h-three" />
          <UButton variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" icon="i-ph-text-h-four" />
          <UButton variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" icon="i-ph-text-h-five" />
          <UButton variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" icon="i-ph-text-h-six" />
        </div>
      </template>
    </UPopover>

    <div class="flex gap-1">
      <UButton variant="ghost" @click="editor.chain().focus().toggleBulletList().run()" icon="i-ph-list-bullets" />
      <UButton variant="ghost" @click="editor.chain().focus().toggleOrderedList().run()" icon="i-ph-list-numbers" />
      <UButton variant="ghost" @click="editor.chain().focus().setParagraph().run()" icon="i-ph-paragraph" />
    </div>

    <div class="flex gap-1">
      <UButton variant="ghost" @click="editor.chain().focus().undo().run()" icon="i-ph-arrow-counter-clockwise"/>
      <UButton variant="ghost" @click="editor.chain().focus().redo().run()" icon="i-ph-arrow-clockwise"/>
    </div>
  </div>
</template>

<style scoped>

</style>