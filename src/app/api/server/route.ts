import { NextResponse } from "next/server";
import { createServerFormSchema } from "@/server/schema/server/server.schema";
import prisma from "@/server/db/prisma";

import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { ChannelType, MemberRole } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const email = session.user.email as string;

    if (!email) {
      console.log("EMAIL NOT ON TOKEN");
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new NextResponse("User Not Found", { status: 400 });
    }

    const id = user.id;

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
