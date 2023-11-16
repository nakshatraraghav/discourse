import PusherServer from "pusher";
import PusherClient from "pusher-js";

import { env } from "@/server/env";

export const pusherServer = new PusherServer({
  appId: env.PUSHER_APP_ID,
  key: env.PUSHER_KEY,
  secret: env.PUSHER_SECRET_KEY,
  cluster: env.PUSHER_CLUSTER,
  useTLS: true,
});

export const pusherClient = new PusherClient(env.PUSHER_APP_ID, {
  cluster: env.PUSHER_CLUSTER,
});
