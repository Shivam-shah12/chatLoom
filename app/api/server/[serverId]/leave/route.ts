import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function PATCH(
    req:Request,
    {params}:{params:{serverId:string}}
){
   try {

    const profile=await currentProfile();
    if(!profile)
        return new NextResponse("UNAUTHOURIZED ACCESS",{status:404});

    if(!params.serverId)
        return new NextResponse("UNAUTHOURIZED ACCESS",{status:404});

    const server=await db.server.update({
        where:{
            id:params.serverId,
            profileId:{
                not:profile.id,
            },
            members:{
                some:{
                    profileId:profile.id
                }
            }
        },
        data:{
            members:{
                deleteMany:{
                    profileId:profile.id
                }
            }
        }
    });

    return NextResponse.json(server);
    
   } catch (error) {
     console.log(error)
     return new NextResponse("ERROR IN LEAVE SERVER",{status:505});
   }    
}





















