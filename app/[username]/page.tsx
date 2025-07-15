import { FullResume } from "@/components/resume/fullResume";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  return (
    <div>
      <FullResume username={username} />
    </div>
  );
};

export default ProfilePage;
