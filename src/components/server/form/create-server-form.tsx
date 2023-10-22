"use client";

import { z } from "zod";

import { useForm } from "react-hook-form";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/uploadthing/file-upload";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Server name is required for Server Creation",
      invalid_type_error: "Name has to be a String",
    })
    .min(6, "Server name should be longer than 6 characters")
    .max(16, "Server name cannot be longer than 16 characters"),
  image: z.string().min(1, "Server image is required"),
});

type formData = z.infer<typeof formSchema>;

export function CreateServerForm() {
  const form = useForm<formData>({
    defaultValues: {
      name: "",
      image: "",
    },
    resolver: zodResolver(formSchema),
  });

  const loading = form.formState.isSubmitting;
  const errors = form.formState.errors;

  function onSubmit(data: formData) {
    console.log(FormData);
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
                  This is your Server&apos;s Public Logo.
                </FormDescription>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <Button size={"sm"} className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
