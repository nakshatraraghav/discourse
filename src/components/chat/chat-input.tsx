"use client";

import axios from "axios";

import { useToast } from "@/hooks/use-toast";
import { useModalStore } from "@/store/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PlusIcon, SendHorizonal } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
const schema = z.object({
  body: z.string().min(1),
});

type formType = z.infer<typeof schema>;

interface ChatInputProps {
  name: string;
  type: "direct-conversation" | "channel";
  channelId?: string;
  conversationId?: string;
  serverId: string;
}

export function ChatInput({
  type,
  name,
  channelId,
  serverId,
  conversationId,
}: ChatInputProps) {
  let key: string = "";

  if (type === "channel") {
    key = `chat:${channelId}`;
  } else {
    key = `chat:${conversationId}`;
  }

  const queryClient = useQueryClient();

  const form = useForm<formType>({
    defaultValues: {
      body: "",
    },
    resolver: zodResolver(schema),
  });

  const loading = form.formState.isSubmitting;
  const errors = form.formState.errors;

  const { toast } = useToast();

  const { onOpen } = useModalStore();

  async function createMessage(data: formType) {
    try {
      if (type === "channel") {
        await axios.post("/api/messages", {
          body: data.body,
          channelId: channelId,
          serverId: serverId,
        });
      } else {
        axios.post("/api/messages/direct-conversation", {
          body: data.body,
          conversationId: conversationId!,
          serverId: serverId,
        });
      }

      form.reset();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Messsage Failed",
        description: "Couldn't send the message, please try again later",
      });
    }
  }
  const messageMutation = useMutation({
    mutationKey: [key],
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [key],
      });
    },
  });

  async function onSubmit(data: formType) {
    messageMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <div className="p-4 pb-6">
                  <button
                    className="absolute top-9 left-8 h-[24px] w-[24px] bg-zinc-900 text-white hover:bg-zinc-800 transition rounded-full p-1 flex items-center justify-center"
                    type="button"
                    onClick={() => {
                      onOpen("send-file-modal", {
                        serverId: serverId,
                        channelId: channelId,
                      });
                    }}
                  >
                    <PlusIcon className="text-white" />
                  </button>
                  <Input
                    className={cn(
                      "px-14 py-6 bg-[#100e0d] border-[1px] border-[#100e0d] focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200",
                      errors["body"] && "border-[1px] border-red-700"
                    )}
                    placeholder={`Message #${name}`}
                    disabled={loading}
                    {...field}
                  />
                  <Button
                    type="submit"
                    size={"icon"}
                    variant={"outline"}
                    className="absolute top-9 right-8"
                  >
                    <SendHorizonal className="text-white cursor-pointer rotate-180 p-1" />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
