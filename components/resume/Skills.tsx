import { Badge } from "@/components/ui/badge";

type Skills = readonly string[];

interface SkillsProps {
  skills: Skills;
}

export const Skills = ({ skills }: SkillsProps) => {
  return (
    <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
      <h2 className="text-xl font-bold" id="skills-section">
        Skills
      </h2>
      <ul className="flex flex-wrap list-none gap-1 p-0">
        {skills.map((skill) => (
          <li key={skill}>
            <Badge className="print:text-[15px] pointer-events-none">
              {skill}
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};
