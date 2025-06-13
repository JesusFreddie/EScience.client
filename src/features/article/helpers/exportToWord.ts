import { Editor } from '@tiptap/core'
import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun, AlignmentType, Table, TableRow, TableCell, BorderStyle } from 'docx'

type ImageType = 'png' | 'jpg' | 'gif' | 'bmp' | 'svg'

// Helper function to convert base64 to Uint8Array
const base64ToUint8Array = (base64: string): Uint8Array => {
  const base64Data = base64.split(',')[1]
  const binaryString = atob(base64Data)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}

// Helper function to get image type from base64 string
const getImageTypeFromBase64 = (base64: string): ImageType => {
  const match = base64.match(/^data:image\/(\w+);base64/)
  if (!match) return 'png'
  
  const type = match[1].toLowerCase()
  return type === 'jpeg' ? 'jpg' : type as ImageType
}

// Helper function to get image type from URL
const getImageTypeFromUrl = (url: string): ImageType => {
  const extension = url.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'jpg'
    case 'png':
      return 'png'
    case 'gif':
      return 'gif'
    case 'bmp':
      return 'bmp'
    case 'svg':
      return 'svg'
    default:
      return 'png'
  }
}

// Helper function to process image element
const processImageElement = async (element: HTMLElement, alignment: typeof AlignmentType[keyof typeof AlignmentType]): Promise<Paragraph> => {
  const img = element as HTMLImageElement
  const src = img.src

  // Handle base64 images
  if (src.startsWith('data:image')) {
    const imageType = getImageTypeFromBase64(src)
    const imageData = base64ToUint8Array(src)
    
    if (imageType === 'svg') {
      return new Paragraph({
        children: [
          new ImageRun({
            data: imageData,
            type: 'svg',
            transformation: {
              width: 400,
              height: 300
            },
            fallback: 'PNG'
          } as any)
        ],
        spacing: { after: 200 },
        alignment
      })
    }

    return new Paragraph({
      children: [
        new ImageRun({
          data: imageData,
          type: imageType as 'png' | 'jpg' | 'gif' | 'bmp',
          transformation: {
            width: 400,
            height: 300
          }
        })
      ],
      spacing: { after: 200 },
      alignment
    })
  }

  // Handle URL images
  const imageType = getImageTypeFromUrl(src)
  
  if (imageType === 'svg') {
    return new Paragraph({
      children: [
        new ImageRun({
          data: src,
          type: 'svg',
          transformation: {
            width: 400,
            height: 300
          },
          fallback: 'PNG'
        } as any)
      ],
      spacing: { after: 200 },
      alignment
    })
  }

  // For URL images, we need to fetch the image data first
  try {
    const response = await fetch(src)
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const imageData = new Uint8Array(arrayBuffer)

    return new Paragraph({
      children: [
        new ImageRun({
          data: imageData,
          type: imageType as 'png' | 'jpg' | 'gif' | 'bmp',
          transformation: {
            width: 400,
            height: 300
          }
        })
      ],
      spacing: { after: 200 },
      alignment
    })
  } catch (error) {
    console.error('Error loading image:', error)
    return new Paragraph({
      children: [new TextRun('Error loading image')],
      spacing: { after: 200 },
      alignment
    })
  }
}

// Helper function to get alignment from style
const getAlignmentFromStyle = (style: CSSStyleDeclaration): typeof AlignmentType[keyof typeof AlignmentType] => {
  const textAlign = style.textAlign || 'left'
  switch (textAlign) {
    case 'center':
      return AlignmentType.CENTER
    case 'right':
      return AlignmentType.END
    case 'justify':
      return AlignmentType.BOTH
    default:
      return AlignmentType.START
  }
}

// Helper function to process text formatting
const processTextFormatting = (element: HTMLElement): any => {
  const text = element.textContent || ''
  const options: any = {}

  // Handle bold
  if (element.tagName === 'STRONG' || element.tagName === 'B') {
    options.bold = true
  }

  // Handle italic
  if (element.tagName === 'EM' || element.tagName === 'I') {
    options.italics = true
  }

  // Handle underline
  if (element.tagName === 'U') {
    options.underline = {}
  }

  // Handle links
  if (element.tagName === 'A') {
    options.color = '0000FF'
    options.underline = {}
  }

  return {
    text,
    ...options
  }
}

