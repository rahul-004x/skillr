import LoadingFallback from "@/components/LoadingFallback";

interface LoadingPreviewProps {
  message: string;
}

export default function LoadingPreview({ message }: LoadingPreviewProps) {
  return <LoadingFallback message={message} />;
}
