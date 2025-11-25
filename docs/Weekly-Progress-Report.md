# Weekly Progress Report (10 Weeks)

## Week 1: Project Inception & Literature Review

1. **Project Progress schedule (pert chart):**
   - Start -> Topic Selection -> Literature Survey -> Feasibility Study -> End of Week 1
2. **Literature review technical and economical feasibility:**
   - **Technical:** Studied feasibility of using Next.js 15 and Vercel AI SDK for resume parsing. Evaluated `pdf-ts` vs `pdf-parse` for text extraction.
   - **Economical:** Assessed free tiers of Vercel, Upstash (Redis), and Clerk. Project deemed economically feasible with zero initial cost.
3. **Material required:**
   - Laptop/Workstation
   - Internet Connection
   - Access to digital libraries (IEEE Xplore, Google Scholar)
4. **Design of project:**
   - Conceptualization of "Skillr" - Resume to Portfolio converter.
5. **Experimental work:**
   - N/A (Focus on research)
6. **Result and analysis:**
   - Selected Tech Stack: Next.js, Tailwind CSS, Clerk, Upstash Redis, AWS S3.
7. **Rough draft of final report:**
   - Initiated: Title and Abstract drafted.
8. **Plagiarism check (give %):**
   - 0% (Initial phase)
9. **Final report writing:**
   - Not started.
10. **Research paper:**
    - Topic identification: "Automated Portfolio Generation using LLMs".
11. **Target set for week:**
    - Select project topic.
    - Conduct literature review on existing resume parsers.
    - Determine technology stack.
12. **Work done in this week:**
    - Finalized project topic "Skillr".
    - Reviewed 5+ papers/articles on resume parsing.
    - Selected Next.js App Router and Vercel AI SDK as core technologies.

---

## Week 2: Requirement Analysis & System Design

1. **Project Progress schedule (pert chart):**
   - Requirement Gathering -> Use Case Definition -> System Architecture Design -> Database Design -> End of Week 2
2. **Literature review technical and economical feasibility:**
   - Analyzed cost implications of using OpenAI API vs OpenRouter. Decided on OpenRouter for flexibility and cost-effectiveness.
3. **Material required:**
   - VS Code (IDE)
   - Node.js installed
   - Diagramming tools (Excalidraw/Lucidchart)
4. **Design of project:**
   - **System Architecture:** Defined Client-Server architecture with Next.js.
   - **Database:** Designed Redis schema for user sessions and resume data (`resume:{userId}`).
   - **Schema:** Created Zod schema for `ResumeData` (Header, Experience, Education, etc.).
5. **Experimental work:**
   - Prototyped a simple Zod schema to validate JSON output from AI.
6. **Result and analysis:**
   - Confirmed that Zod can effectively validate LLM structured output.
7. **Rough draft of final report:**
   - Added "Introduction" and "Problem Statement" sections.
8. **Plagiarism check (give %):**
   - < 2%
9. **Final report writing:**
   - Outline created.
10. **Research paper:**
    - Literature survey section drafted.
11. **Target set for week:**
    - Define functional and non-functional requirements.
    - Design system architecture and database schema.
12. **Work done in this week:**
    - Documented requirements (PDF upload, Auth, Portfolio generation).
    - Designed Redis key-value structure.
    - Created initial `ResumeDataSchema` in TypeScript.

---

## Week 3: Environment Setup & UI/UX Design

1. **Project Progress schedule (pert chart):**
   - Env Setup -> UI Wireframing -> Component Design -> Project Initialization -> End of Week 3
2. **Literature review technical and economical feasibility:**
   - Reviewed Tailwind CSS v4 features for modern styling.
3. **Material required:**
   - Figma (for UI design)
   - Git/GitHub
4. **Design of project:**
   - Designed Landing Page, Dashboard, and Portfolio Layouts in Figma.
   - Created a "Design System" using Tailwind CSS variables (colors, typography).
5. **Experimental work:**
   - Initialized Next.js project (`pnpm create next-app`).
   - Configured Tailwind CSS and Shadcn/UI components.
6. **Result and analysis:**
   - Project structure set up successfully.
   - Basic UI components (Buttons, Inputs) rendered correctly.
7. **Rough draft of final report:**
   - Added "Proposed Solution" and "Technology Used" sections.
8. **Plagiarism check (give %):**
   - < 3%
9. **Final report writing:**
   - Ongoing.
10. **Research paper:**
    - Methodology section outline.
11. **Target set for week:**
    - Set up development environment.
    - Design UI/UX mockups.
    - Initialize Git repository.
