import * as mammoth from 'mammoth'

export async function importDocx(file: ArrayBuffer | Blob): Promise<string> {
    try {
        const result = await mammoth.extractRawText({
            arrayBuffer: file instanceof Blob ? await file.arrayBuffer() : file
        })
        return convertToTiptap(result.value)
    }
    catch (error) {
        console.error(error)
        return ''
    }
}

function convertToTiptap(rewText: string): string {
    const paragraph = rewText.split('\n\n')

    let htmlContent = ''

    paragraph.forEach((paragraph: string) => {
        if (paragraph.trim() === '')
            return

        if (isLikelyHeading(paragraph)) {
            htmlContent += `<h2>${escapeHtml(paragraph)}</h2>`
        }
        else {
            htmlContent += `<p>${escapeHtml(paragraph)}</p>`
        }
    })

    return htmlContent
}

function isLikelyHeading(text: string): boolean {
  return (
    text.length < 120 && 
    !text.includes('. ') && 
    !text.includes(', ') &&
    !text.match(/^\d+\.\s/) && 
    !text.match(/^[\-\*]\s/) 
  )
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}