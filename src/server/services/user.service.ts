import prisma from "@/server/db/prisma";

export async function findUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updatedUsername(email: string, username: string) {
  try {
    const updated = await prisma.user.update({
      data: {
        username,
      },
      where: {
        email,
      },
    });

    return updated;
  } catch (error) {
    console.log(error);
    return null;
  }
}
