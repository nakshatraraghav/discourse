"use client";

import qs from "query-string";
import axios from "axios";

import { useOrigin } from "@/hooks/use-origin";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface ChatQueryProps {
  queryKey: string;
  chatType: "channel" | "direct-conversation";
  chatTypeId: string;
}

export function useChatQuery({
  queryKey,
  chatType,
  chatTypeId,
}: ChatQueryProps) {
  const origin = "http://localhost:3000"; // useOrigin() should work here instead of this
  // TODO: When client subscribes to a socket turn this value to true so that our api isnt refetched every 2 seconds

  const socketConnected = true;

  const map = {
    channel: origin + "/api/messages",
    "direct-conversation": origin + "/api/messages/direct-conversation",
  };

  async function fetchMessages({
    pageParam,
  }: {
    pageParam: string | undefined;
  }) {
    let url = "";

    if (pageParam) {
      url = qs.stringifyUrl(
        {
          url: map[chatType],
          query: {
            cursor: pageParam,
            chatId: chatTypeId,
          },
        },
        { skipNull: true },
      );
    } else {
      url = qs.stringifyUrl({
        url: map[chatType],
        query: {
          chatId: chatTypeId,
        },
      });
    }

    const { data } = await axios.get(url);
    return data;
  }

  const query = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: socketConnected ? false : 1000,
    initialPageParam: "",
  });

  return query;
}
