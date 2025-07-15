import { FullResume } from "@/components/resume/fullResume";
import { getUserData } from "./utils";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const { user_id, resume, clerkUser } = await getUserData(username);

  const profilePicture = clerkUser?.imageUrl;
  return (
    <div>
      {resume?.resumeData && (
        <FullResume
          resume={resume.resumeData}
          profilePicture={profilePicture}
        />
      )}
    </div>
  );
};

export default ProfilePage;
