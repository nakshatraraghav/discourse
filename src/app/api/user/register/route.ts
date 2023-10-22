import { registerSchema } from "@/server/schema/auth/auth.schema";
import { findUserByEmail } from "@/server/services/user.service";
import { NextResponse } from "next/server";
import prisma from "@/server/db/prisma";
import argon from "argon2";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = registerSchema.parse(await request.json());

    const user = await findUserByEmail(body.email);

    console.log(user);

    if (user) {
      return new NextResponse("User Already Exists", {
        status: 409,
      });
    }

    const hashed = await argon.hash(body.password);

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: hashed,
      },
    });

    if (!newUser) {
      return new NextResponse("Failed To Create The Resource", {
        status: 500,
      });
    }

    return new NextResponse("User Created", {
      status: 201,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid Credentials", {
        status: 400,
      });
    }

    return new NextResponse("Internal Server Error, Try again", {
      status: 500,
    });
  }
}
