import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Resume } from "@/lib/server/redisActions";
import { useS3Upload } from "next-s3-upload";
import { PublishStatuses } from "@/components/PreviewActionBar"
import { ResumeDataSchema } from "@/lib/resume";
import { ResumeData } from "@/lib/server/redisActions";
import { useDebouncedCallback } from "use-debounce";

const fetchResume = async (): Promise<{ resume: Resume | undefined }> => {
  const response = await fetch("/api/resume");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch resume");
  }
  return await response.json();
};

const fetchUsername = async (): Promise<{
  username: string;
}> => {
  const response = await fetch("/api/username");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch username");
  }
  return await response.json();
};

export function useUserActions() {
  const queryClient = useQueryClient();
  const { uploadToS3 } = useS3Upload();

  // Query for resume data
  const resumeQuery = useQuery({
    queryKey: ["resume"],
    queryFn: fetchResume,
  });

  const internalResumeUpdate = async (newResume: Resume) => {
    try {
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newResume),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error || error.message || "Failed to update resume",
        );
      }
    } catch (error) {
      console.error("Error updating resume", error);
      throw error;
    }
  };

  const internalUsernameUpdate = async (newUsername: string) => {
    const response = await fetch("/api/username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: newUsername }),
    });
    if (!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }
    return {
      success: true,
    };
  };

  const usernameQuery = useQuery({
    queryKey: ["username"],
    queryFn: fetchUsername,
  });

  const uploadResumeFile = async (file: File) => {
    try {
      const fileOnS3 = await uploadToS3(file);
      const newResume: Resume = {
        file: {
          name: file.name,
          url: fileOnS3.url,
          size: file.size,
          bucket: fileOnS3.bucket,
          key: fileOnS3.key,
        },
        resumeData: undefined,
        status: "draft",
      };
      queryClient.setQueryData(["resume"], (oldData) => ({
        ...(oldData || {}),
        ...newResume,
      }));

      await internalResumeUpdate(newResume);
    } catch (error) {
      // Rollback optimistic update on failure
      queryClient.invalidateQueries({ queryKey: ["resume"] });
      throw error;
    }
  };

  // Mutation for update resume
  const uploadResumeMutation = useMutation({
    mutationFn: uploadResumeFile,
    onSuccess: () => {
      // Invalidate refetch resume data
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  // Mutation for toggling status of publishment
  const toggleStatusMutation = useMutation({
    mutationFn: async (newPublishStatus: PublishStatuses) => {
      if (!resumeQuery.data?.resume) return;
      await internalResumeUpdate({
        ...resumeQuery.data?.resume,
        status: newPublishStatus,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch resume data
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  // Function to save resume data changes
  const saveResumeDataChanges = async (newResumeData: ResumeData) => {
    // Validate the resume data using Zod schema
    try {
      // Validate the resume data
      ResumeDataSchema.parse(newResumeData);

      // If validation passes, update the resume
      if (!resumeQuery.data?.resume) {
        throw new Error("No resume found to update");
      }

      const updatedResume: Resume = {
        ...resumeQuery.data.resume,
        resumeData: newResumeData,
      };

      await internalResumeUpdate(updatedResume);

      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Validation failed: ${error.message}`);
      }
      throw error;
    }
  };

  const checkUsernameMutation = useMutation({
    mutationFn: async (username: string) => {
      const response = await fetch(
        `/api/check-username?username=${encodeURIComponent(username)}`,
        {
          method: "POST",
        },
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to check username availability");
      }
      return await response.json();
    },
  });

  const debouncedCheckUsername = useDebouncedCallback((username: string) => {
    checkUsernameMutation.mutate(username);
  }, 500);

  const updateUsernameMutation = useMutation({
    mutationFn: internalUsernameUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["username"] });
    },
  });

  // Mutation for saving resume data changes
  const saveResumeDataMutation = useMutation({
    mutationFn: saveResumeDataChanges,
    onSuccess: () => {
      // Invalidate and refetch resume data
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  return {
    resumeQuery,
    uploadResumeMutation,
    toggleStatusMutation,
    usernameQuery,
    checkUsernameMutation,
    debouncedCheckUsername,
    updateUsernameMutation,
    saveResumeDataMutation,
  };
}
