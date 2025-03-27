<script setup lang="ts">
import type {Editor} from "@tiptap/vue-3";
const { editor } = defineProps<{
  editor: Editor
}>()

</script>

<template>
  <div class="mb-5">
    <UButton variant="ghost" @click="editor.chain().focus().toggleBold().run()" icon="i-ph-text-b-bold" />
    <UButton variant="ghost" @click="editor.chain().focus().toggleItalic().run()" icon="i-ph-text-italic" />
    <UButton variant="ghost" @click="editor.chain().focus().toggleUnderline().run()" icon="i-ph-text-underline" />

    <UButton icon="i-lucide-mail" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" label="W" />
    <UButton icon="i-lucide-mail" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" label="W" />
    <UButton icon="i-lucide-mail" @click="editor.chain().focus().toggleBulletList().run()" label="Список" />
    <UButton icon="i-lucide-mail" @click="editor.chain().focus().toggleOrderedList().run()" label="W" />
    <UButton icon="i-lucide-mail" @click="editor.chain().focus().setParagraph().run()" label="W" />
    <UButton icon="i-lucide-mail" @click="editor.chain().focus().undo().run()" label="W"/>
    <UButton icon="i-lucide-mail" @click="editor.chain().focus().redo().run()" label="W"/>
  </div>
</template>

<style scoped>

</style>