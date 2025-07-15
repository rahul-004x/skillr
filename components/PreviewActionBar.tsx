"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn, getPersonalUrl } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import UsernameEditorView from "./UsernameEditorView";

export type PublishStatuses = "draft" | "live";

const PreviewActionbar = ({
  initialUsername = "",
  prefix = "skillr",
  status,
  onStatusChange,
  isChangingStatus,
}: {
  initialUsername: string;
  prefix?: string;
  status?: PublishStatuses;
  onStatusChange?: (newStatus: PublishStatuses) => Promise<void>;
  isChangingStatus?: boolean;
}) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleStatusChange = async () => {
    if (onStatusChange) {
      // Toggle the status
      const newStatus = status === "draft" ? "live" : "draft";
      await onStatusChange(newStatus);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between gap-4 rounded-lg border-[0.5px] border-neutral-300 bg-[#fcfcfc] px-5 py-3 sm:flex-row sm:px-4 sm:py-2.5">
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row">
          <div className="mr-1 flex items-center gap-1">
            <Image
              src="/link-icon.png"
              alt="link-icon"
              className={cn(
                "h-4 w-4 text-black/95",
                status === "live" && "cursor-pointer",
              )}
              height={16}
              width={16}
              onClick={() => {
                if (!initialUsername || status !== "live") return;
                const portofolioUrl = getPersonalUrl(initialUsername);
                navigator.clipboard.writeText(portofolioUrl);
                toast.success("Copied link to your website");
              }}
            />
            <p className="text-sm text-black/95">{prefix}</p>
          </div>

          <div className="flex w-full flex-row overflow-hidden rounded border-[0.5px] border-neutral-300 bg-white md:w-80">
            <span className="w-fit flex-1 truncate border-none bg-transparent p-3 text-sm text-[#5d5d5d] outline-none focus:ring-0">
              {initialUsername}
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="flex size-[44px] items-center justify-center border-l-[0.5px]"
              onClick={() => setIsEditorOpen(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {status === "live" ? (
                <button
                  onClick={() =>
                    window.open(getPersonalUrl(initialUsername), "_blank")
                  }
                  className="flex items-center gap-1 transition-opacity hover:opacity-80"
                >
                  <div
                    className="relative size-1.5 rounded-full"
                    style={{
                      backgroundColor: "#009505",
                    }}
                  >
                    <div className="absolute inset-0 animate-ping rounded-full bg-[#009505] opacity-50" />
                  </div>
                  <p className="text-[10px] font-bold text-[#009505] uppercase">
                    {status}
                  </p>
                </button>
              ) : (
                <>
                  <div
                    className="size-1.5 rounded-full"
                    style={{
                      backgroundColor: "#B98900",
                    }}
                  />
                  <p className="text-[10px] font-bold text-[#B98900] uppercase">
                    {status}
                  </p>
                </>
              )}
            </div>

            <Button
              key={status}
              variant={"default"}
              disabled={isChangingStatus}
              onClick={handleStatusChange}
              className={`flex h-auto min-h-8 min-w-[100px] items-center gap-1.5 px-3 py-1.5 ${status === "draft"
                  ? "bg-black/95 text-[#fcfcfc] hover:bg-[#333333]"
                  : "bg-white/95 text-black/95 hover:bg-gray-100"
                }`}
            >
              {isChangingStatus ? (
                <>
                  <span className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                </>
              ) : (
                <span className="text-sm">
                  {status === "draft" ? "Publish" : "Unpublish"}
                </span>
              )}
            </Button>
            {status === "live" && (
              <Button className="flex h-auto min-h-8 min-w-[100px] items-center gap-1.5 px-3 py-1.5">
                <a
                  href={`${getPersonalUrl(initialUsername)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Site
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
      <UsernameEditorView
        initialUsername={initialUsername}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        prefix={prefix}
      />
    </>
  );
};

export default PreviewActionbar;
