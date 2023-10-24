"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { Tooltip } from "../ui/tooltip";

interface SidebarItemProps {
  id: string;
  name: string;
  image: string;
}

export function SidebarItem({ id, name, image }: SidebarItemProps) {
  const params = useParams();
  const router = useRouter();

  return (
    <Tooltip side="right" align="center" label={name}>
      <button
        className=" hover:opacity-90 transition-all duration-150 group relative flex items-center"
        onClick={() => router.push(`/server/${id}`)}
      >
        <div
          className={cn(
            "absolute left-0 top-[5px] bg-primary rounded-r-full transition-all w-[4px]",
            params?.id !== id && "group-hover:h-[20px]",
            params?.id === id ? "h-[30px]" : "h-[80px]"
          )}
        />
        <div
          className={cn(
            "relative group border-2 border-neutral-600 flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={image} alt="Channel" className="" />
        </div>
      </button>
    </Tooltip>
  );
}
