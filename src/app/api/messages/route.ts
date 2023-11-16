import prisma from "@/server/db/prisma";

import { options } from "@/server/auth";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { messageSchema } from "@/server/schema/messages/message.schema";
import { pusherServer } from "@/lib/pusher";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const data = messageSchema.parse(await request.json());

    console.log(data);

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
    });

    if (!message) {
      return new NextResponse("failed to create a message", { status: 500 });
    }

    const pusherChannelKey = `chat-${channel.id}-messages`;

    console.log(pusherChannelKey);

    await pusherServer.trigger(pusherChannelKey, "message:new", message);

    return new NextResponse("message created", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("invalid data", { status: 400 });
    }

    console.log("POST /api/messages ERROR", error);

    return new NextResponse("internal server error", { status: 500 });
  }
}
