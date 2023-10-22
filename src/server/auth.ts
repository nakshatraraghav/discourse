import prisma from "@/server/db/prisma";
import { env } from "@/server/env";
import {
  findUserByEmail,
  updatedUsername,
} from "@/server/services/user.service";
import { PrismaAdapter } from "@auth/prisma-adapter";
import argon from "argon2";
import { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import { loginSchema } from "./schema/auth/auth.schema";
import { User } from "@prisma/client";
import { nanoid } from "nanoid";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
}

export const options: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const body = loginSchema.parse({
          email: credentials?.email,
          password: credentials?.password,
        });

        const user = await findUserByEmail(body.email);

        if (!user) {
          throw new Error("this user does not exist");
        }

        if (!user.password) {
          throw new Error("please use correct oauth provider to login");
        }

        const valid = await argon.verify(user.password, body.password);

        if (!valid) {
          throw new Error("please use correct credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (user) {
        const dbuser = user as User;

        token.username = dbuser.username;
        token.id = dbuser.id;

        return token;
      }

      if (
        account &&
        (account.provider === "discord" || account.provider === "google")
      ) {
        const dbuser = user as User;

        const generatedUsername = `${dbuser.username}_${nanoid(5)}`.replace(
          " ",
          ""
        );

        if (!dbuser.email) {
          console.log("EMAIL NOT FOUND");
          return token;
        }

        const update = await updatedUsername(dbuser.email!, generatedUsername);

        if (!update) {
          console.log("FAILED TO UPDATE THE USERNAME");
          return token;
        }
        token.username = update.username;
        token.id = update.id;
      }
      return token;
    },

    session: async ({ token, session }) => {
      session.user.id = token.id as string;
      session.user.username = token.username as string;

      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
