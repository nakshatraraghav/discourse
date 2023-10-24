"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

import { SunIcon, MoonIcon, LaptopIcon } from "@radix-ui/react-icons";

interface ProfileDropdownProps {
  children: React.ReactNode;
}

export function ProfileDropdown({ children }: ProfileDropdownProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const { setTheme } = useTheme();

  if (!session) {
    router.push("/login");
  }

  // TODO: Profile and Settings Page

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push(`/profile/${session?.user.username}`)}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings")}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Theme Mode</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-32">
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <div className="flex w-full justify-between items-center">
                    Dark
                    <MoonIcon />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <div className="flex w-full justify-between items-center">
                    Light
                    <SunIcon />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <div className="flex w-full justify-between items-center">
                    System
                    <LaptopIcon />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
