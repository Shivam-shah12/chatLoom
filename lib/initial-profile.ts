import { currentUser,auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db";

export const InitialProfile=async()=>{
     const user= await currentUser();
    
     // check User is signIn or not
     if(!user)
        return auth().redirectToSignIn();

   //   console.log("userId = ",user.id)
     // Try to find profile
     const profile = await db.profile.findUnique({
        where:{
            userId : user.id
        }
     });
       
   //   console.log("profile" ,  profile)
     // if profile is available in db , so give it to website
     if(profile){
        return profile;
     }

     // else profile was not created in db , so created it...
     const newProfile=await db.profile.create({
        data:{
            userId:user.id,
            name:`${user.firstName} ${user.lastName}`,
            email:user.emailAddresses[0].emailAddress,
            imageUrl:user.imageUrl
        }
     })

     return newProfile;
}