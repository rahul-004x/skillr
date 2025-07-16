import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Copy, SquareArrowOutUpRight, X } from "lucide-react";
import { useMemo } from "react";
import Image from "next/image";

const PopUpLiveSite = ({
  isOpen,
  onClose,
  websiteUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  websiteUrl: string;
}) => {
  const mainContent = useMemo(() => {
    return (
      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-between p-6 gap-5">
          <Image
            src="/site-live.svg"
            alt="Site live icon"
            height={41}
            width={52}
          />
          <h3 className="text-2xl font-medium text-black/95">Your website is live now</h3>
          <div className="flex flex-col w-full gap-5 md:gap-2">
            <div className="flex-grow bg-gray-100 border border-text-gray-300 rounded-md p-2 px-3 text-sm text-gray-700 min-h-10">{websiteUrl}</div>
            <div className="grid grid-cols-2 gap-4 md:gap-2">
              <button className="bg-black/95 rounded-md hover:bg-gray-800 p-2 text-white flex flex-row gap-2 items-center justify-center">
                <Copy className="size-5" />
                <span>Copy Url</span>
              </button>
              <a href={websiteUrl} target="_blank" rel="noreferrer" className="bg-black/95 rounded-md hover:bg-gray-800 p-2 text-white flex flex-row gap-2 items-center justify-center">
                <SquareArrowOutUpRight className="size-5" />
                <span>visite Site</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }, [websiteUrl]);
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogHeader>
          <DialogTitle>
            <span className="sr-only">Site live</span>
          </DialogTitle>
        </DialogHeader>
      <DialogContent className="sm:maw-w-md p-0 gap-0 border-none h-[280px] w-[500px]">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
          <X className="size-4" />
        </button>
        {mainContent}
      </DialogContent>
    </Dialog>
  );
};

export default PopUpLiveSite;
