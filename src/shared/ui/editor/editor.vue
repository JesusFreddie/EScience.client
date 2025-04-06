<template>
  <div v-if="editor" class="container h-full">
    <div class="control-group">
      <div class="button-group">
        <EditorToolbar :editor="editor"/>
      </div>
    </div>
    <editor-content :editor="editor" class="h-full" />
  </div>
</template>

<script setup lang="ts">
import { number } from 'zod';
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import EditorToolbar from "~/src/shared/ui/editor/editor-toolbar.vue";
import {Underline} from "@tiptap/extension-underline";

const { debounceSave, debounceTime, modelValue } = defineProps<{
  modelValue: string,
  debounceSave: boolean,
  debounceTime?: number
}>();

const emit = defineEmits(
  ['update:modelValue', 'save']
)

const saveTimeout = ref<NodeJS.Timeout>()
const editor = ref<Editor>()

onMounted(() => {
  editor.value = new Editor({
      extensions: [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit,
        Underline
      ],
      content: modelValue,
      onUpdate: ({ editor }) => { 
        const html = editor.getHTML()

        emit('update:modelValue', html)

        if (debounceSave)
          debouncedSave(html)
      }
    })
})

watch(() => modelValue, (newValue) => {
  if (editor && newValue != editor.value?.getHTML()) {
    console.log("ASDASDASDAS")
    editor.value?.commands.setContent(newValue, false)
  }
})

function debouncedSave(content: string) {
  if (saveTimeout) clearTimeout(saveTimeout.value)
  saveTimeout.value = setTimeout(() => {
    emit('save', content)
  }, debounceTime)
}

onBeforeUnmount(() => {
  editor.value?.destroy()
  if (saveTimeout) clearTimeout(saveTimeout.value)
})

</script>

<!-- <script>
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import EditorToolbar from "~/src/shared/ui/editor/editor-toolbar.vue";
import {Underline} from "@tiptap/extension-underline";

export default {
  components: {
    EditorToolbar,
    EditorContent,
  },

  data() {
    return {
      editor: null,
    }
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    saveArticle: {
      type: Function,
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit,
        Underline
      ],
      content: this.content,
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script> -->

<style lang="scss">
/* Basic editor styles */

</style>