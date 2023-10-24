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
    <UiAvatar>
      <AvatarImage src={image} alt="avatar" />
      <AvatarFallback className="text-sm">User</AvatarFallback>
    </UiAvatar>
  );
}
