// components/DownloadButton.tsx
import { MouseEvent } from "react";
import { Save } from "lucide-react";

interface DownloadButtonProps {
  src: string;       // e.g. "https://cdn.example.com/videos/123.mp4"
  filename?: string; // optional download name
}

export function DownloadButton({ src, filename }: DownloadButtonProps) {
  const handleDownload = async (e: MouseEvent) => {
    e.preventDefault();
    // 1. Fetch as blob
    const res = await fetch(src, { mode: "cors" });
    if (!res.ok) throw new Error("Network response was not ok");
    const blob = await res.blob();

    // 2. Create object URL & trigger download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || src.split("/").pop() || "video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <button className="bg-blue-500 rounded-md text-white w-full sm:w-auto inline-flex items-center gap-2 justify-center whitespace-nowrap px-4 py-2 sm:px-6 sm:py-3" onClick={handleDownload}>
      {<Save className="w-4 h-4 fill-white stroke-purple-500" />}Download
    </button>
  );
} 