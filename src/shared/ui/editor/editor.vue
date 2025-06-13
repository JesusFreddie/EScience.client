<script setup lang="ts">
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import EditorToolbar from "~/src/shared/ui/editor/editor-toolbar.vue";
import { Underline } from "@tiptap/extension-underline";
import Heading from '@tiptap/extension-heading'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'

import '~/assets/css/tiptap.css'


const { debounceSave, debounceTime, modelValue, isEditable = true } = defineProps<{
  modelValue: string;
  debounceSave: boolean;
  debounceTime?: number;
  isEditable?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "save", content: string): void;
  (e: "onSetEditorInstance", editor: Editor): void
}>();

const saveTimeout = ref<NodeJS.Timeout>();
const editor = ref<Editor>();

watch(editor, () => {
  if (editor) {
    emit('onSetEditorInstance', editor.value)
  }
}, {immediate: false})

onMounted(() => {
  editor.value = new Editor({
    editable: isEditable,
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        blockquote: true,
        bold: true,
        bulletList: true,
        code: true,
        codeBlock: true,
        document: true,
        dropcursor: true,
        gapcursor: true,
        hardBreak: true,
        heading: false,
        history: true,
        horizontalRule: true,
        italic: true,
        listItem: true,
        orderedList: true,
        paragraph: true,
        strike: true,
        text: true,
      }),
      Underline,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6]
      }),
      FontFamily.configure({
        types: [
          'textStyle'
        ]
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full rounded-md',
        },
      })
    ],
    content: modelValue,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose min-w-full focus:outline-none',
      },
      parseOptions: {
        preserveWhitespace: 'full',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      emit("update:modelValue", html);

      if (debounceSave) save(html);
    },
  });
});

watch(
  () => modelValue,
  (newValue) => {
    if (editor && newValue != editor.value?.getHTML()) {
      editor.value?.commands.setContent(newValue, false);
    }
  },
);

function save(content: string) {
  emit("save", content);
}

onBeforeUnmount(() => {
  editor.value?.destroy();
  if (saveTimeout) clearTimeout(saveTimeout.value);
});
</script>

<template>
  <div v-if="editor" class="h-full flex flex-col tiptap-editor-container">
    <div class="control-group" v-if="isEditable">
      <div class="button-group">
        <EditorToolbar :editor="editor" />
      </div>
    </div>
    <editor-content :editor="editor" class="flex-1 editor-content" ref="editorContentRef" />
  </div>
</template>

<style>

.tiptap-editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tiptap-editor-container :deep(.ProseMirror) {
  font-family: inherit !important;
  line-height: 1.5 !important;
  color: inherit !important;

  padding: 1rem !important;

  & p {
    margin-bottom: 0.5rem !important;
  }

  & h1, & h2, & h3, & h4, & h5, & h6 {
    font-weight: bold !important;
    margin-top: 1rem !important;
    margin-bottom: 0.5rem !important;
  }

  & h1 {
    font-size: 2rem !important;
  }

  & h2 {
    font-size: 1.5rem !important;
  }

  & h3 {
    font-size: 1.25rem !important;
  }

  & ul, & ol {
    padding-left: 1.5rem !important;
    margin-bottom: 0.5rem !important;
  }

  & ul {
    list-style-type: disc !important;
  }

  & ol {
    list-style-type: decimal !important;
  }

  & strong {
    font-weight: bold !important;
  }

  & em {
    font-style: italic !important;
  }

  & u {
    text-decoration: underline !important;
  }
}

.tiptap-editor-container .editor-content {
  flex: 1;
  height: 100% !important;
  overflow-y: auto !important;
}

.control-group {
  background-color: white;
  z-index: 10;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.dark .control-group {
  background-color: var(--bg-dark-200, #1e1e1e);
}

</style>
