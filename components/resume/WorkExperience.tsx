import { ResumeDataSchemaType } from "@/lib/resume";
import { useMemo } from "react";
import { getShortMonth, getYear } from "./resumeUtils";

export const WorkExperience = (props: {
  work?: ResumeDataSchemaType["workExperience"];
}) => {
  const { work = [] } = props;

  const validWork = useMemo(() => {
    // Make sure work is an array
    const workArray = Array.isArray(work) ? work : [];

    return workArray
      .filter(
        (item) =>
          item.company && item.location && item.title && item.description,
      )
      .map((item) => ({
        ...item,
        formattedDate: `${getShortMonth(item.start)} ${getYear(item.start)} - ${
          !!item.end
            ? `${getShortMonth(item.end)} ${getYear(item.end)}`
            : "present"
        }`,
        companyLower: item.company.toLowerCase(),
      }));
  }, [work]);
  if (validWork.length === 0) {
    return null;
  }

  return (
    <section className="flex min-h-0 flex-col gap-y-3 print:gap-y-1">
      <h2 className="text-lg font-bold" id="work-experience">
        Work Experience
      </h2>
      <div
        className="flex flex-col gap-4"
        role="feed"
        aria-labelledby="work-experience"
      >
        {validWork.map((item) => {
          return (
            <div
              key={item.company + item.location + item.title}
              className="font-mono flex flex-col justify-start items-start gap-1 print:mb-4"
            >
              <div className="flex flex-wrap justify-between items-start self-stretch gap-2">
                <div className="flex flex-wrap justify-start items-center gap-2">
                  <p className="text-base font-semibold text-left text-[#050914]">
                    {item.title}
                  </p>
                  <div className="flex justify-center items-center relative overflow-hidden gap-2.5 px-[7px] py-0.5 rounded bg-[#eeeff0]">
                    <p className="text-[12px] font-semibold text-center text-[#54575e]">
                      {item.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-right text-[#54575e] whitespace-nowrap flex-shrink-0">
                  {item.formattedDate}
                </p>
              </div>
              <div className="flex flex-col justify-start items-start relative gap-1.5">
                <p className="self-stretch text-sm font-medium text-left text-[#54575e] font-mono capitalize flex flex-wrap gap-1">
                  <span>{item.companyLower}</span>
                  {item.company && item.contract && <span>·</span>}
                  <span>{item.contract}</span>
                </p>
                <p className="self-stretch text-sm font-medium text-left text-[#6c737f]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
