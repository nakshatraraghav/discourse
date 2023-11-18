import prisma from "@/server/db/prisma";

import { options } from "@/server/auth";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { directMessageSchema } from "@/server/schema/messages/message.schema";
import { events, pusherServer } from "@/lib/pusher";
import { DirectMessage, Message } from "@prisma/client";

const DM_MESSAGE_BATCH: number = 10;

export async function GET(request: Request) {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    const cursor = searchParams.get("cursor");

    const chatId = searchParams.get("chatId");

    if (!chatId) {
      return new NextResponse("chat id missing from search params", {
        status: 400,
      });
    }

    let messages: DirectMessage[] = [];

    if (!cursor) {
      messages = await prisma.directMessage.findMany({
        where: {
          conversationId: chatId,
        },
        take: DM_MESSAGE_BATCH,
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await prisma.directMessage.findMany({
        where: {
          conversationId: chatId,
        },
        take: DM_MESSAGE_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        include: {
          member: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    if (!messages) {
      return new NextResponse(
        "querying for messages failed, please try again later",
        { status: 501 }
      );
    }

    let nextCursor = null;

    if (messages.length === DM_MESSAGE_BATCH) {
      nextCursor = messages[DM_MESSAGE_BATCH - 1].id;
    }

    return NextResponse.json({
      items: messages,
      nextCursor,
    });
  } catch (error) {
    console.log("GET /api/messages ERROR", error);

    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const data = directMessageSchema.parse(await request.json());

    const conversation = await prisma.conversations.findFirst({
      where: {
        id: data.conversationId,
        OR: [
          {
            memberOne: {
              userId: session.user.id,
            },
          },
          {
            memberTwo: {
              userId: session.user.id,
            },
          },
        ],
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

    if (!conversation) {
      return new NextResponse("conversation not found", { status: 404 });
    }

    const member =
      conversation.memberOne.userId === session.user.id
        ? conversation.memberOne
        : conversation.memberTwo;

    const message = await prisma.directMessage.create({
      data: {
        text: data.body,
        fileUrl: data.fileUrl,
        memberId: member.id,
        conversationId: data.conversationId,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!message) {
      return new NextResponse("failed to create a message", { status: 500 });
    }

    const pusherChannelKey = data.conversationId;

    await pusherServer.trigger(pusherChannelKey, events.addMessage, message);

    return new NextResponse("message created", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("invalid data", { status: 400 });
    }

    console.log("POST /api/messages/direct-messages ERROR", error);

    return new NextResponse("internal server error", { status: 500 });
  }
}
