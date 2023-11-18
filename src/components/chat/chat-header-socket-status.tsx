"use client";

import { useSocketStore } from "@/store/socket-status";

import { Badge } from "@/components/ui/badge";

export function ChatHeaderSocketStatus() {
  const { status } = useSocketStore();

  return (
    <div className="ml-auto text-xs font-semibold text-zinc-300">
      {status === "initial" && <Badge>Socket: Initializing...</Badge>}
      {status === "connected" && (
        <Badge className="bg-green-700 hover:bg-green-800 text-xs font-semibold text-zinc-300">
          Socket: Connected
        </Badge>
      )}
      {status === "disconnected" && (
        <Badge className="bg-red-600 hover:bg-red-700 text-xs font-semibold text-zinc-300">
          Socket: Disconnected
        </Badge>
      )}
      {status === "failure" && (
        <Badge className="bg-yellow-600 hover:bg-red-700 text-xs font-semibold text-white">
          Socket: Switching To Long Polling
        </Badge>
      )}
    </div>
  );
  1;
}
