"use client";

import { env } from "@/server/env";
import axios from "axios";
import qs from "query-string";

import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Loader2, ServerCrashIcon } from "lucide-react";
import { Button } from "../ui/button";

interface LivekitMediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

type Data = {
  token: string;
};

export function LiveKitMediaRoom({
  audio,
  video,
  chatId,
}: LivekitMediaRoomProps) {
  const { data: session } = useSession();

  const username = session?.user.username ?? session?.user.name ?? "Anonymous";

  async function getToken() {
    const url = qs.stringifyUrl({
      url: "/api/livekit/",
      query: {
        room: chatId,
        username,
      },
    });

    const { data } = await axios.get(url);

    return data;
  }

  const query = useQuery<Data>({
    queryKey: ["media-room", chatId],
    queryFn: getToken,
    staleTime: 0,
  });

  const token = query.data?.token;

  if (query.isLoading) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center space-y-3">
        <Loader2 className="h-8 w-8 text-zinc-600 animate-spin" />
        <p className="text-sm text-zinc-500">Loading...</p>
      </div>
    );
  }

  if (query.isError || !token) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center space-y-2">
        <ServerCrashIcon className="h-8 w-8 text-rose-500" />
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-rose-500">Something Went Wrong</p>
          <p className="text-xs text-zinc-500">
            Couldn&apos;t join the Media Room
          </p>
        </div>
        <Button
          variant={"outline"}
          size={"sm"}
          className="w-44"
          onClick={() => {
            query.refetch();
          }}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}
