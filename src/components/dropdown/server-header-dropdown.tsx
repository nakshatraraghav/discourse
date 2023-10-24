"use client";

import React, { useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MemberRole } from "@prisma/client";

import {
  PersonIcon,
  GearIcon,
  AvatarIcon,
  PlusIcon,
  ExitIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

interface SidebarHeaderDropdownProps {
  children: React.ReactNode;
  role: MemberRole;
}

export function SidebarDropdown({
  children,
  role,
}: SidebarHeaderDropdownProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const admin = role === MemberRole.ADMIN;
  const moderator = admin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 space-y-1"
        align="center"
        side="bottom"
      >
        <DropdownMenuLabel>Server Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {moderator && (
          <DropdownMenuItem className="text-blue-500">
            <div className="flex w-full justify-between items-center">
              Invite People
              <PersonIcon />
            </div>
          </DropdownMenuItem>
        )}
        {admin && (
          <DropdownMenuItem>
            <div className="flex w-full justify-between items-center">
              Server Settings
              <GearIcon />
            </div>
          </DropdownMenuItem>
        )}
        {moderator && (
          <DropdownMenuItem>
            <div className="flex w-full justify-between items-center">
              Manage Members
              <AvatarIcon />
            </div>
          </DropdownMenuItem>
        )}
        {moderator && (
          <React.Fragment>
            <DropdownMenuItem>
              <div className="flex w-full justify-between items-center">
                Create Channel
                <PlusIcon />
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </React.Fragment>
        )}
        {admin ? (
          <DropdownMenuItem>
            <div className="flex w-full justify-between items-center text-red-500">
              Delete Server
              <TrashIcon />
            </div>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <div className="flex w-full justify-between items-center text-red-500">
              Leave Server
              <ExitIcon />
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
