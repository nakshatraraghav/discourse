"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

import {
  loginSchema,
  type loginBodyType,
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
import { OAuthButtons } from "../oauth-buttons";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const schema = useMemo(() => {
    return loginSchema;
  }, []);

  const { toast } = useToast();

  const form = useForm<loginBodyType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const errors = form.formState.errors;

  async function onSubmit(data: loginBodyType) {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (!response?.ok) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      return;
    }

    toast({
      title: "Authentication Successfull.",
      description: "You have successfully logged in.",
    });

    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
        <Button
          type="submit"
          size={"sm"}
          className="w-full mt-4"
          disabled={loading}
        >
          Submit
        </Button>
        <Separator />
        <OAuthButtons />
      </form>
    </Form>
  );
}
