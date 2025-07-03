import { generateObject } from "ai";
import { createTogetherAI } from "@ai-sdk/togetherai";
import { ResumeDataSchema } from "@/lib/resume";
import dedent from "dedent";

// Create together ai client with helicon ai {ai observability and monitoring tool}
const togetherAI = createTogetherAI({
  apiKey: process.env.TOGETHER_API_KEY ?? "",
  // baseURL: 'https://together.helicon.ai/v1',
  // headers: {
  //     'Helicon-Auth': `Bearer ${process.env.HELICON_API_KEY}`
  // }
});

/**
 * function to generate resume object
 * @param resumeText takes resume text to generate object
 * @returns returns resume text
 */
export const generateResumeObject = async (resumeText: string) => {
  const startTime = Date.now();
  try {
    const { object } = await generateObject({
      model: togetherAI("Qwen/Qwen2.5-72B-Instruct-Turbo"),
      maxRetries: 1,
      schema: ResumeDataSchema,
      mode: "json",
      prompt: dedent(`
                    You are an expert resume parser. Parse the following resume text and extract structured information.
                    
                    Instructions:
                    - Extract all personal information, contact details, education, work experience, skills, and other relevant sections
                    - Pay special attention to the "Technical Skills" section and populate the header.skills array with ALL individual skills mentioned
                    - For skills, look for keywords like "Technical Skills", "Skills", "Technologies", "Proficiencies", etc.
                    - Extract each specific technology and skill (like "HTML", "CSS", "JavaScript", "React", "Node.js", etc.) into the skills array
                    - Maintain accurate dates and formatting
                    - For company links, always provide an empty string ("") instead of null if the link is not available
                    - For project links, always provide an empty string ("") instead of null if the link is not available
                    - For other missing or unclear information, use empty strings or default values instead of null
                    - Ensure all extracted data matches the provided schema structure
                    - Preserve the original content meaning and context
                    
                    Resume Text:
                    ${resumeText}
                    
                    Return a structured JSON object with all the extracted resume information.
                `),
    });

    const endTime = Date.now();
    console.log(
      `Generating resume object takes ${(endTime - startTime) / 1000} seconds`,
    );
    console.log(object)
    return object;
  } catch (error) {
    console.error("Error generating resume object", error);
    return undefined;
  }
};