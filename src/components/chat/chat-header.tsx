import { Hash } from "lucide-react";
import { MobileTogggle } from "@/components/mobile-toggle/mobile-toggle";
import { Avatar } from "../avatar/avatar";

interface ChatHeaderProps {
  type: "channel" | "conversation";
  serverId: string;
  name: string;
  image?: string;
}

export function ChatHeader({ name, serverId, type, image }: ChatHeaderProps) {
  return (
    <div className="flex items-center w-full h-14 bg-[#100e0d] p-4 border-b-[2px] border-b-neutral-800">
      <div className="md:hidden">
        <MobileTogggle serverId={serverId} />
      </div>
      <div className="flex items-center mb-1 space-x-1">
        {type === "channel" ? (
          <Hash size={18} className="ml-3" />
        ) : (
          <div className="flex items-center justify-center">
            <Avatar image={image} className="h-7 w-7 mt-6 mr-2" />
          </div>
        )}
        <div className="font-semibold text-sm">{name}</div>
      </div>
    </div>
  );
}
