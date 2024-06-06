import { NextApiRequest } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";




export const currentProfilePages=async(req:NextApiRequest)=>{
     const {userId}=getAuth(req);
     
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