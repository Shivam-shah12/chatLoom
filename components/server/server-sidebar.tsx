import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
// import { ServerChannels } from "./server-channel";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSideBarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};
const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 e-4 mr-2 text-red-500" />,
};

export const ServerSidebar = async ({ serverId }: ServerSideBarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );
  const role = server?.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  if (!server) {
    return redirect("/");
  }
  // console.log("server" , server);

  return (
    <div className="flex flex-col  h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea> 
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannel?.map((channels) => ({
                  id: channels.id,
                  name: channels.name,
                  icon: iconMap[channels.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannel?.map((channels) => ({
                  id: channels.id,
                  name: channels.name,
                  icon: iconMap[channels.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannel?.map((channels) => ({
                  id: channels.id,
                  name: channels.name,
                  icon: iconMap[channels.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

        {/* Text Channels */}
        {!!textChannel?.length && ( 
          <div className="mb-3 px-3 space-x-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />

            {textChannel?.map((channels) => (
              <ServerChannel
                key={channels.id}
                channel={channels}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}

        {/* Audio Channels */}
        {!!audioChannel?.length && (
          <div className="mb-3 px-3 space-y-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />

            {audioChannel?.map((channels) => (
              <ServerChannel
                key={channels.id}
                channel={channels}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}

        {/* Video Channels */}
        {!!videoChannel?.length && (
          <div className="mb-3 px-3 space-y-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />

            {videoChannel?.map((channels) => (
              <ServerChannel
                key={channels.id}
                channel={channels}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}

        {/* Members */}
        {!!members?.length && (
          <div className="mb-2 px-3">
            <ServerSection
              sectionType="members"
              channelType={ChannelType.TEXT}
              role={role}
              label="Members"
              server={server}
            />

            {members?.map((member) => (
              <ServerMember member={member} server={server} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};