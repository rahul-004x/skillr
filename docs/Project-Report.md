# Skillr: Automated Resume-to-Portfolio Web App — Project Report

## Table of Contents
1. INTRODUCTION
2. DESCRIPTION
3. PROBLEM STATEMENT
4. PROPOSED SOLUTION
5. TECHNOLOGY USED
6. METHODOLOGY
7. RESOURCES REQUIRED
8. DESIGN
9. SYSTEM MODULES
10. DATABASE
11. TESTING STRATEGY
12. FUTURE SCOPE
13. LITERATURE REVIEW
14. CONCLUSION
15. REFERENCES

---

## 1. INTRODUCTION

Skillr is an open‑source web application that converts a user’s resume or LinkedIn PDF into a professional, shareable portfolio website within minutes. The application targets students, job‑seekers, freelancers, and professionals who need an online presence but lack the time or technical skills to hand‑craft a site.

The system leverages modern web technologies (Next.js 15, React 19, TypeScript) and managed cloud services (Clerk for authentication, Upstash Redis for storage and caching, Amazon S3 for file storage) along with AI capabilities (OpenRouter model via the Vercel AI SDK) to parse resume content into a structured schema. Parsed data is rendered with a consistent, responsive UI built on Tailwind CSS and Radix UI primitives.

This report documents the motivation, design, architecture, implementation details, and validation approach of Skillr, while also outlining future enhancements and contextual literature.

Objectives:
- Reduce friction from “resume to portfolio” by automating parsing and rendering
- Ensure privacy and control: user data remains scoped to the authenticated account
- Provide a pleasant UX with fast uploads, instant previews, and clean defaults
- Offer a maintainable, extensible codebase suitable for open‑source contribution

Scope:
- Upload a PDF (resume or LinkedIn export)
- Extract text; analyze safety; parse into a structured Resume schema
- Store file metadata and parsed resume in Redis; store raw file in S3
- Render a public portfolio page and a private editing/preview experience


## 2. DESCRIPTION

At a high level, Skillr is a Next.js app‑router project with public pages for landing and viewing portfolios, and private pages for uploading and previewing content. It includes an API surface for resume storage/retrieval and S3 uploads. The resume is represented by a strongly‑typed Zod schema, enabling consistent rendering across components.

Key features:
- Upload your resume/LinkedIn PDF (drag‑and‑drop)
- Optional pre‑processing: extract PDF text and filter unsafe content
- AI‑powered resume object generation conforming to a Zod schema
- Live preview and easy publishing
- Authentication via Clerk; data isolation per user
- Storage: file in S3, structured data in Upstash Redis

User Experience Flow:
1) Authenticated user opens the Upload screen
2) Drops a PDF; the app stores the file to S3 and extracts text
3) Content is safety‑checked and parsed with an AI model into the ResumeData schema
4) The parsed object is stored; the preview renders instantly using reusable components (Header, Summary, WorkExperience, Projects, Education, Skills)
5) The user can later revisit, update, or publish


## 3. PROBLEM STATEMENT

Professionals need a credible online presence. Traditional options—hand‑coding a site, wrangling a site builder, or paying for hosted templates—demand time, skill, or money. On the other side, simply sharing a PDF resume is static, hard to navigate on mobile, and not engaging.

Challenges addressed by Skillr:
- Manual effort converting a resume into a website
- Inconsistent formatting across devices and browsers
- Keeping content up‑to‑date in multiple places
- Ensuring privacy and access control while enabling easy sharing


## 4. PROPOSED SOLUTION

Skillr proposes an automated pipeline that transforms an uploaded resume PDF into a clean portfolio site:

- A typed ResumeData schema (Zod) acts as the single source of truth
- PDF text extraction (pdf-ts) yields a raw text corpus
- A lightweight safety screen flags potentially unsafe inputs
- AI schema‑guided parsing converts free text into a structured object
- A small set of accessible, themeable React components render the portfolio
- Redis stores structured resume data and user↔username mappings
- S3 stores the original PDF and generated assets
- Next.js provides public and private routes with Clerk middleware to protect sensitive pages

