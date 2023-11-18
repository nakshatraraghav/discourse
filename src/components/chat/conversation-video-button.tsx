"use client";

import qs from "query-string";
import { VideoIcon, VideoOffIcon } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Tooltip } from "../ui/tooltip";

export function ConversationVideoButton() {
  const router = useRouter();

  const path = usePathname();
  const searchParams = useSearchParams();

  const audio = searchParams;

  const video = searchParams.get("video");

  function click() {
    const url = qs.stringifyUrl(
      {
        url: path || "",
        query: {
          video: video ? null : true,
        },
      },
      { skipNull: true }
    );

    router.push(url);
  }

  let Icon;
  let tooltipLabel;

  if (video) {
    Icon = VideoOffIcon;
    tooltipLabel = "End Video Call";
  } else {
    Icon = VideoIcon;
    tooltipLabel = "Start Video Call";
  }

  return (
    <Tooltip label={tooltipLabel} side="bottom">
      <button onClick={click} className="">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />{" "}
      </button>
    </Tooltip>
  );
}
