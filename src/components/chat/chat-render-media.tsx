import React from "react";
import Image from "next/image";

import { FileIcon } from "lucide-react";

interface ChatRenderMediaProps {
  fileUrl: string | null;
}

export function ChatRenderMedia({ fileUrl }: ChatRenderMediaProps) {
  if (!fileUrl) return null;

  const fileType = fileUrl?.split(".").pop();

  const file = {
    isPdf: fileType === "pdf",
    isImage: ["png", "jpg", "jpeg", "gif"].includes(fileType ?? ""),
    isVideo: ["mp4", "mov", "avi"].includes(fileType ?? ""),
  };

  return (
    <React.Fragment>
      {file.isImage && (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-80 w-80 mt-2 overflow-hidden border bg-secondary flex items-center relative aspect-square rounded-lg"
        >
          <Image src={fileUrl} fill alt="file image" />
        </a>
      )}
      {file.isPdf && (
        <div className="p-4 mt-2 rounded-md relative flex items-center bg-indigo-500/10">
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center space-x-2 w-full">
              <FileIcon className="h-8 w-8 fill-indigo-200 stroke-indigo-500" />
              <div>PDF File</div>
            </div>
          </a>
        </div>
      )}
      {file.isVideo && (
        <a href={fileUrl}>
          <video
            controls
            className="aspect-video h-80 w-80  bg-secondary flex items-center relative rounded-lg"
          >
            <source src={fileUrl} type="video/mp4" />
          </video>
        </a>
      )}
    </React.Fragment>
  );
}
