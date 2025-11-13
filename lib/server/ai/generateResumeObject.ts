import { generateObject } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { ResumeDataSchema } from "@/lib/resume";
import dedent from "dedent";

const openRouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
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
      model: openRouter("openai/gpt-oss-20b:free"),
      maxRetries: 1,
      schema: ResumeDataSchema,
      mode: "json",
      prompt: dedent(`
                    You are an expert resume parser. Parse the following resume text and extract structured information.
                    
                    Instructions:
                    - Extract all personal information, contact details, education, work experience, skills, and other relevant sections
                    - Pay special attention to the "Technical Skills", "skills" section and populate the header.skills array with ALL individual skills mentioned
                    - For skills, look for keywords like "Technical Skills", "Skills", "Technologies", "Proficiencies", etc.
                    - Extract each specific technology and skill (like "HTML", "CSS", "JavaScript", "React", "Node.js", etc.) into the skills array
                    - Maintain accurate dates and formatting
                    - For company links, always provide an empty string ("") instead of null if the link is not available
                    - For project links, always provide an empty string ("") instead of null if the link is not available
                    - For other missing or unclear information, use empty strings or default values instead of null
                    - Ensure all extracted data matches the provided schema structure
                    - Preserve the original content meaning and context
                    - double check the generated parser json is of correct format
                    
                    Resume Text:
                    ${resumeText}
                    
                    Return a structured JSON object with all the extracted resume information.
                `),
    });

    const endTime = Date.now();
    console.log(
      `Generating resume object takes ${(endTime - startTime) / 1000} seconds`,
    );
    console.log(object);
    return object;
  } catch (error) {
    console.error("Error generating resume object", error);

    // Log more details for debugging
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return undefined;
  }
};
