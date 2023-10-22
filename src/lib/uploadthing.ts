import { generateComponents } from "@uploadthing/react";

import type { DiscourseFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<DiscourseFileRouter>();
