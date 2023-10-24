import {
  Avatar as UiAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface AvatarProps {
  image?: string;
}

export function Avatar({ image }: AvatarProps) {
  return (
    <UiAvatar className="w-[48px] h-[48px] mb-6 hover:opacity-90 hover:rounded-2xl transition-all duration-150">
      <AvatarImage src={image} alt="avatar" />
      <AvatarFallback className="text-sm">User</AvatarFallback>
    </UiAvatar>
  );
}
