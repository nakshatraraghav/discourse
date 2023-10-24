import { options } from "@/server/auth";
import { getServerSession } from "next-auth";

import { editServerFormSchema } from "@/server/schema/server/server.schema";

import prisma from "@/server/db/prisma";

import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const session = await getServerSession(options);
    const body = editServerFormSchema.parse(await request.json());

    const id = params.id;

    if (!session) {
      return new NextResponse("Unauthorized No Session", {
        status: 401,
      });
    }

    const member = await prisma.member.findFirst({
      where: {
        AND: [{ serverId: id }, { userId: session.user.id }],
      },
    });

    if (!member) {
      return new NextResponse("Unauthorized, Not in partiular server", {
        status: 401,
      });
    }

    if (member.role !== MemberRole.ADMIN) {
      return new NextResponse("Unauthorized, Not Admin", {
        status: 401,
      });
    }

    const server = await prisma.server.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        image: body.image,
      },
    });

    return new NextResponse("Server Updated", { status: 201 });
  } catch (error) {
    console.log("PATCH /api/server/[id] Error", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