export const exportToWord = async (editor: Editor, fileName: string = 'document') => {
  // Get the HTML content from Tiptap editor
  const content = editor.getHTML()
  
  // Create a temporary div to parse HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = content

  // Process content and create document sections
  const children = await Promise.all(Array.from(tempDiv.childNodes).map(async node => {
    if (node.nodeType === Node.TEXT_NODE) {
      return new Paragraph({
        children: [new TextRun(node.textContent || '')]
      })
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement
      const alignment = getAlignmentFromStyle(element.style)

      // Handle lists
      if (element.tagName === 'OL' || element.tagName === 'UL') {
        const listItems = Array.from(element.children).map((item, index) => {
          const listItemContent = item.querySelector('p')?.innerHTML || item.textContent || ''
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = listItemContent
          
          const textRuns = Array.from(tempDiv.childNodes).map(child => {
            if (child.nodeType === Node.TEXT_NODE) {
              return new TextRun(child.textContent || '')
            }
            return processTextFormatting(child as HTMLElement)
          })

          return new Paragraph({
            children: [
              new TextRun({
                text: element.tagName === 'OL' ? `${index + 1}. ` : '• ',
                bold: true
              }),
              ...textRuns
            ],
            spacing: { after: 200 },
            alignment
          })
        })
        return listItems
      }

      // Handle paragraphs
      if (element.tagName === 'P') {
        const textRuns = Array.from(element.childNodes).map(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            return new TextRun(child.textContent || '')
          }
          return processTextFormatting(child as HTMLElement)
        })

        return new Paragraph({
          children: textRuns,
          spacing: { after: 200 },
          alignment
        })
      }

      // Handle images
      if (element.tagName === 'IMG') {
        return await processImageElement(element, alignment)
      }

      // Handle headings
      if (element.tagName.match(/^H[1-6]$/)) {
        const level = parseInt(element.tagName[1])
        const fontSize = {
          1: 32,
          2: 28,
          3: 24,
          4: 20,
          5: 18,
          6: 16
        }[level] || 24

        const textRuns = Array.from(element.childNodes).map(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            return new TextRun({
              text: child.textContent || '',
              size: fontSize * 2,
              bold: true
            })
          }
          const format = processTextFormatting(child as HTMLElement)
          return new TextRun({
            text: format.text,
            size: fontSize * 2,
            bold: true,
            ...format
          })
        })

        return new Paragraph({
          children: textRuns,
          heading: `Heading${level}` as 'Heading1' | 'Heading2' | 'Heading3' | 'Heading4' | 'Heading5' | 'Heading6',
          spacing: { after: 200 },
          alignment
        })
      }

      // Handle links
      if (element.tagName === 'A') {
        const href = element.getAttribute('href') || ''
        const textRuns = Array.from(element.childNodes).map(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            return new TextRun({
              text: child.textContent || '',
              color: '0000FF',
              underline: {}
            })
          }
          return processTextFormatting(child as HTMLElement)
        })

        return new Paragraph({
          children: [
            ...textRuns,
            new TextRun({
              text: ` (${href})`,
              color: '808080',
              size: 20
            })
          ],
          spacing: { after: 200 },
          alignment
        })
      }

      // Handle tables
      if (element.tagName === 'TABLE') {
        const rows = Array.from(element.querySelectorAll('tr'))
        const tableRows = rows.map(row => {
          const cells = Array.from(row.querySelectorAll('td, th'))
          const tableCells = cells.map(cell => {
            const isHeader = cell.tagName === 'TH'
            const cellElement = cell as HTMLElement
            const cellAlignment = getAlignmentFromStyle(cellElement.style)

            const textRuns = Array.from(cellElement.childNodes).map(child => {
              if (child.nodeType === Node.TEXT_NODE) {
                return new TextRun(child.textContent || '')
              }
              return processTextFormatting(child as HTMLElement)
            })

            return new TableCell({
              children: [
                new Paragraph({
                  children: textRuns,
                  alignment: cellAlignment
                })
              ],
              width: {
                size: 10000 / cells.length,
                type: 'pct'
              },
              margins: {
                top: 100,
                bottom: 100,
                left: 100,
                right: 100
              },
              shading: isHeader ? {
                fill: 'F2F2F2'
              } : undefined
            })
          })
          return new TableRow({
            children: tableCells,
            height: {
              value: 400,
              rule: 'atLeast'
            }
          })
        })
        return new Table({
          rows: tableRows,
          width: {
            size: 10000,
            type: 'pct'
          },
          margins: {
            top: 100,
            bottom: 100,
            left: 100,
            right: 100
          },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
            left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
            right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
            insideVertical: { style: BorderStyle.SINGLE, size: 1, color: '000000' }
          }
        })
      }

      // Handle code blocks
      if (element.tagName === 'PRE') {
        return new Paragraph({
          children: [new TextRun({
            text: element.textContent || '',
            font: 'Courier New'
          })],
          spacing: { after: 200 },
          alignment
        })
      }

      // Handle blockquotes
      if (element.tagName === 'BLOCKQUOTE') {
        const textRuns = Array.from(element.childNodes).map(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            return new TextRun({
              text: child.textContent || '',
              italics: true
            })
          }
          return processTextFormatting(child as HTMLElement)
        })

        return new Paragraph({
          children: textRuns,
          spacing: { after: 200 },
          alignment
        })
      }

      // Handle other elements
      const textRuns = Array.from(element.childNodes).map(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          return new TextRun(child.textContent || '')
        }
        return processTextFormatting(child as HTMLElement)
      })

      return new Paragraph({
        children: textRuns,
        spacing: { after: 200 },
        alignment
      })
    }

    return new Paragraph({
      children: [new TextRun('')],
      spacing: { after: 200 }
    })
  }))

  // Create document
  const doc = new Document({
    sections: [{
      properties: {},
      children: children.flat()
    }]
  })

  // Generate and save document
  const blob = await Packer.toBlob(doc)
  saveAs(blob, `${fileName}.docx`)
} 