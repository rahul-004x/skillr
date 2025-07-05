import { ResumeData } from "@/lib/server/redisActions";
import LoadingFallback from "../LoadingFallback";
import { Header } from "./header";
import { Summery } from "./Summery";
import { WorkExperience } from "./WorkExperience";

export const FullResume = ({
  resume,
  profilePicture,
}: {
  resume: ResumeData | null;
  profilePicture?: string;
}) => {
  if (!resume) {
    return <LoadingFallback message="lodading resume ...." />;
  }
  return (
    <section
      className="mx-auto w-full max-w-2xl space-y-8 my-8 bg-white print:space-y-4 px-4"
      aria-label="Resume content"
    >
      <Header header={resume?.header} picture={profilePicture} />
      <div className="flex flex-col gap-y-6">
        <Summery summary={resume?.summary} />
        {/* {resume.workExperience.length !== 0 && ( */}
        <WorkExperience work={resume.workExperience} />
        {/* )} */}
      </div>
    </section>
  );
};