12. **Work done in this week:**
    - Created Next.js app with TypeScript.
    - Installed dependencies (`lucide-react`, `clsx`, `tailwind-merge`).
    - Designed high-fidelity mockups for the application.

---

## Week 4: Authentication & File Storage Implementation

1. **Project Progress schedule (pert chart):**
   - Auth Integration -> S3 Setup -> Upload API -> Drag-n-Drop UI -> End of Week 4
2. **Literature review technical and economical feasibility:**
   - N/A
3. **Material required:**
   - Clerk API Keys
   - AWS Console Access
4. **Design of project:**
   - Designed the authentication flow using Clerk Middleware.
   - Designed the S3 upload flow using presigned URLs.
5. **Experimental work:**
   - Integrated Clerk (`@clerk/nextjs`) for sign-up/sign-in.
   - Configured AWS S3 bucket and CORS policies.
   - Implemented `next-s3-upload` for secure file uploads.
6. **Result and analysis:**
   - Users can sign up and log in.
   - PDF files are successfully uploaded to S3 bucket.
7. **Rough draft of final report:**
   - Documented "System Modules" (Auth & Storage).
8. **Plagiarism check (give %):**
   - < 4%
9. **Final report writing:**
   - Ongoing.
10. **Research paper:**
    - Drafted "System Architecture" section.
11. **Target set for week:**
    - Implement User Authentication.
    - Implement File Upload to S3.
12. **Work done in this week:**
    - Secured routes with Clerk middleware.
    - Created private routes for dashboard.
    - Successfully tested PDF upload to S3.

---

## Week 5: Resume Parsing Logic (Backend)

1. **Project Progress schedule (pert chart):**
   - PDF Text Extraction -> AI Prompt Engineering -> API Route Creation -> Parsing Logic -> End of Week 5
2. **Literature review technical and economical feasibility:**
   - Evaluated different LLM models (GPT-3.5, Llama 3) for cost/performance balance.
3. **Material required:**
   - OpenRouter API Key
4. **Design of project:**
   - Designed the `generateResumeObject` function.
   - Crafted system prompts for the AI to ensure strict JSON output.
5. **Experimental work:**
   - Implemented `lib/server/scrapPdfContent.ts` using `pdf-ts`.
   - Implemented `lib/server/ai/generateResumeObject.ts` using Vercel AI SDK.
   - Connected text extraction with AI generation.
6. **Result and analysis:**
   - Successfully extracted text from sample PDFs.
   - AI successfully converted text into structured JSON matching the Zod schema.
7. **Rough draft of final report:**
   - Updated "Methodology" section with parsing logic.
8. **Plagiarism check (give %):**
   - < 5%
9. **Final report writing:**
   - Ongoing.
10. **Research paper:**
    - detailed "Resume Parsing Algorithm" section.
11. **Target set for week:**
    - Extract text from PDF.
    - Generate structured data using AI.
12. **Work done in this week:**
    - Built text extraction utility.
    - Integrated OpenRouter API.
    - Verified JSON output against `ResumeDataSchema`.

---

## Week 6: Database Integration & State Management

1. **Project Progress schedule (pert chart):**
   - Redis Setup -> CRUD Operations -> React Query Setup -> State Sync -> End of Week 6
2. **Literature review technical and economical feasibility:**
   - N/A
3. **Material required:**
   - Upstash Console
4. **Design of project:**
   - Designed API routes (`/api/resume`) for GET/POST operations.
   - Designed optimistic UI updates using React Query.
5. **Experimental work:**
   - Configured `@upstash/redis`.
   - Implemented `storeResume` and `getResume` actions.
   - Integrated `TanStack React Query` in the frontend to fetch resume data.
6. **Result and analysis:**
   - Parsed resume data is correctly saved to Redis.
   - Data persists across page reloads.
7. **Rough draft of final report:**
   - Added "Database" section describing Redis keys.
8. **Plagiarism check (give %):**
   - < 5%
9. **Final report writing:**
   - Ongoing.
10. **Research paper:**
    - N/A
11. **Target set for week:**
    - Persist data to Redis.
    - Connect Frontend with Backend API.
12. **Work done in this week:**
    - Implemented Redis CRUD operations.
    - Created `useUserAction` hook for data fetching.
    - Verified data integrity in Upstash dashboard.

---

## Week 7: Frontend Component Implementation

1. **Project Progress schedule (pert chart):**
   - Component Dev (Header) -> Component Dev (Exp/Edu) -> Component Dev (Skills) -> Integration -> End of Week 7
