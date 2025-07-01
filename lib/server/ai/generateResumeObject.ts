import { generateObject } from 'ai'
import { createTogetherAI } from '@ai-sdk/togetherai'
import { ResumeDataSchema } from '@/lib/resume'
import dedent from 'dedent'

// Create together ai client with helicon ai {ai observability and monitoring tool}
const togetherAI = createTogetherAI({
    apiKey: process.env.TOGETHER_API_KEY ?? '',
    // baseURL: 'https://together.helicon.ai/v1',
    // headers: {
    //     'Helicon-Auth': `Bearer ${process.env.HELICON_API_KEY}` 
    // }
})

/**
 * function to generate resume object
 * @param resumeText takes resume text to generate object
 * @returns returns resume text
 */
export const generateResumeObject = async(resumeText: string) => {
    const startTime = Date.now()
    try {
        const { object } = await generateObject({
            model: togetherAI('meta-llama/Llama-3.3-70B-Instruct-Turbo-Free'),
            maxRetries: 1,
            schema: ResumeDataSchema,
            mode: 'json',
            prompt: 
                dedent(`
                    You are an expert resume parser. Parse the following resume text and extract structured information.
                    
                    Instructions:
                    - Extract all personal information, contact details, education, work experience, skills, and other relevant sections
                    - Maintain accurate dates and formatting
                    - If information is missing or unclear, use null or empty values
                    - Ensure all extracted data matches the provided schema structure
                    - Preserve the original content meaning and context
                    
                    Resume Text:
                    ${resumeText}
                    
                    Return a structured JSON object with all the extracted resume information.
                `)
        })

        const endTime = Date.now()
        console.log(`Generating resume object takes ${(endTime - startTime) / 1000} seconds`)
        return object

    } catch(error) {
        console.error('Error generating resume object', error)
        return undefined
    }
}