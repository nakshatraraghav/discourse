import prisma from "@/server/db/prisma";

export async function getOrCreateConversation(
  memberOneId: string,
  memberTwoId: string
) {
  let conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId));

  if (!conversation) {
    conversation = await createConversation(memberOneId, memberTwoId);
  }

  return conversation;
}

export async function findConversation(
  memberOneId: string,
  memberTwoId: string
) {
  try {
    return await prisma.conversations.findFirst({
      where: {
        AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
      },
      include: {
        memberOne: {
          include: {
            user: true,
          },
        },
        memberTwo: {
          include: {
            user: true,
          },
        },
      },
    });
  } catch (error) {
    console.log("find conversation error", error);
    return null;
  }
}

export async function createConversation(
  memberOneId: string,
  memberTwoId: string
) {
  try {
    return await prisma.conversations.create({
      data: {
        memberOneId: memberOneId,
        memberTwoId: memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            user: true,
          },
        },
        memberTwo: {
          include: {
            user: true,
          },
        },
      },
    });
  } catch (error) {
    return null;
  }
}
