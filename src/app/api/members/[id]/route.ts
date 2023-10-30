import { NextResponse } from "next/server";
import { roleChangeSchema } from "@/server/schema/role-change/role-change.schema";
import { deleteUserSchema } from "@/server/schema/delete-user/delete-user.schema";

import { getServerSession } from "next-auth";
import { options } from "@/server/auth";

import prisma from "@/server/db/prisma";

export async function DELETE(
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

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = deleteUserSchema.parse(await request.json());

    const server = await prisma.server.update({
      where: {
        id: body.serverId,
        ownerId: session.user.id,
      },
      data: {
        members: {
          delete: {
            id: params.id,
            userId: {
              not: session.user.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        channels: true,
      },
    });

    if (!server) {
      return new NextResponse("Unauthorized, not able to perform this action");
    }

    return NextResponse.json(server);
  } catch (error) {
    console.log("[DELETE /api/members/[id] Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

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

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = roleChangeSchema.parse(await request.json());

    const server = await prisma.server.update({
      where: {
        id: body.serverId,
        ownerId: session.user.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.id,
              userId: {
                not: session.user.id,
              },
            },
            data: {
              role: body.newRole,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        channels: true,
      },
    });

    if (!server) {
      return new NextResponse("Unauthorized, not able to perform this action");
    }

    return NextResponse.json(server);
  } catch (error) {
    console.log("[DELETE /api/members/[id] Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
