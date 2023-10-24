"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";

interface NavigationItemProps {
  id: string;
  image: string;
  name: string;
}

export const SidebarItem = ({ id, image, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/server/${id}`);
  };

  return (
    <Tooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-neutral-700 dark:bg-neutral-300 rounded-r-full transition-all w-[4px]",
            params?.id !== id && "group-hover:h-[25px]",
            params?.id === id ? "h-[35px]" : "h-[20px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src={image} alt="Channel" />
        </div>
      </button>
    </Tooltip>
  );
};
