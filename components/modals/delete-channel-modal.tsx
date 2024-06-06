"use client";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import queryString  from "query-string";
import { useModal } from "@/hooks/use-modal-store";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";


export const DeleteChannelModal = () => {
    const router=useRouter();
    const params=useParams();
    const {isOpen , onClose , type,data} = useModal()
    const isModelOpen = (isOpen && type === "deleteChannel");
    const [isLoading,setIsLoading]=useState(false);
    const {server,channel}=data;


    const handelClose = () => {
        onClose()
    }

    const onDanger=async()=>{
        try {
            setIsLoading(true);
            const url=queryString.stringifyUrl(
                {
                    url: `/api/channels/${channel?.id}`,
                    query:{
                        serverId:server?.id
                    }
                }
            )
            await axios.delete(url);
            onClose()
            router.refresh();
            setIsLoading(false);
            router.push(`/servers/${server?.id}`)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }


    return (
        <Dialog  onOpenChange={handelClose} open={isModelOpen}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-zinc-500 text-center">
                     Are You Sure, you want to do This ? <br/>
                     <span className="font-semibold text-indigo-500">#{channel?.name}</span> will be Deleted Permanently ...
                </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                   <div className="w-full flex items-center justify-between">
                     <Button disabled={isLoading} className="" onClick={onClose} variant="ghost">
                          Cancel
                     </Button>
                     <Button disabled={isLoading} className="" onClick={onDanger} variant="primary">
                          Confirm
                     </Button>
                   </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};