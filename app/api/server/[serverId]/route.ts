import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";


export async function DELETE(
    req:Request,
    {params}:{params:{serverId:string}}
){
     try {
        const profile=await currentProfile();
      

        if(!profile)
            return new NextResponse("UNAUTHORISED",{status:401});

        const server=await db.server.delete({
            where:{
                id:params.serverId,
                profileId:profile.id
            }
        })
        
        return NextResponse.json(server);
        
     } catch (error) {
        console.log("[SERVER ERROR]",error);
        return new NextResponse("Error",{status:501}); 
     }
}

export async function PATCH(
    req:Request,
    {params}:{params:{serverId:string}}
){
     try {
        const profile=await currentProfile();
        const {name,imageUrl}=await req.json();
        

        if(!profile)
            return new NextResponse("UNAUTHORISED",{status:401});

        const server=await db.server.update({
            where:{
                id:params.serverId,
                profileId:profile.id
            },
            data:{
                name:name,
                imageUrl:imageUrl
            }
        })
        // console.log("server = ",server)
        return NextResponse.json(server);
        
     } catch (error) {
        console.log("[SERVER ERROR]",error);
        return new NextResponse("Error",{status:501}); 
     }
}


























