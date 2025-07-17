import { FullResume } from "@/components/resume/fullResume";
import { getUserData } from "./utils";
import { redirect } from "next/navigation";
import { WorkExperience } from "@/components/resume/WorkExperience";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const { user_id, resume, clerkUser } = await getUserData(username);

  const profilePicture = clerkUser?.imageUrl;

  if (!user_id) redirect(`/?usernameNotFound=${username}`);
  if (!resume?.resumeData || resume.status !== "live")
    redirect(`/?idNotFound=${user_id}`);

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resume.resumeData.header.name,
    image: profilePicture,
    jobTitle: resume.resumeData.header.shortAbout,
    description: resume.resumeData.summary,
    WorkExperience: resume.resumeData.workExperience,
    email:
      resume.resumeData.header.contacts.email &&
      `mailto: ${resume.resumeData.header.contacts.email}`,
    skills: resume.resumeData.header.skills,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      <div>
        {resume?.resumeData && (
          <FullResume
            resume={resume.resumeData}
            profilePicture={profilePicture}
          />
        )}
      </div>
    </>
  );
};

export default ProfilePage;
