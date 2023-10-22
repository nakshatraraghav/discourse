import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

async function auth() {
  const session = await getServerSession();

  if (!session) {
    throw new Error("unauthorized");
  }

  return {
    id: session.user.id,
  };
}

export const fileRouter = {
  serverLogo: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(() => auth())
    .onUploadComplete(() => {}),
  messageFile: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
    video: {
      maxFileSize: "64MB",
      maxFileCount: 1,
    },
    pdf: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(() => auth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type DiscourseFileRouter = typeof fileRouter;
