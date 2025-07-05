import { ResumeDataSchemaType } from "@/lib/resume";

interface AboutProps {
  summary: ResumeDataSchemaType["summary"];
}
export const Summery = ({ summary }: AboutProps) => {
  return (
    <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
      <h2 className="text-xl font-bold" id="about-section">
        About
      </h2>
      <div
        className="text-pretty text-sm font-mono text-[#6B7280] print:text-[12px]"
        aria-labelledby="about-section"
      >
        {summary}
      </div>
    </section>
  );
};
