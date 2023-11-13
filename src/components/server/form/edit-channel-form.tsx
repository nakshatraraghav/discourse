"use client";

import axios from "axios";

import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

import {
  editChanneFormSchema,
  editChannelFormType,
} from "@/server/schema/channel/channel.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";

interface EditChannellFormProps {
  channelId: string;
  serverId: string;
  onClose: () => void;
}

export function EditChannellForm({
  channelId,
  serverId,
  onClose,
}: EditChannellFormProps) {
  const form = useForm<editChannelFormType>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(editChanneFormSchema),
  });

  const loading = form.formState.isSubmitting;
  const errors = form.formState.errors;

  const { toast } = useToast();

  const router = useRouter();

  async function onSubmit(data: editChannelFormType) {
    try {
      if (data.name === "" || data.name.toLocaleLowerCase() === "general") {
        form.setError("name", {
          message: "Invalid Name, Name cannot be empty or General",
        });
        throw new Error("invalid_error");
      }

      await axios.patch(`/api/channels/${channelId}`, {
        name: data.name,
        serverId,
      });

      onClose();

      toast({
        title: "Edit Channel Sucessfull",
        description: `Name updated to ${data.name}`,
      });
      router.refresh();
    } catch (error: any) {
      if (error.message === "invalid_error") {
        toast({
          variant: "destructive",
          title: "Edit Channel Failed",
          description:
            "Failed You cannot set Channel Name to empty string or General",
        });
        return;
      }

      toast({
        variant: "destructive",
        title: "Edit Channel Failed",
        description: "Failed to edit this channel please try again later",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Name</FormLabel>
              <FormControl>
                <Input placeholder="new-channel-name" {...field} />
              </FormControl>
              {!errors && (
                <FormDescription>
                  This is your public display name.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <Button className="w-full mt-2" size={"sm"}>
          {loading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
