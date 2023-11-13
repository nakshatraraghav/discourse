"use client";

import { useParams, useRouter } from "next/navigation";

import { Member, MemberRole, User } from "@prisma/client";
import { ServerWithMembersWithUser } from "../../../../../types";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Crown } from "lucide-react";
import { LockClosedIcon, LockOpen2Icon } from "@radix-ui/react-icons";

interface ServerMemberProps {
  member: Member & {
    user: User;
  };
  server: ServerWithMembersWithUser;
  role?: MemberRole;
}

const iconMap = {
  [MemberRole.ADMIN]: Crown,
  [MemberRole.MODERATOR]: LockClosedIcon,
  [MemberRole.GUEST]: LockOpen2Icon,
};

export function ServerMember({ member, server, role }: ServerMemberProps) {
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[member.role];

  function onClick() {
    router.push(`/server/${params?.id}/conversation/${member.id}`);
  }

  return (
    <Button
      onClick={onClick}
      variant={"ghost"}
      size={"sm"}
      className="group rounded-md gap-x-2 w-full mb-1 truncate"
    >
      <div className="w-full flex items-center space-x-1">
        <Icon
          className={cn(
            "text-zinc-500 group-hover:text-zinc-300",
            params.memberId === member.id && "text-white"
          )}
          size={15}
        />
        <p
          className={cn(
            "font-semibold truncate pr-4 text-[13px] text-zinc-500 group-hover:text-neutral-300",
            params.memberId === member.id && "text-white"
          )}
        >
          {member.user.username}
        </p>
      </div>
    </Button>
  );
}
