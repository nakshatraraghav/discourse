import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerSection } from "./server-section";

import { Channel, MemberRole } from "@prisma/client";
import { ServerWithMembersWithUser } from "../../../../../types";
import { ServerChannel } from "./server-channel";
import { Separator } from "@/components/ui/separator";
import { ServerMember } from "./server-member";

interface ServerMembersChannelsProps {
  role: MemberRole;
  server: ServerWithMembersWithUser;
  channels: {
    text: Channel[];
    audio: Channel[];
    video: Channel[];
  };
}

export function ServerMembersChannels({
  role,
  server,
  channels,
}: ServerMembersChannelsProps) {
  const { text, audio, video } = channels;

  return (
    <ScrollArea>
      {text.length > 0 && (
        <ServerSection
          label="Text Channels"
          sectionType="channels"
          role={role}
          server={server}
        />
      )}
      {text.map((channel) => {
        return (
          <ServerChannel key={channel.id} channel={channel} server={server} />
        );
      })}

      <Separator className="mt-2" />

      {audio.length > 0 && (
        <ServerSection
          label="Audio Channels"
          sectionType="channels"
          role={role}
          server={server}
        />
      )}
      {audio.map((channel) => {
        return (
          <ServerChannel key={channel.id} channel={channel} server={server} />
        );
      })}

      <Separator className="mt-2" />

      {video.length > 0 && (
        <ServerSection
          label="Video Channels"
          sectionType="channels"
          role={role}
          server={server}
        />
      )}
      {video.map((channel) => {
        return (
          <ServerChannel key={channel.id} channel={channel} server={server} />
        );
      })}

      <Separator className="mt-2" />

      <ServerSection
        label="Members"
        sectionType="members"
        role={role}
        server={server}
      />
      {server.members.map((member) => {
        return <ServerMember member={member} key={member.id} server={server} />;
      })}
    </ScrollArea>
  );
}
