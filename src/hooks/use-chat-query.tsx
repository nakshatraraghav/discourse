"use client";

import qs from "query-string";
import axios from "axios";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocketStore } from "@/store/socket-status";

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
  const { status } = useSocketStore();

  const map = {
    channel: "/api/messages",
    "direct-conversation": "/api/messages/direct-conversation",
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
        { skipNull: true }
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
    refetchInterval: status === "connected" ? false : 1000,
    initialPageParam: "",
  });

  return query;
}
