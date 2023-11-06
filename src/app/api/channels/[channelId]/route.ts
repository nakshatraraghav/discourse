import { ZodError, z } from "zod";

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { options } from "@/server/auth";

import prisma from "@/server/db/prisma";

import {
  deleteChannelServerSchema,
  editChannelServerSchema,
} from "@/server/schema/channel/channel.schema";

export async function PATCH(
  request: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.channelId) {
      return new NextResponse(
        "Channel ID Missing from parameters of this request",
        { status: 400 }
      );
    }
    const body = editChannelServerSchema.parse(await request.json());

    const server = await prisma.server.update({
      where: {
        id: body.serverId,
        members: {
          some: {
            role: {
              in: ["ADMIN", "MODERATOR"],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
            },
            data: {
              name: body.name,
            },
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("failed to delete channel", { status: 500 });
    }

    return new NextResponse("Channel Edited", { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Server ID or New Name Missing from body", {
        status: 401,
      });
    }

    console.log("PATCH /api/channels/[channelId] ERROR", error);

    return new NextResponse("Internal Server Error", { status: 501 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.channelId) {
      return new NextResponse(
        "Channel ID Missing from parameters of this request",
        { status: 400 }
      );
    }

    const body = deleteChannelServerSchema.parse(await request.json());

    const server = await prisma.server.update({
      where: {
        id: body.serverId,
        members: {
          some: {
            role: {
              in: ["MODERATOR", "ADMIN"],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("failed to delete channel", { status: 500 });
    }

    return new NextResponse("Channel Deleted", { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Server ID Missing from body", { status: 401 });
    }

    console.log("DELETE /api/channels/[channelId] ERROR", error);

    return new NextResponse("Internal Server Error", { status: 501 });
  }
}