Outcome:
- A production‑ready baseline that’s fast to use, simple to extend, and easy to deploy


## 5. TECHNOLOGY USED

Frontend & Frameworks:
- Next.js 15 (App Router), React 19, TypeScript 5
- Tailwind CSS 4 for styling; Radix UI primitives; Lucide icons
- TanStack React Query for client‑side server state

Backend & Platform:
- Next.js API routes for server endpoints
- Clerk for authentication and session management
- Upstash Redis (REST) for data persistence and fast lookups
- Amazon S3 for file storage (via next-s3-upload)

AI & Parsing:
- Vercel AI SDK (`ai`) with OpenRouter provider
- Model: `openai/gpt-oss-20b:free` for schema‑guided generation
- Zod for JSON schema validation
- `pdf-ts` for PDF text extraction

Dev & Quality:
- ESLint (Next config), Prettier w/ Tailwind plugin
- Type safety via Zod + TypeScript

Notable dependencies (from `package.json`):
- `@clerk/nextjs`, `@upstash/redis`, `ai`, `@openrouter/ai-sdk-provider`, `@aws-sdk/*`, `next-s3-upload`, `pdf-ts`, `zod`, `@tanstack/react-query`


## 6. METHODOLOGY

Development methodology combines incremental feature delivery with typed contracts and automated parsing:

- Contract‑first data modeling with Zod (`lib/resume.ts`) defines the ResumeData structure: header, summary, workExperience, projects, education
- Thin server routes encapsulate mutation and access logic (`app/api/*`)
- React Query orchestrates optimistic UI and background refetching
- Middleware protects private routes (`middleware.ts`) based on a central route map (`lib/routes.ts`)
- Storage separation: binary files to S3; structured resume state to Redis
- Observability via simple console timings during AI generation

High‑level pipeline:
1) Upload PDF → S3 (route `app/api/s3-upload` provided by `next-s3-upload`)
2) Fetch PDF → Extract Text (`lib/server/scrapPdfContent.ts`)
3) Optional guardrail → `isFileContentBad` (OpenRouter + AI SDK)
4) Parse → `generateResumeObject` using `ResumeDataSchema` (Zod)
5) Persist → `storeResume` to Upstash Redis keyed by `resume:{userId}`
6) Render → `components/resume/*` inside private preview and public views


## 7. RESOURCES REQUIRED

Accounts & Managed Services:
- Clerk application with domain‑bound credentials
- Upstash Redis database (REST URL + Token)
- AWS S3 bucket (or compatible storage) and credentials for `next-s3-upload`
- OpenRouter API key for model access

