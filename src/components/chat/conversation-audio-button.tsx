"use client";

import qs from "query-string";
import { Mic2Icon, MicOffIcon } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Tooltip } from "../ui/tooltip";

export function ConversationAudioButton() {
  const router = useRouter();

  const path = usePathname();
  const searchParams = useSearchParams();

  const audio = searchParams.get("audio");

  function click() {
    const url = qs.stringifyUrl(
      {
        url: path || "",
        query: {
          audio: audio ? null : true,
        },
      },
      { skipNull: true }
    );

    router.push(url);
  }

  let Icon;
  let tooltipLabel;

  if (audio) {
    Icon = MicOffIcon;
    tooltipLabel = "End Audio Call";
  } else {
    Icon = Mic2Icon;
    tooltipLabel = "Start Audio Call";
  }

  return (
    <Tooltip label={tooltipLabel} side="bottom">
      <button onClick={click} className="">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />{" "}
      </button>
    </Tooltip>
  );
}
