import { createNextRouteHandler } from "uploadthing/next";
import { fileRouter } from "@/app/api/uploadthing/core";

export const { GET, POST } = createNextRouteHandler({
  router: fileRouter,
});
