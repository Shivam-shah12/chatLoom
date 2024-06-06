import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
const handleAuth=()=>{
    const userId=auth();
    if(!userId)
        throw new Error("Unauthorized");
    return {userId:userId};
}
 
// FileRouter for your app, can contain multiple FileRoutes
export  const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  serverImage: f({ image: { maxFileSize: "4MB" , maxFileCount:1} })
    // Set permissions and file types for this FileRoute
    .middleware(() => {
      // This code runs on your server before upload
        const userId=auth();
      // If you throw, the user will not be able to upload
        if(!userId)
            throw new Error("Unauthorized");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: userId };
    })
    .onUploadComplete((userId)=>{
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", userId);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    }),
    messageFile:f(["image","pdf"])
    .middleware(()=> handleAuth())
    .onUploadComplete(()=> {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;