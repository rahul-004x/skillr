import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

/**
 * Openrouter AI client instance configuration
 *
 * @remarks
 * Requires OPENROUTER_API_KEY environment variable to be set. Falls back to empty string if not provided.
 */

const openRouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

/**
 * checks for bad content in file
 * @param fileContent file content to process
 * @returns promise<boolean> - True if content is deemed unsafe
 */
export const isFileContentBad = async (
  fileContent: string,
): Promise<boolean> => {
  try {
    const generateResult = await generateText({
      model: openRouter("openai/gpt-oss-20b:free"),
      prompt: `Analyze the following content for harmful, malicious, or spam content. Respond with either "SAFE" or "UNSAFE":
            
            ${fileContent}`,
    });

    const response = generateResult.text.toLowerCase().trim();
    return response.includes("unsafe") || response.startsWith("unsafe");
  } catch (error) {
    console.error("Content analysis failed:", error);
    throw new Error("Failed to analyze content safety");
  }
};
