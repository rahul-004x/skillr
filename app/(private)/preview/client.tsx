"use client";

import { useEffect, useState } from "react";
import { ResumeData } from "@/lib/server/redisActions";
import LoadingFallback from "@/components/LoadingFallback";
import PreviewActionbar from "@/components/PreviewActionBar";
import { Button } from "@/components/ui/button";
import { useUserActions } from "@/hooks/useUserAction";
import { getPersonalUrl } from "@/lib/utils";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Eye, Edit, X, Save } from "lucide-react";
import { FullResume } from "@/components/resume/fullResume";
import { useUser } from "@clerk/nextjs";
import { EditResume } from "@/components/resume/editing/EditResume";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PopUpLiveSite from "@/components/PopUpLiveSite";

export default function PreviewClient({ messageTip }: { messageTip?: string }) {
  const [showModalSiteLive, setShowModalSiteLive] = useState(false);
  const [localResumeData, setLocalResumeData] = useState<ResumeData>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);

  const {
    resumeQuery,
    toggleStatusMutation,
    usernameQuery,
    saveResumeDataMutation,
  } = useUserActions();

  const { user } = useUser();

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

  const handleResumeChanges = (newResume: ResumeData) => {
    setLocalResumeData(newResume);
    setHasUnsavedChanges(true);
  };

  const handleDiscardChange = () => {
    setShowDiscardConfirmation(true);
  };

  const handleSaveChanges = async () => {
    if (!localResumeData) {
      toast.error("No data to be saved");
      return;
    }

    try {
      await saveResumeDataMutation.mutateAsync(localResumeData);
      toast.success("Changes saved successfully");
      setHasUnsavedChanges(true);
      setIsEditMode(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to save changes, ${error.message}`);
      } else {
        toast.error("Failed to save changes");
      }
    }
  };

  const confirmDiscardChanges = () => {
    //Reset to original data
    if (resumeQuery.data?.resume?.resumeData) {
      setLocalResumeData(resumeQuery.data?.resume?.resumeData);
    }
    setHasUnsavedChanges(false);
    setIsEditMode(false);
    setShowDiscardConfirmation(false);
    toast.info("Changes discarded");
  };

  const CustomLiveToast = () => (
    <div className="relative flex h-[44px] w-fit min-w-[360px] flex-row items-center justify-between gap-2 rounded-md border border-[#009505] bg-[#eaffea] px-2 shadow-md">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
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
      <p className="mr-2 text-left text-sm text-[#003c02]">
        <span className="hidden md:block"> Your website has been updated!</span>
        <span className="md:hidden"> Website updated!</span>
      </p>
      <a
        href={getPersonalUrl(usernameQuery.data.username)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[26px] items-center justify-center gap-1 overflow-hidden rounded bg-[#009505] px-3 py-1"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative h-2.5 w-2.5 flex-shrink-0 flex-grow-0"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M6.86768 2.39591L1.50684 7.75675L2.2434 8.49331L7.60425 3.13248V7.60425H8.64591V1.35425H2.39591V2.39591H6.86768Z"
            fill="white"
          ></path>
        </svg>
        <p className="flex-shrink-0 flex-grow-0 text-left text-sm font-medium text-white">
          View
        </p>
      </a>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 pb-8">
      {messageTip && (
        <div className="mx-auto w-full max-w-3xl px-4 md:px-0">
          <div className="flex items-start rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-0.5 mr-2 h-5 w-5"
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
      <div className="mx-auto w-full max-w-3xl px-4 md:px-0">
        <PreviewActionbar
          initialUsername={usernameQuery.data.username}
          status={resumeQuery.data?.resume?.status}
          onStatusChange={async (newStatus) => {
            await toggleStatusMutation.mutateAsync(newStatus);
            // const isFirstTime = !localStorage.getItem("publishedSite");

            if (newStatus === "live") {
              setShowModalSiteLive(true);
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
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-0">
        <ToggleGroup
          type="single"
          value={isEditMode ? "edit" : "preview"}
          onValueChange={(value) => setIsEditMode(value === "edit")}
          aria-label="View mode"
        >
          <ToggleGroupItem value="preview" aria-label="Preview mode">
            <Eye className="mr-1 h-4 w-4" />
            <span>Preview</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="edit" aria-label="Edit mode">
            <Edit className="mr-1 h-4 w-4" />
            <span>Edit</span>
          </ToggleGroupItem>
        </ToggleGroup>
        {isEditMode && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={handleDiscardChange}
              disabled={!hasUnsavedChanges || saveResumeDataMutation.isPending}
            >
              <X className="size-4" />
              <span>Discard</span>
            </Button>
            <Button
              disabled={!hasUnsavedChanges || saveResumeDataMutation.isPending}
              onClick={handleSaveChanges}
            >
              {saveResumeDataMutation.isPending ? (
                <span className="size-4 animate-spin">⌛</span>
              ) : (
                <Save className="size-4" />
              )}
              <span>
                {saveResumeDataMutation.isPending ? "Saving..." : "Save"}
              </span>
            </Button>
          </div>
        )}
      </div>
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between border-[0.5px] px-4 py-1 md:rounded-lg">
        {isEditMode ? (
          <EditResume
            resume={localResumeData}
            onChangeResume={handleResumeChanges}
          />
        ) : (
          <FullResume
            resume={localResumeData}
            profilePicture={user?.imageUrl}
          />
        )}
      </div>
      <AlertDialog
        open={showDiscardConfirmation}
        onOpenChange={setShowDiscardConfirmation}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure to discard your changes? This action cannot be undone.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDiscardChanges}>
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <PopUpLiveSite
        isOpen={showModalSiteLive}
        websiteUrl={getPersonalUrl(usernameQuery.data.username)}
        onClose={() => {
          setShowModalSiteLive(false);
        }}
      />
    </div>
  );
}
