"use client";
import { useOrigin } from "@/hooks/use-origin";
import { Profile, Server } from "@prisma/client";
import Image from "next/image";
import { format } from "date-fns";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
const DATE_FORMAT = "d MMM yyyy, HH:mm";
interface AvailibleServerCartProps {
  server: Server & { profile: Profile };
}
export const AvailibleServerCart = ({ server }: AvailibleServerCartProps) => {
  const origin = useOrigin();
  const date = format(new Date(server.createdAt), DATE_FORMAT);
  const router = useRouter();
  return (
    <div
      className="w-full h-fit border rounded-xl p-4 border-cyan-50 flex gap-3 flex-col "
      key={server.id}
    >
      <div className="w-full flex gap-5">
        <div className="bg-gray-200 w-[150px] h-[150px] rounded-xl object-cover">
          <Image
            src={server.imageUrl}
            alt="server image"
            width={100}
            height={100}
            className="w-[150px] h-[150px] object-cover rounded-xl"
          />
        </div>

        <div className="">
        
          {server.name == "Owner" && <Badge variant={"default"} className="bg-emerald-600 text-white border-none" >Recommended</Badge>} 
          <p className="text-zinc-100 text-xl">{server.name}  </p>
          <p className="text-zinc-400 text-xs">{date}</p>
          <button className="mt-4 py-1 px-5 bg-green-400 rounded-3xl " onClick={() => router.push(`/invite/${server.inviteCode}`)}>
            Join
          </button>
        </div>
      </div>

      <Separator />

      <div className="flex gap-4 items-center ">
        <div className="w-[50px] h[50px] rounded-full object-cover">
          <Image
            src={server.profile.imageUrl}
            alt="profile image"
            width={50}
            height={50}
            className="w-[50px] h[50px] rounded-full object-cover"
          />
        </div>
        <div>
          <p className="text-zinc-300 text-sm">
            {server.profile.name}{" "}
            <span className="text-zinc-400  text-xs">(Admin)</span>
          </p>

          <p className="text-zinc-500 text-xs">{server.profile.email}</p>
        </div>
      </div>
    </div>
  );
};
