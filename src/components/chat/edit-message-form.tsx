"use client";

import { Dispatch, SetStateAction } from "react";

import axios from "axios";
import qs from "query-string";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import {
  messageUpdateSchema as formSchema,
  type messageUpdateSchemaType,
} from "@/server/schema/messages/message.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { SendHorizonal } from "lucide-react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type formDataType = messageUpdateSchemaType;

interface EditMessageFormProps {
  messageId: string;
  chatId: string;
  serverId: string;
  setIsUserEditing: Dispatch<SetStateAction<boolean>>;
}

export function EditMessageForm({
  messageId,
  serverId,
  chatId,
  setIsUserEditing,
}: EditMessageFormProps) {
  const form = useForm<formDataType>({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(formSchema),
  });

  const formErrors = form.formState.errors;

  const { toast } = useToast();

  const queryClient = useQueryClient();

  async function updateMessage(data: formDataType) {
    try {
      const url = qs.stringifyUrl({
        url: `/api/messages/${messageId}`,
        query: {
          messageId,
          serverId,
        },
      });

      await axios.put(url, data);

      setIsUserEditing(false);
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Failed to update the message",
        description: "Please try again later.",
      });
    }
  }
  const key = `chat:update-message:${messageId}`;

  const messageMutation = useMutation({
    mutationKey: [key],
    mutationFn: updateMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`chat:${chatId}`],
      });
    },
  });

  async function onSubmit(data: formDataType) {
    messageMutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative mt-1">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative w-full flex items-center">
                  <Input
                    placeholder="edited message"
                    className={cn(
                      "px-2 py-6 bg-[#100e0d] border-[1px] border-[#100e0d] focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200",
                      formErrors["text"] && "border-rose-500"
                    )}
                    {...field}
                  />
                  <Button
                    type="submit"
                    size={"icon"}
                    variant={"outline"}
                    className="absolute top-[7px] right-8"
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
