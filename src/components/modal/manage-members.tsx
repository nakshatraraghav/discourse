"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/modal";

import { MemberRole } from "@prisma/client";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

import { Avatar } from "@/components/avatar/avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";

import {
  PersonIcon,
  LockClosedIcon,
  LockOpen2Icon,
  CircleBackslashIcon,
  ExitIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";

export function ManageMembersModal() {
  const {
    open,
    onClose,
    onOpen,
    type,
    data: { server },
  } = useModalStore();

  const router = useRouter();

  const { toast } = useToast();

  const opened = type === "manage-members" && open;

  const [loadingId, setLoadingId] = useState<string>("");

  const members = server?.members;

  const membersCount = members?.length;

  async function changeUserRole(userId: string, role: MemberRole) {
    try {
      setLoadingId(userId);

      const response = await axios.patch(`/api/members/${userId}`, {
        serverId: server?.id,
        newRole: role,
      });

      router.refresh();

      toast({
        title: "Role Updated",
      });

      onOpen("manage-members", { server: response.data });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: "An error has occured",
      });
      console.log(error);
    } finally {
      setLoadingId("");
    }
  }

  async function kickUser(userId: string) {
    try {
      setLoadingId(userId);
      const response = await axios.delete(`/api/members/${userId}`, {
        data: {
          serverId: server!.id,
        },
      });

      toast({
        title: "User kicked from server",
      });

      router.refresh();

      onOpen("manage-members", { server: response.data });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: "An error has occured",
      });

      console.log(error);
    } finally {
      setLoadingId("");
    }
  }

  return (
    <Dialog open={opened} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Server Members</DialogTitle>
          <DialogDescription>
            {membersCount} {membersCount === 1 ? "Member" : "Members"}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {members?.map((member) => (
            <div key={member.id} className="flex gap-x-3 mb-6">
              <Avatar
                className="h-[38px] w-[38px]"
                image={member.user.image ?? ""}
              />
              <div className="flex flex-col gap-y-1 mt-[2px]">
                <div className="text-xs font-semibold flex items-center gap-x-4">
                  {member.user.username}
                  {member.role === "ADMIN" && <LockClosedIcon />}
                  {member.role === "MODERATOR" && <LockOpen2Icon />}
                  {member.role === "GUEST" && <PersonIcon />}
                </div>
                <p className="text-xs text-zinc-500">{member.user.email}</p>
              </div>
              <div className="ml-auto">
                {member.role !== "ADMIN" && loadingId !== member.id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button size={"icon"} variant={"outline"}>
                        <DotsHorizontalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="space-y-1"
                      side="right"
                      align="start"
                    >
                      <DropdownMenuLabel>Member Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          Change Role
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            {member.role == "MODERATOR" && (
                              <DropdownMenuItem
                                className="text-red-500"
                                onClick={() =>
                                  changeUserRole(member.id, "GUEST")
                                }
                              >
                                <div className="flex w-full justify-between items-center">
                                  Guest
                                  <PersonIcon />
                                </div>
                              </DropdownMenuItem>
                            )}
                            {member.role == "GUEST" && (
                              <DropdownMenuItem
                                className="text-blue-500"
                                onClick={() =>
                                  changeUserRole(member.id, "MODERATOR")
                                }
                              >
                                <div className="flex w-full justify-between items-center">
                                  Moderator
                                  <LockOpen2Icon />
                                </div>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuItem onClick={() => kickUser(member.id)}>
                        <div className="flex w-full justify-between items-center text-red-500">
                          Kick User
                          <ExitIcon />
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                {loadingId === member.id && (
                  <CircleBackslashIcon className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
