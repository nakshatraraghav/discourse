import { Hash } from "lucide-react";
import { MobileTogggle } from "@/components/mobile-toggle/mobile-toggle";

interface ChatHeaderProps {
  type: "channel" | "conversation";
  serverId: string;
  name: string;
  image?: string;
}

export function ChatHeader({ name, serverId, type, image }: ChatHeaderProps) {
  return (
    <div className="flex items-center w-full h-14 bg-[#100e0d] p-4">
      <div className="md:hidden">
        <MobileTogggle serverId={serverId} />
      </div>
      {type === "channel" && (
        <div className="flex items-center space-x-1">
          <Hash size={15} />
          <div>{name}</div>
        </div>
      )}
    </div>
  );
}
