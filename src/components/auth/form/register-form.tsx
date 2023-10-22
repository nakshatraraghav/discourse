"use client";

import axios from "axios";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

import {
  registerSchema,
  type registerBodyType,
} from "@/server/schema/auth/auth.schema";
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
import { Separator } from "@/components/ui/separator";

import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { handleUserCreationResponse } from "@/lib/handle-status-code";

export function RegisterForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const schema = useMemo(() => {
    return registerSchema;
  }, []);

  const form = useForm<registerBodyType>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const errors = form.formState.errors;

  async function onSubmit(data: registerBodyType) {
    const { status } = await axios.post("/api/user/register", data);

    const toastContent = handleUserCreationResponse(status);

    toast({
      variant: toastContent.variant,
      title: toastContent.title,
      description: toastContent.description,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              {!errors["username"] && (
                <FormDescription>This is your Public Username.</FormDescription>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="acme@example.com" {...field} />
              </FormControl>
              {!errors["email"] && (
                <FormDescription>
                  This is your public Email Address.
                </FormDescription>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              {!errors["password"] && (
                <FormDescription>
                  Please make sure that your password is secure.
                </FormDescription>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
        <Button size={"sm"} className="w-full mt-4" disabled={loading}>
          Submit
        </Button>
        <Separator />
        <OAuthButtons />
      </form>
    </Form>
  );
}
