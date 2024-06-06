import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";


export async function DELETE(
    req:Request,
    {params}:{params:{channelId:string}}
){
    try {

        const profile=await currentProfile();
        const {searchParams}=new URL(req.url);
        const serverId=searchParams.get("serverId")
        if(!profile)
            return new NextResponse("UNAUTHORISED",{status:404});
        if(!serverId)
            return new NextResponse("UNAUTHORISED",{status:404});
        if(!params.channelId)
            return new NextResponse("UNAUTHORISED",{status:404});

        const server=await db.server.update({
            where:{
                id:serverId,
                members:{
                    some:{
                        profileId:profile.id,
                        role:{
                            in:[MemberRole.ADMIN,MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data:{
                channels:{
                    delete:{
                        id:params?.channelId,
                        name:{
                            not:"general"
                        }
                    }
                }
            }
        })

    return NextResponse.json(server);
        
    } catch (error) {
        console.log(error)
        return new NextResponse("ERROR IN CHANNEL DELETIONS",{status:505});
    }

}

export async function PATCH(
    req:Request,
    {params}:{params:{channelId:string}}
){
    try {

        const profile=await currentProfile();
        const {name,type}=await req.json();
        const {searchParams}=new URL(req.url);
        const serverId=searchParams.get("serverId")
        if(!profile)
            return new NextResponse("UNAUTHORISED",{status:404});
        if(!serverId)
            return new NextResponse("UNAUTHORISED",{status:404});
        if(!params.channelId)
            return new NextResponse("UNAUTHORISED",{status:404});

        const server=await db.server.update({
            where:{
                id:serverId,
                members:{
                    some:{
                        profileId:profile.id,
                        role:{
                            in:[MemberRole.ADMIN,MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data:{
                channels:{
                    update:{
                        where:{
                            id:params?.channelId,
                            name:{
                                not:"general"
                            },
                        },
                        data:{
                        name,
                        type
                        }   
                    }
                }
            }
        })

    return NextResponse.json(server);
        
    } catch (error) {
        console.log(error)
        return new NextResponse("ERROR IN CHANNEL EDIT",{status:505});
    }

}