<script setup lang="ts">
import type {Editor} from "@tiptap/vue-3";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { editor } = defineProps<{
  editor: Editor
}>()

function setFontFamily() {
  editor.chain().focus().setFontFamily('').run()
}

function setFontSize() {
  editor.chain().focus();
}

function setLink() {
  const previousUrl = editor.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  // update link
  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

function insertImage() {
  const url = window.prompt('Image URL')

  if (url) {
    editor.chain().focus().setImage({ src: url }).run()
  }
}

function insertTable() {
  editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
}

function insertYoutubeVideo() {
  const url = window.prompt('YouTube Video URL')

  if (url) {
    // Extract video ID from YouTube URL
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    if (match && match[2].length === 11) {
      const videoId = match[2]
      const embedHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`
      editor.chain().focus().insertContent(embedHTML).run()
    } else {
      window.alert('Invalid YouTube URL')
    }
  }
}

function insertMathFormula() {
  const formula = window.prompt('Enter LaTeX formula')

  if (formula) {
    // We'll use a simple approach with a span that can be styled
    const mathHTML = `<span class="math-formula" data-formula="${formula}">${formula}</span>`
    editor.chain().focus().insertContent(mathHTML).run()
  }
}

</script>

<template>
  <div class="mb-2 flex gap-1 flex-wrap">
    <!-- Text formatting -->
    <div class="flex gap-1">
      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().toggleBold().run()" icon="i-ph-text-b-bold" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.BOLD') }}</div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().toggleItalic().run()" icon="i-ph-text-italic" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.ITALIC') }}</div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().toggleUnderline().run()" icon="i-ph-text-underline" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.UNDERLINE') }}</div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().toggleStrike().run()" icon="i-ph-text-strikethrough" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.STRIKETHROUGH') }}</div>
        </template>
      </UPopover>
    </div>

    <!-- Headings -->
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

    <!-- Lists -->
    <div class="flex gap-1">
      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().toggleBulletList().run()" icon="i-ph-list-bullets" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.BULLET_LIST') }}</div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().toggleOrderedList().run()" icon="i-ph-list-numbers" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.NUMBERED_LIST') }}</div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().setParagraph().run()" icon="i-ph-paragraph" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.PARAGRAPH') }}</div>
        </template>
      </UPopover>
    </div>

    <!-- Text alignment -->
    <div class="flex gap-1">
      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().setTextAlign('left').run()" icon="i-ph-text-align-left" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.ALIGN_LEFT') }}</div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().setTextAlign('center').run()" icon="i-ph-text-align-center" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.ALIGN_CENTER') }}</div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().setTextAlign('right').run()" icon="i-ph-text-align-right" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.ALIGN_RIGHT') }}</div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().setTextAlign('justify').run()" icon="i-ph-text-align-justify" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.JUSTIFY') }}</div>
        </template>
      </UPopover>
    </div>

    <!-- Links, Images, Tables, etc. -->
    <div class="flex gap-1">
      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="setLink" icon="i-ph-link" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.INSERT_LINK') }}</div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="insertImage" icon="i-ph-image" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.INSERT_IMAGE') }}</div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="insertTable" icon="i-ph-table" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.INSERT_TABLE') }}</div>
        </template>
      </UPopover>

      <!-- Table Operations -->
      <UPopover>
        <UButton variant="ghost" icon="i-ph-table-simple" trailing-icon="i-heroicons-chevron-down-20-solid" />
        <template #panel>
          <div class="p-1 flex flex-col gap-1">
            <UButton variant="ghost" @click="editor.chain().focus().toggleHeaderCell().run()" icon="i-ph-table-header" />
            <UButton variant="ghost" @click="editor.chain().focus().addColumnBefore().run()" icon="i-ph-table-column-insert-left" />
            <UButton variant="ghost" @click="editor.chain().focus().addColumnAfter().run()" icon="i-ph-table-column-insert-right" />
            <UButton variant="ghost" @click="editor.chain().focus().deleteColumn().run()" icon="i-ph-table-column-delete" />
            <UButton variant="ghost" @click="editor.chain().focus().addRowBefore().run()" icon="i-ph-table-row-insert-top" />
            <UButton variant="ghost" @click="editor.chain().focus().addRowAfter().run()" icon="i-ph-table-row-insert-bottom" />
            <UButton variant="ghost" @click="editor.chain().focus().deleteRow().run()" icon="i-ph-table-row-delete" />
            <UButton variant="ghost" @click="editor.chain().focus().deleteTable().run()" icon="i-ph-trash" />
            <UButton variant="ghost" @click="editor.chain().focus().mergeCells().run()" icon="i-ph-table-merge-cells" />
            <UButton variant="ghost" @click="editor.chain().focus().splitCell().run()" icon="i-ph-table-split-cells" />
          </div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="insertYoutubeVideo" icon="i-ph-youtube-logo" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.INSERT_YOUTUBE') }}</div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="insertMathFormula" icon="i-ph-function" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.INSERT_MATH') }}</div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().toggleCodeBlock().run()" icon="i-ph-code-block" />
        <template #panel>
          <div class="p-1">{{ t('EDITOR.CODE_BLOCK') }}</div>
        </template>
      </UPopover>
    </div>

    <!-- History -->
    <div class="flex gap-1">
      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().undo().run()" icon="i-ph-arrow-counter-clockwise"/>
        <template #panel>
          <div class="p-1">{{ t('EDITOR.UNDO') }}</div>
        </template>
      </UPopover>

      <UPopover :popper="{ placement: 'top' }" mode="hover" :ui="{ wrapper: 'inline-block' }">
        <UButton variant="ghost" @click="editor.chain().focus().redo().run()" icon="i-ph-arrow-clockwise"/>
        <template #panel>
          <div class="p-1">{{ t('EDITOR.REDO') }}</div>
        </template>
      </UPopover>
    </div>
  </div>
</template>

<style scoped>

</style>
