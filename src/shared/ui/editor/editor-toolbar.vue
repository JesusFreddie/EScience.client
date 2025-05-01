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
  <div class="mb-5 flex">
    <UButton variant="ghost" @click="editor.chain().focus().toggleBold().run()" icon="i-ph-text-b-bold" />
    <UButton variant="ghost" @click="editor.chain().focus().toggleItalic().run()" icon="i-ph-text-italic" />
    <UButton variant="ghost" @click="editor.chain().focus().toggleUnderline().run()" icon="i-ph-text-underline" />

    <UPopover>
      <UButton color="white" label="Open" trailing-icon="i-heroicons-chevron-down-20-solid" />

      <template #panel>
        <div class="p-1">
          <UButton variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" icon="i-ph-text-b-bold" />
          <UButton variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" icon="i-ph-text-italic" />
          <UButton variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" icon="i-ph-text-underline" />
          <UButton variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" icon="i-ph-text-underline" />
          <UButton variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" icon="i-ph-text-underline" />
          <UButton variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" icon="i-ph-text-underline" />
        </div>
      </template>
    </UPopover>

    <UButton icon="i-lucide-mail" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" label="W" />
    <UButton icon="i-lucide-mail" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" label="W" />
    <UButton icon="i-lucide-mail" @click="editor.chain().focus().toggleBulletList().run()" label="Список" />
    <UButton icon="i-lucide-mail" @click="editor.chain().focus().toggleOrderedList().run()" label="W" />
    <UButton icon="i-lucide-mail" @click="editor.chain().focus().setParagraph().run()" label="W" />
    <UButton icon="i-lucide-mail" @click="editor.chain().focus().undo().run()" label="W"/>
    <UButton icon="i-lucide-mail" @click="editor.chain().focus().redo().run()" label="W"/>

    <UButton variant="ghost" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" icon="i-ph-text-underline" />
  </div>
</template>

<style scoped>

</style>