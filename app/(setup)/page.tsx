import InitialModal from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { InitialProfile } from "@/lib/initial-profile"
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const SetupPage=async()=>{
    const profile=await InitialProfile();

    if(!profile)
      return auth().redirectToSignIn();

    const server=await db.server.findFirst({
      where:{
        members:{
          some:{
            profileId:profile.id
          }
        }
      }
    });
    // console.log("server --> ",server)
    if(server)
      return redirect(`/servers/${server.id}`);


     return (
        <div>
         <InitialModal/>
        </div>
     )
}
export default SetupPage;