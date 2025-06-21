import { generateText} from "ai";
import { createTogetherAI } from "@ai-sdk/togetherai";

/**
 * Together AI client instance configuration 
 * 
 * @remarks
 * Requires TOGETHER_API_KEY environment variable to be set. Falls back to empty string if not provided.
 */
const togetherAI = createTogetherAI({
    apiKey: process.env.TOGETHER_API_KEY ?? ''
})

/**
 * checks for bad content in file
 * @param fileContent file content to process
 * @returns promise<boolean> - True if content is deemed unsafe
 */
export const isFileContentBad = async(fileContent: string): Promise<boolean> => {
     try {
        const generateResult = await generateText({
            model: togetherAI('meta-llama/Llama-Guard-4-12B'),
            prompt: `Analyze the following content for harmful, malicious, or spam content. Respond with either "SAFE" or "UNSAFE":
            
            ${fileContent}`
        });

        const response = generateResult.text.toLowerCase().trim();
        return response.includes('unsafe') || response.startsWith('unsafe');

    } catch (error) {
        console.error('Content analysis failed:', error);
        throw new Error('Failed to analyze content safety');
    }
}
