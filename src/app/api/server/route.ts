import { NextResponse } from "next/server";
import { createServerFormSchema } from "@/server/schema/server/server.schema";
import prisma from "@/server/db/prisma";

import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { ChannelType, MemberRole } from "@prisma/client";
import { options } from "@/server/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const id = session.user.id;

    const body = createServerFormSchema.parse(await request.json());

    await prisma.server.create({
      data: {
        name: body.name,
        image: body.image,
        inviteCode: nanoid(21),
        ownerId: id,
        members: {
          create: {
            userId: id,
            role: MemberRole.ADMIN,
          },
        },
        channels: {
          create: {
            name: "general",
            type: ChannelType.TEXT,
          },
        },
      },
    });

    return new NextResponse("Server Created", { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error (POST /api/server)", {
      status: 500,
    });
  }
}
