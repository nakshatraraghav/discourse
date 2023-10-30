import {
  Avatar as UiAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { classNames } from "uploadthing/client";

interface AvatarProps {
  image?: string;
  className?: ClassValue;
}

export function Avatar({ image, className }: AvatarProps) {
  return (
    <UiAvatar
      className={cn(
        "w-[48px] h-[48px] mb-6 hover:opacity-90 hover:rounded-2xl transition-all duration-150",
        className
      )}
    >
      <AvatarImage src={image} alt="avatar" />
      <AvatarFallback className="text-sm">User</AvatarFallback>
    </UiAvatar>
  );
}
