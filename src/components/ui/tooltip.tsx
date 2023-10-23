"use client";

import {
  Tooltip as UiTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/ui-tooltip";

interface TooltipProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export function Tooltip({ align, children, label, side }: TooltipProps) {
  return (
    <TooltipProvider>
      <UiTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className="bg-white text-black dark:bg-zinc-900 dark:text-white"
        >
          <p className="font-semibold text text-sm ">{label}</p>
        </TooltipContent>
      </UiTooltip>
    </TooltipProvider>
  );
}
