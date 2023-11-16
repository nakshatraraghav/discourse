"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import axios, { AxiosError } from "axios";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { sendFileFormSchema as formSchema } from "@/server/schema/messages/sendfile.schema";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/uploadthing/file-upload";
import { useToast } from "@/hooks/use-toast";
import { useModalStore } from "@/store/modal";

type formData = z.infer<typeof formSchema>;

interface SendFileFormProps {
  type: "direct-conversation" | "channel";
  channelId: string;
  serverId: string;
}

export function SendFileForm({ type, channelId, serverId }: SendFileFormProps) {
  const router = useRouter();

  const { onClose } = useModalStore();

  const { toast } = useToast();

  const form = useForm<formData>({
    defaultValues: {
      body: "",
      image: "",
    },
    resolver: zodResolver(formSchema),
  });

  const loading = form.formState.isSubmitting;
  const errors = form.formState.errors;

  async function onSubmit(data: formData) {
    try {
      await axios.post("/api/messages", {
        body: data.body,
        fileUrl: data.image,
        channelId,
        serverId,
      });

      toast({
        title: "Sucessfully",
        description: "Successfully sent the along with the Message",
      });

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 401:
            toast({
              variant: "destructive",
              title: "Unauthorized, Please Login",
            });
            break;
          case 500:
            toast({
              variant: "destructive",
              title: "Internal Server Error",
              description: "Please try again later",
            });
        }
      }
      toast({
        variant: "destructive",
        title: "Unknown Error",
        description: "Please try again later",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File Upload</FormLabel>

              <FormControl>
                <FileUpload
                  endpoint="serverLogo"
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>

              {!errors["image"] && (
                <FormDescription>
                  This file will be sent to everyone in this Channel
                </FormDescription>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Body</FormLabel>
              <FormControl>
                <Input type="text" placeholder="hocus pocus" {...field} />
              </FormControl>
              {!errors["body"] && (
                <FormDescription>Enter the message body</FormDescription>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <Button size={"sm"} className="w-full" disabled={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
