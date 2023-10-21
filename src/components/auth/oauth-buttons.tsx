"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function OAuthButtons() {
  const [loading, setLoading] = useState({
    discord: false,
    google: false,
  });

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
