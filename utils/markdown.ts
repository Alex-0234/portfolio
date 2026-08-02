import { Marked } from "marked"

/**
 * Vlastní instance, ať se nastavení nemíchá s globálním `marked`.
 *
 * Raw HTML se z markdownu zahazuje - obsah sice píšu do DB jen já, ale výstup
 * jde do dangerouslySetInnerHTML, takže se nespoléhá na to, že se do posts
 * nikdy nedostane cizí text.
 */
const renderer = new Marked({
    gfm: true,
    breaks: false,
    async: false,
    renderer: {
        html: () => '',
    },
})

export function renderMarkdown(markdown: string): string {
    return renderer.parse(markdown, { async: false })
}
