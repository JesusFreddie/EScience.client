import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

const MergeHighlight = Extension.create({
  name: 'mergeHighlight',

  addProseMirrorPlugins() {
    const { editor } = this

    return [
      new Plugin({
        state: {
          init: (_, { doc }) => this.buildDecorations(doc),
          apply: (tr, old) => tr.docChanged ? this.buildDecorations(tr.doc) : old
        },
        props: {
          decorations(state) {
            return this.getState(state)
          }
        }
      })
    ]
  },

  buildDecorations(doc) {
    const decorations = []
    
    doc.descendants((node, pos) => {
      if (node.marks) {
        node.marks.forEach(mark => {
          if (mark.type.name === 'merge-conflict') {
            const decoration = Decoration.node(
              pos,
              pos + node.nodeSize,
              {
                class: `merge-merge-${mark.attrs.type}`,
                'data-conflict-type': mark.attrs.type,
                'data-conflict-id': mark.attrs.id
              }
            )
            decorations.push(decoration)
          }
        })
      }
    })

    return DecorationSet.create(doc, decorations)
  }
})

// Создаем кастомную Mark для конфликтов
const MergeConflictMark = Mark.create({
  name: 'mergeConflict',
  addAttributes() {
    return {
      type: {
        default: 'added',
        parseHTML: el => el.getAttribute('data-conflict-type'),
        renderHTML: attrs => ({ 'data-conflict-type': attrs.type })
      },
      conflictId: {
        default: null,
        parseHTML: el => el.getAttribute('data-conflict-id'),
        renderHTML: attrs => ({ 'data-conflict-id': attrs.conflictId })
      }
    }
  },
  parseHTML() {
    return [{ tag: 'span[data-conflict-type]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0]
  }
})

// В инициализации редактора:
new Editor({
  extensions: [
    MergeConflictMark,
    MergeHighlight,
    // другие расширения...
  ]
})