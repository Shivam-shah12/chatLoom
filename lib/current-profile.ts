import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";



export const currentProfile=async()=>{
     const {userId}=auth();
     
     if(!userId)
        return null;

     const profile=await db.profile.findUnique({
        where:{
            userId
        }
     });

     if(!profile)
        return redirect("/sign-in");

     return profile;
}