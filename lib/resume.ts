import { z } from "zod";

const HeaderContactsSchema = z.object({
  website: z
    .string()
    .describe("Personal website or portfolio URL")
    .optional()
    .nullable(),
  email: z.string().describe("Email address").optional().nullable(),
  phone: z.string().describe("Phone number").optional().nullable(),
  twitter: z.string().describe("Twitter/X username").optional().nullable(),
  linkedin: z.string().describe("LinkedIn username").optional().nullable(),
  github: z.string().describe("GitHub username").optional().nullable(),
});

const HeaderSection = z.object({
  name: z.string(),
  shortAbout: z
    .string()
    .describe("Short description of your profile")
    .default("This is a short description of your profile"),
  location: z
    .string()
    .describe("Location with format 'City, Country'")
    .optional(),
  contacts: HeaderContactsSchema,
  skills: z
    .array(z.string())
    .describe("Skills used within the different jobs the user has had.")
    .default(["Add your skills here"]),
});

const SummarySection = z
  .string()
  .describe("Summary of your profile")
  .default("You should add a summary here");

const WorkExperienceSection = z.array(
  z.object({
    company: z.string().describe("Company name"),
    link: z
      .string()
      .describe("Company website URL")
      .nullable()
      .optional()
      .default(""),
    location: z
      .string()
      .describe(
        "Location with format 'City, Country' or could be Hybrid or Remote",
      ),
    contract: z
      .string()
      .describe("Type of work contract like Full-time, Part-time, Contract"),
    title: z.string().describe("Job title"),
    start: z.string().describe("Start date in format 'YYYY-MM-DD'"),
    end: z
      .string()
      .optional()
      .nullable()
      .describe("End date in format 'YYYY-MM-DD'"),
    description: z.string().describe("Job description"),
  }),
);

const ProjectSection = z
  .array(
    z.object({
      name: z.string().describe("Project name"),
      tools: z.array(z.string()).describe("Tools and technologies used"),
      functionality: z
        .string()
        .describe("Main functionality and purpose of the project"),
      achievement: z
        .string()
        .optional()
        .describe("Notable achievements or outcomes"),
    }),
  )
  .optional();

const EducationSection = z.array(
  z.object({
    school: z.string().describe("School or university name"),
    degree: z.string().describe("Degree or certification obtained"),
    start: z.string().describe("Start year"),
    end: z.string().describe("End year"),
  }),
);

export const ResumeDataSchema = z.object({
  header: HeaderSection,
  summary: SummarySection,
  workExperience: WorkExperienceSection,
  projects: ProjectSection,
  education: EducationSection,
});

export type ResumeDataSchemaType = z.infer<typeof ResumeDataSchema>;
