import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Drawer, DrawerTitle, DrawerContent } from "@/components/ui/drawer";
import { Copy, SquareArrowOutUpRight, X } from "lucide-react";
import { useMemo } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const PopUpLiveSite = ({
  isOpen,
  onClose,
  websiteUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  websiteUrl: string;
}) => {
  const isMobile = useIsMobile();

  const mainContent = useMemo(() => {
    return (
      <div className="rounded-lg bg-white shadow-lg">
        <div className="flex flex-col items-center justify-between gap-5 p-6">
          <Image
            src="/site-live.svg"
            alt="Site live icon"
            height={41}
            width={52}
          />
          <h3 className="text-2xl font-medium text-black/95">
            Your website is live now
          </h3>
          <div className="flex w-full flex-col gap-5 md:gap-2">
            <div className="border-text-gray-300 min-h-10 flex-grow rounded-md border bg-gray-100 p-2 px-3 text-sm text-gray-700">
              {websiteUrl}
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(websiteUrl);
                  toast.success("Copy link to you website");
                  onClose();
                }}
                title="Copy Url"
                className="flex flex-row items-center justify-center gap-2 rounded-md bg-black/95 p-2 text-white hover:bg-gray-800"
              >
                <Copy className="size-5" />
                <span>Copy Url</span>
              </button>
              <a
                href={websiteUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => onClose()}
                className="flex flex-row items-center justify-center gap-2 rounded-md bg-black/95 p-2 text-white hover:bg-gray-800"
              >
                <SquareArrowOutUpRight className="size-5" />
                <span>visite Site</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }, [websiteUrl]);

  if (!isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogHeader>
          <DialogTitle>
            <span className="sr-only">Site live</span>
          </DialogTitle>
        </DialogHeader>
        <DialogContent className="sm:maw-w-md h-[280px] w-[500px] gap-0 border-none p-0">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
            <X className="size-4" />
          </button>
          {mainContent}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerTitle>
        <span className="sr-only">Site live</span>
      </DrawerTitle>
      <DrawerContent className="outline-none">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <X className="size-4" />
        </button>
        {mainContent}
      </DrawerContent>
    </Drawer>
  );
};

export default PopUpLiveSite;
