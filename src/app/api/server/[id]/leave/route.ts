import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { options } from "@/server/auth";

import prisma from "@/server/db/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.id) {
      return new NextResponse(
        "Server ID Missing from parameters of this request",
        { status: 400 }
      );
    }

    const server = await prisma.server.update({
      where: {
        id: params.id,
        ownerId: {
          not: session.user.id,
        },
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            userId: session.user.id,
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("Failed to leave the server", { status: 400 });
    }

    return new NextResponse("Server Left Successfully");
  } catch (error) {
    console.log("[DELETE /api/server/serverId/leave ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
