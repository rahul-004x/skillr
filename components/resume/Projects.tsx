import { ResumeDataSchemaType } from "@/lib/resume";

export const Projects = ({
  projects,
}: {
  projects: ResumeDataSchemaType["projects"];
}) => {
  return (
    <section className="flex min-h-0 flex-col gap-y-1 print:gap-y-1">
      <h2 className="text-xl font-bold mb-1" id="projects-section">
        Projects
      </h2>
      <div
        className="flex flex-col gap-4"
        role="feed"
        aria-labelledby="projects-section"
      >
        {projects?.map((item) => {
          return (
            <div
              key={item.name}
              className="font-mono flex flex-col justify-start items-start gap-1 print:mb-4"
            >
              <div className="flex flex-col justify-start items-start self-stretch gap-1">
                <p className="text-base font-semibold text-left text-[#050914]">
                  {item.name}
                </p>
                <p className="text-sm font-medium text-left text-[#54575e] font-mono flex flex-wrap gap-1">
                  <strong className="font-mono tracking-tight">
                    Tech stack:{" "}
                  </strong>
                  {item.tools}
                </p>
              </div>
              <div className="flex flex-col justify-start items-start gap-1.5 self-stretch text-sm font-medium text-left text-[#6c737f]">
                <p>{item.functionality}</p>
                <p>{item.achievement}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
