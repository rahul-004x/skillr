
import { pdfToText } from 'pdf-ts'

const scrapPdfContent = async(pdfUrl: string): Promise<string> => {
    const pdfFetch = await fetch(pdfUrl)
    const pdf = await pdfFetch.arrayBuffer()
    const text = await pdfToText(new Uint8Array(pdf))
    return text
}

export default scrapPdfContent;
