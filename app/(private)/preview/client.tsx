"use client";

import { useEffect, useState } from "react";
import { ResumeData } from "@/lib/server/redisActions";
import LoadingFallback from "@/components/LoadingFallback";
import PreviewActionbar from "@/components/PreviewActionBar";
import { useUserActions } from "@/hooks/useUserAction";
import { getPersonalUrl } from "@/lib/utils";
import { toast } from "sonner";

export default function PreviewClient({ messageTip }: { messageTip?: string }) {
  const [showModalSiteLive, setModalSiteLive] = useState(false);
  const [localResumeData, setLocalResumeData] = useState<ResumeData>();

  const { resumeQuery, toggleStatusMutation, usernameQuery } = useUserActions();

  useEffect(() => {
    if (resumeQuery.data?.resume?.resumeData) {
      setLocalResumeData(resumeQuery.data?.resume?.resumeData);
    }
  }, [resumeQuery.data?.resume?.resumeData]);

  if (
    resumeQuery.isLoading ||
    usernameQuery.isLoading ||
    !usernameQuery.data ||
    !localResumeData
  ) {
    return <LoadingFallback message="Loading..." />;
  }

  const CustomLiveToast = () => (
    <div className="w-fit min-w-[360px] h-[44px] items-center justify-between relative rounded-md bg-[#eaffea] border border-[#009505] shadow-md flex flex-row gap-2 px-2">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        preserveAspectRatio="none"
      >
        <rect width="24" height="24" rx="4" fill="#EAFFEA"></rect>
        <path
          d="M16.6668 8.5L10.2502 14.9167L7.3335 12"
          stroke="#009505"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <p className="text-sm text-left text-[#003c02] mr-2">
        <span className="hidden md:block"> Your website has been updated!</span>
        <span className="md:hidden"> Website updated!</span>
      </p>
      <a
        href={getPersonalUrl(usernameQuery.data.username)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center overflow-hidden gap-1 px-3 py-1 rounded bg-[#009505] h-[26px]"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0 w-2.5 h-2.5 relative"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M6.86768 2.39591L1.50684 7.75675L2.2434 8.49331L7.60425 3.13248V7.60425H8.64591V1.35425H2.39591V2.39591H6.86768Z"
            fill="white"
          ></path>
        </svg>
        <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-white">
          View
        </p>
      </a>
    </div>
  );

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 pb-8">
      {messageTip && (
        <div className="max-w-3xl mx-auto w-full md:px-0 px-4">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-4 flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p>{messageTip}</p>
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto w-full md:px-0 px-4">
        <PreviewActionbar
          initialUsername={usernameQuery.data.username}
          status={resumeQuery.data?.resume?.status}
          onStatusChange={async (newStatus) => {
            await toggleStatusMutation.mutateAsync(newStatus);
            const isFirstTime = !localStorage.getItem("publishedSite");

            if (isFirstTime && newStatus === "live") {
              setModalSiteLive(true);
              localStorage.setItem("publishedSite", new Date().toDateString());
            } else {
              if (newStatus === "draft") {
                toast.warning("Your website has been unpublished");
              } else {
                toast.custom(() => <CustomLiveToast />);
              }
            }
          }}
          isChangingStatus={toggleStatusMutation.isPending}
        />
      </div>
    </div>
  );
}
