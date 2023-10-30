import { options } from "@/server/auth";
import { createChannelServerSchema } from "@/server/schema/channel/channel.schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/server/db/prisma";
import { MemberRole } from "@prisma/client";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = createChannelServerSchema.parse(await request.json());

    if (body.name === "general") {
      return new NextResponse("Channel name cannot be general", {
        status: 400,
      });
    }

    const server = await prisma.server.update({
      where: {
        id: body.serverId,
        members: {
          some: {
            userId: session.user.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            name: body.name,
            type: body.type,
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("Failed to create Server", { status: 500 });
    }

    return NextResponse.json(server);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error.errors, { status: 400 });
    }

    console.log("[ POST /api/channels Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
