import prisma from "@/server/db/prisma";

import { options } from "@/server/auth";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { messageSchema } from "@/server/schema/messages/message.schema";
import { events, pusherServer } from "@/lib/pusher";
import { Message } from "@prisma/client";

const MESSAGE_BATCH: number = 10;

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

    let messages: Message[] = [];

    if (!cursor) {
      messages = await prisma.message.findMany({
        where: {
          channelId: chatId,
        },
        take: MESSAGE_BATCH,
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
      messages = await prisma.message.findMany({
        where: {
          channelId: chatId,
        },
        take: MESSAGE_BATCH,
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

    if (messages.length === MESSAGE_BATCH) {
      nextCursor = messages[MESSAGE_BATCH - 1].id;
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

    const data = messageSchema.parse(await request.json());

    const server = await prisma.server.findFirst({
      where: {
        id: data.serverId,
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("unauthorized, you are not in this server", {
        status: 401,
      });
    }

    const member = await prisma.member.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!member) {
      return new NextResponse("you are not a part of this server", {
        status: 401,
      });
    }

    const channel = await prisma.channel.findFirst({
      where: {
        id: data.channelId,
        serverId: data.serverId,
      },
    });

    if (!channel) {
      return new NextResponse("channel not found", {
        status: 404,
      });
    }

    const message = await prisma.message.create({
      data: {
        text: data.body,
        fileUrl: data.fileUrl,
        memberId: member.id,
        channelId: channel.id,
        serverId: server.id,
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

    const pusherChannelKey = channel.id;

    await pusherServer.trigger(pusherChannelKey, events.addMessage, message);

    return new NextResponse("message created", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("invalid data", { status: 400 });
    }

    console.log("POST /api/messages ERROR", error);

    return new NextResponse("internal server error", { status: 500 });
  }
}
