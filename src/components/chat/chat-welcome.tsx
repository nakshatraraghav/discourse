import React from "react";

import { HashIcon } from "lucide-react";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "direct-conversation";
}

export function ChatWelcome({ name, type }: ChatWelcomeProps) {
  return (
    <React.Fragment>
      <div className="flex-1" />
      <div className="space-y-2 px-4 mb-4">
        {type === "channel" && (
          <div className="h-16 w-16 rounded-full bg-[#100e0d] flex items-center justify-center">
            <HashIcon className="h-8 w-8 text-zinc-300" />
          </div>
        )}
        <p className="font-bold">
          {type === "channel" ? "Welcome to #" : ""}
          {name}
        </p>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm font-semibold">
          {type === "channel"
            ? `This is the start of #${name} Channel`
            : `This is the start of your conversation with ${name}`}
        </p>
      </div>
    </React.Fragment>
  );
}
