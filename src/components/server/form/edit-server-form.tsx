"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import axios, { AxiosError } from "axios";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { editServerFormSchema as formSchema } from "@/server/schema/server/server.schema";

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

export function EditServerForm() {
  const router = useRouter();

  const {
    onClose,
    data: { server },
  } = useModalStore();

  const { toast } = useToast();

  const form = useForm<formData>({
    defaultValues: {
      name: "",
      image: "",
    },
    resolver: zodResolver(formSchema),
  });

  const loading = form.formState.isSubmitting;
  const errors = form.formState.errors;

  useEffect(() => {
    if (server) {
      form.setValue("name", server.name);
      form.setValue("image", server.image);
    }
  }, [server, form]);

  async function onSubmit(data: formData) {
    try {
      console.log(`/api/server/${server!.id}`);

      await axios.patch(`/api/server/${server!.id}`, data);

      toast({
        title: "Server Updated",
        description: "You can now add users to it.",
      });

      form.reset();
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 401:
            toast({
              variant: "destructive",
              title: "Unauthorized Access Not Permited",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={server?.name ?? "acoolservername"}
                  {...field}
                />
              </FormControl>
              {!errors["name"] && (
                <FormDescription>
                  This is your Server&apos;s name.
                </FormDescription>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Server Logo</FormLabel>

              <FormControl>
                <FileUpload
                  endpoint="serverLogo"
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>

              {!errors["name"] && (
                <FormDescription>
                  This is your new server public logo.
                </FormDescription>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <Button size={"sm"} className="w-full" disabled={loading}>
          Update
        </Button>
      </form>
    </Form>
  );
}