2. **Literature review technical and economical feasibility:**
   - N/A
3. **Material required:**
   - N/A
4. **Design of project:**
   - Refined component styling for responsiveness.
5. **Experimental work:**
   - Built React components: `Header`, `Summary`, `WorkExperience`, `Projects`, `Education`, `Skills`.
   - Implemented `FullResume` component to aggregate all sections.
   - Added loading states and skeletons.
6. **Result and analysis:**
   - Portfolio page renders beautifully with dummy data and real parsed data.
   - Responsive design works on mobile and desktop.
7. **Rough draft of final report:**
   - Added screenshots of UI components.
8. **Plagiarism check (give %):**
   - < 6%
9. **Final report writing:**
   - Ongoing.
10. **Research paper:**
    - N/A
11. **Target set for week:**
    - Build all UI components for the portfolio.
    - Ensure responsive design.
12. **Work done in this week:**
    - Completed all resume section components.
    - Integrated components with real data from Redis.
    - Polished UI with Tailwind animations.

---

## Week 8: Testing, Validation & Optimization

1. **Project Progress schedule (pert chart):**
   - Unit Testing -> Integration Testing -> E2E Testing -> Bug Fixes -> End of Week 8
2. **Literature review technical and economical feasibility:**
   - N/A
3. **Material required:**
   - Testing Frameworks (Jest/Vitest - optional, manual testing performed)
4. **Design of project:**
   - Designed test cases for "Bad Content" detection.
5. **Experimental work:**
   - Implemented `isContentBad` safety check.
   - Conducted manual end-to-end testing: Upload -> Parse -> Save -> View.
   - Optimized images and assets.
6. **Result and analysis:**
   - Fixed bugs related to null values in JSON.
   - Improved parsing speed by optimizing prompts.
   - Safety check correctly flags inappropriate content.
7. **Rough draft of final report:**
   - Completed "Testing Strategy" and "Result and Analysis" sections.
8. **Plagiarism check (give %):**
   - < 7%
9. **Final report writing:**
   - 80% complete.
10. **Research paper:**
    - Results section drafted.
11. **Target set for week:**
    - Test the entire application flow.
    - Implement safety guardrails.
    - Fix identified bugs.
12. **Work done in this week:**
    - Added content safety checks.
    - Fixed layout shifts and hydration errors.
    - Verified cross-browser compatibility.

---

## Week 9: Documentation & Draft Report Finalization

1. **Project Progress schedule (pert chart):**
   - Report Compilation -> Proofreading -> Plagiarism Check -> Formatting -> End of Week 9
2. **Literature review technical and economical feasibility:**
   - N/A
3. **Material required:**
   - Word Processor / Markdown Editor
   - Plagiarism Checker Tool
4. **Design of project:**
   - Finalized report structure and formatting.
5. **Experimental work:**
   - N/A (Focus on documentation)
6. **Result and analysis:**
   - Final Project Report compiled.
   - Plagiarism check passed with acceptable limits.
7. **Rough draft of final report:**
   - Completed.
8. **Plagiarism check (give %):**
   - 8% (Final check before submission)
9. **Final report writing:**
   - 100% Draft complete.
10. **Research paper:**
    - Final review of research paper.
11. **Target set for week:**
    - Complete the Project Report.
    - Perform final plagiarism check.
12. **Work done in this week:**
    - Assembled all report sections.
    - Added references and citations.
    - Formatted the document according to guidelines.

---

## Week 10: Final Submission & Future Scope

1. **Project Progress schedule (pert chart):**
   - Final Polish -> Deployment -> Presentation Prep -> Submission -> End of Week 10
2. **Literature review technical and economical feasibility:**
   - N/A
3. **Material required:**
   - Deployment Platform (Vercel)
4. **Design of project:**
   - Prepared presentation slides.
5. **Experimental work:**
   - Deployed final version to Vercel production environment.
   - Verified live URL access.
6. **Result and analysis:**
   - Project is live and functional.
   - All objectives met.
7. **Rough draft of final report:**
   - Finalized.
8. **Plagiarism check (give %):**
   - 8%
9. **Final report writing:**
   - Submitted.
10. **Research paper:**
    - Ready for submission.
11. **Target set for week:**
    - Deploy application.
    - Submit final report and research paper.
12. **Work done in this week:**
    - Deployed to Vercel.
    - Submitted Project Report.
    - Submitted Research Paper.
    - Prepared for project viva/presentation.
