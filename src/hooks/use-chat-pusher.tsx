"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocketStore } from "@/store/socket-status";

import { pusherClient, events } from "@/lib/pusher";

import { MessageWithUser } from "../../types";

interface useChatPusherProps {
  chatId: string;
  queryKey: string;
}

export function useChatPusher({ chatId, queryKey }: useChatPusherProps) {
  const { setStatus } = useSocketStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);

    channel.bind("pusher:subscription_succeeded", () => {
      setStatus("connected");
    });

    channel.bind("pusher:subscription_error", (error: any) => {
      console.log("pusher subscription error", error);
      setStatus("failure");
    });

    channel
      .unbind(events.addMessage)
      .bind(events.addMessage, (message: MessageWithUser) => {
        console.log("MESSAGE ADDEDDDDDD");
        queryClient.setQueryData([queryKey], (staleData: any) => {
          if (!staleData || !staleData.pages || staleData.pages.length === 0) {
            return {
              pages: [
                {
                  items: [message],
                },
              ],
            };
          }

          const newPage = [...staleData.pages];

          newPage[0] = {
            ...newPage[0],
            items: [message, ...newPage[0].items],
          };

          return {
            ...staleData,
            pages: newPage,
          };
        });
      });

    channel
      .unbind(events.updateMessage)
      .bind(events.updateMessage, (message: MessageWithUser) => {
        queryClient.setQueryData([queryKey], (staleData: any) => {
          if (!staleData || !staleData.pages || staleData.pages.length === 0) {
            return staleData;
          }

          const updatedData = staleData.pages.map((page: any) => ({
            ...page,
            items: page.items.map((mesg: MessageWithUser) => {
              if (mesg.id === message.id) {
                return message;
              }
              return mesg;
            }),
          }));

          return {
            ...staleData,
            pages: updatedData,
          };
        });
      });
  }, [chatId, queryClient, queryKey, setStatus]);
}
