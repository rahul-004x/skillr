"use client";
import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "../components/ui/label";
import { MAX_USERNAME_LENGTH } from "@/lib/config";
import { useUserActions } from "@/hooks/useUserAction";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface UsernameEditorContentProps {
  initialUsername: string;
  onClose: () => void;
  prefix?: string;
}

function UsernameEditorContent({
  initialUsername,
  onClose,
}: UsernameEditorContentProps) {
  const [newUsername, setNewUsername] = useState<string>(initialUsername);
  const {
    updateUsernameMutation,
    checkUsernameMutation,
    debouncedCheckUsername,
  } = useUserActions();

  const isInitialUsername = newUsername === initialUsername;

  useEffect(() => {
    setNewUsername(initialUsername);
  }, [initialUsername]);

  useEffect(() => {
    if (!isInitialUsername && newUsername) {
      debouncedCheckUsername(newUsername);
    }
  }, [newUsername, isInitialUsername, debouncedCheckUsername]);

  const isValid =
    /^[a-zA-Z0-9-]+$/.test(newUsername) &&
    newUsername.length > 0 &&
    newUsername !== initialUsername &&
    ((isInitialUsername || checkUsernameMutation.data?.available) ?? false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/[^a-zA-Z0-9-]/g, "")
      .slice(0, MAX_USERNAME_LENGTH);
    setNewUsername(value);
  };

  const handleSave = async () => {
    try {
      await updateUsernameMutation.mutateAsync(newUsername);
      toast.success("Username updated successfully");
      onClose();
    } catch {
      toast.error("Failed to updated username");
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* Current Username (Disabled) */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="current-username">Current Username</Label>
        <div className="w-full overflow-hidden rounded border-[0.5px] border-neutral-300 bg-neutral-100">
          <input
            id="current-username"
            type="text"
            value={initialUsername}
            disabled
            className="w-full cursor-not-allowed border-none bg-transparent p-3 text-sm text-neutral-500 outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* New Username Input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="new-username">New Username</Label>
        <div className="w-full overflow-hidden rounded border-[0.5px] border-neutral-300 bg-white">
          <div className="flex items-center">
            <input
              id="new-username"
              type="text"
              value={newUsername}
              onChange={handleUsernameChange}
              maxLength={MAX_USERNAME_LENGTH}
              placeholder="Enter new username"
              className="w-full border-none bg-transparent p-3 text-sm text-[#5d5d5d] outline-none focus:ring-0"
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  isValid &&
                  !checkUsernameMutation.isPending
                ) {
                  handleSave();
                }
              }}
            />
            <div className="pr-3">
              {isInitialUsername ? (
                <></>
              ) : checkUsernameMutation.isPending ? (
                <div className="border-t-primary h-4 w-4 animate-spin rounded-full border-2 border-gray-300" />
              ) : isValid ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#009505"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <X className="h-5 w-5 text-[#950000]" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!isValid || updateUsernameMutation.isPending}
        >
          {updateUsernameMutation.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}

const UsernameEditorView = ({
  initialUsername,
  isOpen,
  onClose,
  prefix = "skillr/",
}: {
  initialUsername: string;
  isOpen: boolean;
  onClose: () => void;
  prefix?: string;
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[465px]">
          <DialogHeader>
            <DialogTitle>Edit Username</DialogTitle>
          </DialogHeader>
          <UsernameEditorContent
            initialUsername={initialUsername}
            onClose={onClose}
            prefix={prefix}
          />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Username</DrawerTitle>
        </DrawerHeader>
        <UsernameEditorContent
          initialUsername={initialUsername}
          onClose={onClose}
          prefix={prefix}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default UsernameEditorView;
