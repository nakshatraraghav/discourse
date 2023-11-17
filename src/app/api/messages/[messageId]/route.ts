import prisma from "@/server/db/prisma";
import { NextResponse } from "next/server";

import { options } from "@/server/auth";
import { getServerSession } from "next-auth";

import { messageUpdateSchema } from "@/server/schema/messages/message.schema";
import { ZodError } from "zod";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const { text: updatedText } = messageUpdateSchema.parse(
      await request.json()
    );

    const searchParams = new URL(request.url).searchParams;

    const messageId = searchParams.get("messageId");

    const serverId = searchParams.get("serverId");

    if (!messageId || !serverId) {
      return new NextResponse(
        "bad request, search params missing from request",
        { status: 400 }
      );
    }

    const server = await prisma.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("server not found, or you are not a part of it", {
        status: 404,
      });
    }

    const message = await prisma.message.findFirst({
      where: {
        id: messageId,
      },
      include: {
        member: true,
      },
    });

    if (!message) {
      return new NextResponse("failed to find the message", { status: 500 });
    }

    if (message.member.userId === session.user.id) {
      const updatedMessage = await prisma.message.update({
        where: {
          id: messageId,
        },
        data: {
          text: updatedText,
        },
      });

      if (!updatedText) {
        return new NextResponse("failed to update message", { status: 500 });
      }

      return new NextResponse("message updated", { status: 201 });
    }

    return new NextResponse(
      "unauthorized, you cannot edit this message only its owner can",
      { status: 401 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse(error.message, { status: 400 });
    }

    console.log("PUT /api/messages/[messageId] ERROR", error);

    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const searchParams = new URL(request.url).searchParams;

    const messageId = searchParams.get("messageId");

    const serverId = searchParams.get("serverId");

    if (!messageId || !serverId) {
      return new NextResponse(
        "bad request, search params missing from request",
        { status: 400 }
      );
    }

    const currentUser = await prisma.member.findFirst({
      where: {
        userId: session.user.id,
        serverId: serverId as string,
      },
    });

    if (!currentUser) {
      return new NextResponse("member not foud in server", { status: 404 });
    }

    const server = await prisma.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("server not found, or you are not a part of it", {
        status: 404,
      });
    }

    const message = await prisma.message.findFirst({
      where: {
        id: messageId as string,
      },
      include: {
        member: true,
      },
    });

    if (!message) {
      return new NextResponse("failed to find the message", { status: 500 });
    }

    const isModerator =
      currentUser.role === "ADMIN" || currentUser.role === "MODERATOR";

    const isOwner = message?.member.userId === session.user.id;

    if (!isModerator || !isOwner) {
      return new NextResponse("unauthorized, you cannot delete this message", {
        status: 401,
      });
    }

    const deleted = await prisma.message.update({
      where: {
        id: message.id,
      },
      data: {
        text: "",
        deleted: true,
      },
    });

    return new NextResponse("message deleted", { status: 201 });
  } catch (error) {
    console.log("DELETE /api/messages/[messageId] ERROR", error);

    return new NextResponse("internal server error", { status: 500 });
  }
}
