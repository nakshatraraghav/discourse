"use client";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";

import Image from "next/image";

import { Cross2Icon } from "@radix-ui/react-icons";

interface FileUploadProps {
  endpoint: "serverLogo" | "messageFile";
  value: string;
  onChange: (url?: string) => void;
}

export function FileUpload({ endpoint, value, onChange }: FileUploadProps) {
  if (value) {
    return (
      <div className="relative h-20 w-20 mx-auto">
        <Image fill src={value} alt="uploaded file" />
        <Cross2Icon
          className="absolute w-7 h-7 bg-rose-700 text-white p-1 rounded-full -top-3 -right-3 shadow-lg hover:bg-rose-800 transition duration-150"
          type="button"
          onClick={() => {
            onChange("");
            // TODO: Delete File
            // TODO Show Video and PDF
          }}
        />
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={() => {
        console.log("error");
      }}
    />
  );
}
