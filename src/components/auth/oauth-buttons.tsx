"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function OAuthButtons() {
  const [loading, setLoading] = useState({
    discord: false,
    google: false,
  });

  const { toast } = useToast();

  async function handleOAuth(provider: "discord" | "google") {
    if (provider === "google") {
      setLoading({
        google: true,
        discord: false,
      });
    } else {
      setLoading({
        google: false,
        discord: true,
      });
    }
    const response = await signIn(provider);

    if (!response?.ok) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  return (
    <div className="flex justify-between items-center space-x-2">
      <Button
        type="button"
        className="w-full"
        size={"sm"}
        disabled={loading.google}
      >
        Google
      </Button>
      <Button
        type="button"
        className="w-full"
        size={"sm"}
        disabled={loading.discord}
      >
        Discord
      </Button>
    </div>
  );
}
