"use client"
import { UploadDropzone  } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
// import "@uploadthing/react"
import "@uploadthing/react/styles.css"
interface FileUploadProps{
    onChange:(url?:string)=> void;
    value:String;
    endpoint:"messageFile" | "serverImage"
}

export const FileUpload=({
    onChange,value,endpoint
}:FileUploadProps)=>{

    const fileType=value?.split('.').pop();
    if(value && fileType !== 'pdf')
        {
            return (
                <div className="relative w-20 h-20">
                  <Image  fill src={value}  alt="Upload" className="rounded-full"/>
                  <button 
                   onClick={()=> onChange("")}
                   className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadom-sm" type="button"
                  >
                   <X onClick={()=> onChange("")} className="w-4 h-4"/> 
                  </button>
                        
                </div>
            )
        }

    return (
        <UploadDropzone 
          className="cursor-pointer border-zinc-500"
          endpoint={endpoint}
          onClientUploadComplete={(res)=>{
           onChange(res?.[0].url)
          }}
          onUploadError={(error:Error)=>{
            console.log(error)
          }
          }
        />
    )
}