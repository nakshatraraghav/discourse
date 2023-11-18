import PusherServer from "pusher";
import PusherClient from "pusher-js";

import { env } from "@/server/env";

export const pusherServer = new PusherServer({
  appId: env.NEXT_PUBLIC_PUSHER_APP_ID,
  key: env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET_KEY!,
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export const pusherClient = new PusherClient(env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

export const events = {
  addMessage: "message-new",
  updateMessage: "message-updated",
};
