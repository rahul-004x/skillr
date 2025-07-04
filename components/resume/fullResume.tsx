import { ResumeData } from "@/lib/server/redisActions";
import LoadingFallback from "../LoadingFallback";
import { Header } from "./header";

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
    <section>
      <Header header={resume?.header} picture={profilePicture} />
    </section>
  );
};
