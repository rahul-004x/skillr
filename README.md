# Skillr

A minimal, open-source Next.js application to turn your resume or LinkedIn profile into a professional portfolio website in minutes.

## Features

- Upload your resume or LinkedIn PDF.
- Instantly generate a personal portfolio site.
- Authentication via Clerk.
- Resume data stored in Redis.
- File uploads to S3.

## Getting Started

1. **Install dependencies**  
   ```bash
   pnpm install
   ```

2. **Start the development server**  
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` – Next.js app router pages (public & private pages, API routes)
- `components/` – Reusable React components
- `hooks/` – Custom React hooks
- `lib/` – Utilities, schema, and server logic

## License

MIT
