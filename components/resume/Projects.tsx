import { ResumeDataSchemaType } from "@/lib/resume";

export const Projects = ({
  projects,
}: {
  projects: ResumeDataSchemaType["projects"];
}) => {
  return (
    <section className="flex min-h-0 flex-col gay-y-3 print:gap-y-1">
      <h2 className="text-xl font-bold" id="projects-section">
        Projects
      </h2>
      <div>
        {projects?.map((item) => {
          return (
            <div key={item.name}>
              <div>
                <div>
                  <p>{item.name}</p>
                  <p>Tech stack: {item.tools}</p>
                </div>
              </div>
              <div>
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
