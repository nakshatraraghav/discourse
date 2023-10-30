"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChannelFormSchema as formSchema,
  formSchemaType,
} from "@/server/schema/channel/channel.schema";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChannelType } from "@prisma/client";
import axios from "axios";
import { useModalStore } from "@/store/modal";

export function CreateChannelForm({ serverId }: { serverId: string }) {
  const router = useRouter();

  const { onClose } = useModalStore();

  const form = useForm<formSchemaType>({
    defaultValues: {
      type: ChannelType.TEXT,
    },
    resolver: zodResolver(formSchema),
  });

  const loading = form.formState.isSubmitting;
  const errors = form.formState.errors;

  async function onSubmit(data: formSchemaType) {
    try {
      const response = await axios.post("/api/channels", {
        name: data.name,
        type: data.type,
        serverId,
      });

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {}
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
                <Input type="text" placeholder="acoolservername" {...field} />
              </FormControl>
              {!errors["name"] && (
                <FormDescription>This is the new channel name.</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Channel Type</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a channel type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ChannelType).map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type.toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!errors["type"] && (
                <FormDescription>
                  Select your channel&apos;s type.
                </FormDescription>
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
