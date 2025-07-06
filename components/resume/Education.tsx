import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ResumeDataSchemaType } from "@/lib/resume";
import { useMemo } from "react";
import { getYear } from "./resumeUtils";

/*
 * Individual educations card component
 */

const EducationItem = (education: ResumeDataSchemaType["education"][0]) => {
  const { school, start, end, degree } = education;
  if (!school || !degree || !start) return null;
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base">
          <h3
            className="font-semibold leading-none"
            id={`education-${school.toLocaleUpperCase().replace(/\s+/g, "-")}`}
          >
            {school}
          </h3>
          <div
            className="text-sm tabular-nums text-gray-500"
            aria-label={`Period: ${getYear(start)} to ${end ? `${getYear(end)}` : "Present"}`}
          >
            {getYear(start)} - {end ? `${getYear(end)}` : "Present"}
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-2 text-[#6B7280] print:text-[12px]">
        {degree}
      </CardContent>
    </Card>
  );
};

const Education = ({
  education,
}: {
  education: ResumeDataSchemaType["education"];
}) => {
  const validEducation = useMemo(() => {
    const educationArray = Array.isArray(education) ? education : [];
    return educationArray.filter(
      (edu) => edu.school && edu.degree && edu.start,
    );
  }, [education]);

  return (
    <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
      <h2 className="text-xl font-bold">Education</h2>
      <div
        className="space-y-4"
        role="feed"
        aria-labelledby="education-section"
      >
        {validEducation.map((item, idx) => (
          <article key={idx} role="article">
            <EducationItem {...item} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Education;
