import { ResumeData } from "@/lib/server/redisActions";
import LoadingFallback from "../LoadingFallback";
import { Header } from "./header";
import { Summery } from "./Summery";

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
      <div>
        <Summery summary={resume?.summary} />
      </div>
    </section>
  );
};
