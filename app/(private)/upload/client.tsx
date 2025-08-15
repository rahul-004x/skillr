"use client";

import React, { useState, useEffect } from "react";
import { Linkedin, X } from "lucide-react";
import { Dropzone } from "@/components/ui/dropzone";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useUserActions } from "@/hooks/useUserAction";
import { CustomSpinner } from "@/components/CustomSpinner";

type FileState =
  | { status: "empty" }
  | { status: "saved"; file: { name: string; url: string; size: number } };

export default function UploadPageClient() {
  const router = useRouter();

  const { resumeQuery, uploadResumeMutation } = useUserActions();
  const [fileState, setFileState] = useState<FileState>({ status: "empty" });

  const resume = resumeQuery.data?.resume;

  // Update fileState whenever resume changes
  useEffect(() => {
    if (resume?.file?.url && resume.file.name && resume.file.size) {
      setFileState({
        status: "saved",
        file: {
          name: resume.file.name,
          url: resume.file.url,
          size: resume.file.size,
        },
      });
    }
  }, [resume]);

  const handleReset = () => {
    setFileState({ status: "empty" });
  };

  const isUpdating = resumeQuery.isPending || uploadResumeMutation.isPending;

  const handleUploadFile = async (file: File) => {
    uploadResumeMutation.mutate(file, {
      onError: (error) => {
        toast.error(
          error.message || "Failed to upload file. Please try again.",
        );
      },
    });
  };

  return (
    <div className="flex min-h-[80vh] flex-1 flex-col items-center gap-6 px-4 py-12">
      <div className="mx-auto w-full max-w-[438px] text-center font-mono">
        <h1 className="pb-6 text-center text-base">
          Upload the PDF of you linkedin or your resume and generate your
          portfolio website
        </h1>

        <div className="relative mx-2.5">
          {fileState.status != "empty" && (
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 z-10 rounded-full p-1 hover:bg-gray-100"
              disabled={isUpdating}
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
          <Dropzone
            accept={{ "application/pdf": [".pdf"] }}
            maxFiles={1}
            icon={
              fileState.status != "empty" ? (
                <Image
                  src="/uploaded-pdf.svg"
                  alt="uploaded"
                  height={30}
                  width={30}
                />
              ) : (
                <Linkedin className="h-8 w-8 text-gray-600" />
              )
            }
            title={
              <span className="text-center text-base font-bold text-black/95">
                {fileState.status !== "empty"
                  ? fileState.file.name
                  : "Upload PDF"}
              </span>
            }
            description={
              <span className="text-center text-sm font-light text-gray-600">
                {fileState.status !== "empty"
                  ? `${(fileState.file.size / 1024 / 1024).toFixed(2)} MB`
                  : "Resume or LinkedIn"}
              </span>
            }
            isUploading={uploadResumeMutation.isPending}
            onDrop={(acceptedFiles) => {
              if (acceptedFiles[0]) handleUploadFile(acceptedFiles[0]);
            }}
            onDropRejected={() => toast.error("Only PDF files are supported")}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="mx-auto mt-3 flex cursor-help flex-row justify-center gap-1.5 border border-transparent text-center font-mono hover:border-gray-200 hover:bg-white"
              >
                <span className="ml-1 inline-block h-4 w-4 cursor-help justify-center rounded-full border border-gray-300 text-center text-xs">
                  i
                </span>
                <p className="text-center text-xs whitespace-normal text-gray-600">
                  How to upload LinkedIn Profile
                </p>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-[652px] gap-0 !p-0 text-center font-mono">
              <DialogTitle className="text-design-gray px-7 py-4 text-center font-mono text-base">
                Go to your profile → Click on “Resources” → Then “Save to PDF”
              </DialogTitle>
              <Image
                src="/linkedin-save-to-pdf.png"
                alt="how to upload linkedin profile"
                className="h-auto w-full"
                height={0}
                width={0}
                sizes="100vw"
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-4 font-mono">
          <div className="relative">
            <Button
              className="h-auto bg-black/95 px-4 py-3 hover:bg-black/85 cursor-pointer"
              disabled={fileState.status === "empty"}
              onClick={() => router.push("/pdf")}
            >
              {isUpdating ? (
                <>
                  <CustomSpinner className="backgrond-white mr-2 h-5 w-5" />
                  Processing...
                </>
              ) : (
                <>
                  <Image
                    src="/sparkle.png"
                    alt="sparkle icon"
                    width={20}
                    height={20}
                    style={{ marginRight: "0.5rem" }}
                  />
                  Generate Portfolio
                </>
              )}
            </Button>

            {fileState.status === "empty" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="absolute inset-0" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload a PDF to continue</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
