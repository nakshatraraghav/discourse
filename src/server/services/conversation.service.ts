import prisma from "@/server/db/prisma";

interface ConversationInterface {
  memberOneId: string;
  memberTwoId: string;
}

export async function findConversation({ memberOneId, memberTwoId }: ConversationInterface) {
  try {
    const conversation = await prisma.conversations.findFirst({
      where: {
        memberOneId,
        memberTwoId
      },
      include: {
        memberOne: {
          include: {
            user: true
          }
        },
        memberTwo: {
          include: {
            user: true
          }
        }
      }
    })

    return conversation;
  } catch(error) {
    console.log("Error finding conversation", error)
    return null;
  }
}

export async function createConversation({ memberOneId, memberTwoId } : ConversationInterface) {
  try {
    const conversation = await prisma.conversations.create({
      data: {
        memberOneId,
        memberTwoId
      },
      include: {
        memberOne: {
          include: {
            user: true
          }
        },
        memberTwo: {
          include: {
            user: true
          }
        }
      }
    })

    return conversation
  } catch(error) {
    console.log("Error creating conversation", error)
    return null;
  }
}

export async function findOrCreateConversation({memberOneId, memberTwoId }: ConversationInterface) {

  const conversation = await findConversation({memberOneId, memberTwoId}) || await findConversation({memberOneId, memberTwoId});

  if (!conversation) {
    return await createConversation({memberOneId, memberTwoId});
  } else {
    return conversation;
  }
  

}

