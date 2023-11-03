"use client";

import React, { useEffect, useState } from "react";

import {
  CrownIcon,
  HashIcon,
  MicIcon,
  Search,
  ShieldAlertIcon,
  ShieldCheckIcon,
  VideoIcon,
} from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { Channel, ChannelType, Member, MemberRole, User } from "@prisma/client";
import { PersonIcon, LockClosedIcon } from "@radix-ui/react-icons";

interface ServerSearchProps {
  channels: {
    text: Channel[];
    audio: Channel[];
    video: Channel[];
  };
  members: (Member & { user: User })[];
}

const channelIconMap = {
  [ChannelType.TEXT]: <HashIcon className="h-1 w-1" />,
  [ChannelType.AUDIO]: <MicIcon className="h-1 w-1" />,
  [ChannelType.VIDEO]: <VideoIcon className="h-1 w-1" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: <PersonIcon />,
  [MemberRole.MODERATOR]: <LockClosedIcon className="text-indigo-500" />,
  [MemberRole.ADMIN]: <CrownIcon className="text-amber-400" />,
};

export function ServerSearch({ channels, members }: ServerSearchProps) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const down = (ev: KeyboardEvent) => {
      if (ev.key === "k" && (ev.metaKey || ev.ctrlKey)) {
        ev.preventDefault();
        setOpen((value) => !value);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  });

  return (
    <React.Fragment>
      <button
        className="flex items-center p-2 py-4 rounded-md gap-x-2 group hover:bg-[#141313] text-zinc-500"
        onClick={() => {
          setOpen((value) => !value);
        }}
      >
        <Search className="h-3 w-3" />
        <div className="w-full flex items-center font-semibold text-[14px]">
          <p>Search</p>
          <kbd></kbd>
          <kbd className="ml-auto mr-3 text-[12px] bg-[#232222] py-[3px] px-2 rounded-md">
            ⌘ K
          </kbd>
        </div>
      </button>
      {open ? (
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search all Channels and Members" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Text Channels">
              {channels.text.map((channel) => (
                <CommandItem key={channel.id}>
                  <div className="flex items-center gap-x-2">
                    {channelIconMap["TEXT"]}
                    {channel.name}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            {channels.audio.length !== 0 && (
              <CommandGroup heading="Audio Channels">
                {channels.audio.map((channel) => (
                  <CommandItem key={channel.id}>
                    <div className="flex items-center gap-x-2">
                      {channelIconMap["AUDIO"]}
                      {channel.name}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {channels.video.length !== 0 && (
              <CommandGroup heading="Video Channels">
                {channels.video.map((channel) => (
                  <CommandItem key={channel.id}>
                    <div className="flex items-center gap-x-2">
                      {channelIconMap["VIDEO"]}
                      {channel.name}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandGroup heading="Members">
              {members.map((member) => (
                <CommandItem key={member.id}>
                  <div className="flex items-center gap-x-2">
                    {roleIconMap[member.role]}
                    {member.user.name}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      ) : null}
    </React.Fragment>
  );
}
