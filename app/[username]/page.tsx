import { FullResume } from "@/components/resume/fullResume";
import { getUserData } from "./utils";
import { redirect } from "next/navigation";
import Link from "next/link";

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
    hasOccupation: {
      "@type": "Occupation",
      name: resume.resumeData.header.shortAbout,
      description: resume.resumeData.summary,
    },
    hasCredential: resume.resumeData.workExperience.map((work) => ({
      "@type": "organizationRole",
      name: work.title,
      startDate: work.start,
      endDate: work.end,
      memberOf: {
        "@type": "Organization",
        name: work.company,
        location: work.location,
      },
      description: work.description,
    })),
    email:
      resume.resumeData.header.contacts.email &&
      `mailto: ${resume.resumeData.header.contacts.email}`,
    knowsAbout: resume.resumeData.header.skills,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
      {resume?.resumeData && (
        <FullResume
          resume={resume.resumeData}
          profilePicture={profilePicture}
        />
      )}
      <div className="mt-8 mb-4 text-center">
        <Link
          href={`/ref?${username}`}
          className="font-mono text-sm text-gray-700"
        >
          Made by{" "}
          <span className="text-black/95 underline underline-offset-2">
            Skillr
          </span>
        </Link>
      </div>
    </>
  );
};

export default ProfilePage;
