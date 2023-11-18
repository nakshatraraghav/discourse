"use client";

import React, { useRef, ElementRef } from "react";

import { useChatQuery } from "@/hooks/use-chat-query";

import { Member } from "@prisma/client";
import { MessageWithUser } from "../../../types";

import { ChatWelcome } from "./chat-welcome";
import { Loader2, ServerCrashIcon } from "lucide-react";

import { Button } from "../ui/button";
import { ChatMessageItem } from "@/components/chat/chat-message-item";
import { useChatPusher } from "@/hooks/use-chat-pusher";
import { useScrollToChat } from "@/hooks/use-scroll-to-chat";

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  type: "channel" | "direct-conversation";
}

export function ChatMessages({
  name,
  type,
  chatId,
  member,
}: ChatMessagesProps) {
  const queryKey = `chat:${chatId}`;

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  useChatPusher({ chatId, queryKey });

  const query = useChatQuery({
    queryKey,
    chatType: type,
    chatTypeId: chatId,
  });

  useScrollToChat({ bottomRef });

  if (query.isLoading) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center space-y-3">
        <Loader2 className="h-8 w-8 text-zinc-600 animate-spin" />
        <p className="text-sm text-zinc-500">Loading Messages...</p>
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center space-y-2">
        <ServerCrashIcon className="h-8 w-8 text-rose-500" />
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-rose-500">Something Went Wrong</p>
          <p className="text-xs text-zinc-500">Couldn&apos;t fetch the posts</p>
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

  const pages = query.data?.pages;

  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto" ref={chatRef}>
      {!query.hasNextPage && <ChatWelcome type={type} name={name} />}
      {query.hasNextPage && (
        <div className="flex justify-center">
          {query.isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-400" />
          ) : (
            <Button
              variant={"outline"}
              size={"sm"}
              className="mt-5"
              onClick={() => {
                query.fetchNextPage();
              }}
            >
              Load previous messages
            </Button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {pages?.map((page, i) => (
          <React.Fragment key={i}>
            {page.items.map((message: MessageWithUser) => (
              <ChatMessageItem
                message={message}
                currentMember={member}
                key={message.id}
                type={type}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