Environment Variables (indicative):
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- `OPENROUTER_API_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- S3 credentials as required by `next-s3-upload`

Local Dev Requirements:
- Node.js 20+, pnpm
- macOS/Linux/Windows; modern browser

Operational Considerations:
- TLS/HTTPS in production
- CORS policies for upload endpoints
- Backup & retention policies for Redis and S3


## 8. DESIGN

### 8.1 Architecture Overview

- Client (Next.js/React) handles file selection, shows progress, and renders previews
- API routes provide restricted endpoints for resume CRUD and upload signing
- Redis persists normalized resume objects and username mappings
- S3 stores uploaded PDFs and potentially derived assets
- AI services (OpenRouter) parse text to schema

Data Flow:
1) User → Upload PDF → S3 (signed upload)
2) Backend → Fetch PDF → Text extraction
3) Safety check → AI classification (SAFE/UNSAFE)
4) Parsing → AI structured output validated by Zod
5) Persistence → Redis; metadata (file name, size, url) saved with status
6) Rendering → Typed components build the portfolio view

### 8.2 Key Components and Files

- `app/page.tsx` — Landing page and CTA
- `app/(private)/upload/client.tsx` — Upload interaction and state management
- `components/resume/*` — Rendering primitives: `Header`, `Summery`, `WorkExperience`, `Projects`, `Education`, `Skills`, plus `FullResume`
- `app/api/resume/route.ts` — GET/POST for resume persistence
- `app/api/s3-upload/route.ts` — S3 upload handler (delegated to `next-s3-upload`)
- `lib/server/ai/generateResumeObject.ts` — AI‑powered parsing to `ResumeDataSchema`
- `lib/server/ai/isContentBad.ts` — Content safety screening
- `lib/server/scrapPdfContent.ts` — PDF → text
- `lib/server/redis.ts` and `lib/server/redisActions.ts` — Redis client and data operations
- `middleware.ts` + `lib/routes.ts` — Route protection and private route definitions

### 8.3 UI/UX Design Principles

- Minimal onboarding, clear calls to action
- Responsive, mobile‑first layout
- Semantic, accessible components (Radix UI patterns)
- Predictable feedback: skeletons/spinners, toasts on errors

### 8.4 Security & Privacy

- Authentication enforced on private routes via Clerk middleware
- User isolation: Redis keys namespaced per user ID
- S3 access via signed requests; no public bucket access needed for uploads
- Basic prompt/response hygiene in AI parsing; safety check prior to parsing
- Logging avoids sensitive payloads (only timings and generic errors)

### 8.5 Performance

- Redis for low‑latency key lookups and state storage
- Client caching and background updates via React Query
- Static assets optimized by Next.js; Tailwind for small CSS footprint
- AI calls constrained (e.g., `maxRetries: 1`)


## 9. SYSTEM MODULES

This section maps the repository’s functional modules to responsibilities:

1) App Router & Pages (`app/`)
   - Public: `page.tsx`, debug pages
   - Private: `(private)/upload`, `(private)/preview`, `(private)/pdf`
   - Dynamic user routes: `app/[username]/*`

2) API Layer (`app/api/*`)
   - `resume/route.ts`: GET/POST resume data for the authenticated user
   - `s3-upload/route.ts`: wired to `next-s3-upload` for signed uploads
   - `check-username`, `username`, `analytics`: additional endpoints (by folder)

3) Components (`components/`)
   - Resume presentation: `components/resume/*`
   - UI primitives: `components/ui/*` (dialog, tooltip, button, dropzone, etc.)
   - Layout: `TopMenu`, `Footer`, `PreviewActionBar`

4) Hooks (`hooks/`)
   - `useUserAction.tsx`: orchestrates resume fetching and upload mutation
   - `use-mobile.tsx`: responsive helpers

5) Server Utilities (`lib/server/*`)
   - Redis client and actions (CRUD, username lookups)
   - AI helpers (`generateResumeObject`, `isContentBad`)
   - PDF text extraction (`scrapPdfContent`)

6) Shared Libraries (`lib/*`)
   - `resume.ts`: Zod schemas and types for structured resume data
   - `routes.ts`: list of private route segments
   - `config.ts`: application constants


## 10. DATABASE

Storage is primarily in Upstash Redis (REST). Redis is used as a durable key‑value store for user state and mappings. S3 is used for binary objects (PDFs).

### 10.1 Redis Keys & Namespacing

`lib/server/redisActions.ts` defines conventions:
- `resume:{userId}` → serialized Resume object
- `user:id:{userId}` → username string
- `user:name:{username}` → userId string

Each Resume object has shape (Zod):
- `status`: "live" | "draft" (default draft)
- `file`: optional file metadata `{ name, url, size, bucket, key }`
- `fileContent`: optional extracted text
- `resumeData`: optional `ResumeData` (parsed structured data)

Consistency measures:
- Bidirectional user↔username entries written atomically via MULTI/EXEC
- Server schema validation guards on GET/POST

### 10.2 S3 Artifacts

- Original uploaded PDF stored under a unique key
- Public or signed URLs managed by `next-s3-upload`

### 10.3 Data Lifecycle

- On upload: file → S3, metadata + draft resume → Redis
- On parse: structured resume persisted under the same user key
- On publish: `status` flips to `live`; public pages can render by username


## 11. TESTING STRATEGY

Testing emphasizes schema validity, API correctness, and end‑to‑end UX.

Unit Tests (suggested):
- Zod schema contracts (`lib/resume.ts`) with valid/invalid payloads
- Redis actions: `getResume`, `storeResume`, `createUsernameLookup`
- AI helpers with mocked providers to ensure correct prompts and error handling

Integration Tests:
- API routes (`/api/resume`, `/api/s3-upload`) using Next test utilities
- Middleware behavior protecting private routes

End‑to‑End (E2E):
- Upload → Parse → Preview → Publish happy path
- Error surfaces: invalid PDF, unsafe content, AI failure, Redis outage

Non‑functional:
- Accessibility checks for key screens
- Performance budgets (TTFB, parse latency logs)

Tooling:
- Jest/Vitest for unit/integration, Playwright/Cypress for E2E


## 12. FUTURE SCOPE

- Theming and templates: multiple portfolio themes, dark mode typography options
- Rich editor: inline edits to generated sections with per‑field autosave
- Multi‑resume support per user; version history and rollback
- Analytics dashboard for profile views and referral sources
- Social cards and SEO metadata automation
- Better parsers: hybrid rules + ML, multilingual support, table extraction
- Rate limiting and abuse prevention (per‑IP, per‑user quotas)
- Export options: static export, PDF generation, shareable bundles
- Custom domains with automatic TLS (e.g., Vercel or Cloudflare)


## 13. LITERATURE REVIEW

This section situates Skillr among related work and foundational references:

- Schema‑guided generation and validation with Zod and AI SDKs
- Production patterns for Next.js 13+ App Router (routing, data fetching)
- Best practices for client‑side server state (TanStack React Query)
- Serverless‑friendly persistence with Upstash Redis
- File upload UX and S3 signed uploads in modern SPAs
- Resume parsing approaches: rule‑based, ML‑based, and LLM‑assisted

Representative references are listed in the References section; together, they motivate the chosen technologies and demonstrate feasibility for scalable, maintainable delivery.


## 14. CONCLUSION

Skillr demonstrates that an end‑to‑end “resume → portfolio” experience can be delivered with a small, focused set of modern tools. Typed schemas ensure data integrity; serverless services reduce ops overhead; and AI parsing closes the gap between unstructured resumes and structured, presentable web content.

The architecture is intentionally modular: swapping AI providers, adding new themes, introducing additional sections, or migrating storage layers are all achievable with local changes. With tests and stronger observability in place, Skillr can grow from a personal utility into a polished product.


## 15. REFERENCES

- Next.js documentation (App Router, v15): https://nextjs.org/docs
- React 19: https://react.dev
- Tailwind CSS v4: https://tailwindcss.com
- Radix UI: https://www.radix-ui.com/primitives
- TanStack React Query: https://tanstack.com/query/latest
- Clerk (Next.js): https://clerk.com/docs/nextjs
- Upstash Redis (REST): https://upstash.com/docs/redis
- Amazon S3 and signed uploads (`next-s3-upload`): https://github.com/ryanto/next-s3-upload
- Vercel AI SDK: https://sdk.vercel.ai
- OpenRouter: https://openrouter.ai
- Zod schema validation: https://zod.dev
- pdf‑ts (PDF to text): https://www.npmjs.com/package/pdf-ts

---

Appendices (optional):
- A. ResumeDataSchema excerpt and example payloads
- B. API contract examples for `/api/resume` and `/api/s3-upload`
- C. Environment variable checklist
