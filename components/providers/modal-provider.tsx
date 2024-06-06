"use client"
import { useEffect ,useState } from "react";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useModal } from "@/hooks/use-modal-store";
import { InviteServerModal } from "@/components/modals/invite-code";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { LeaveServerModal } from "@/components/modals/leave-server-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
import { EditChannelModal } from "@/components/modals/edit-channel-modal";

import { MessageFileModel } from "@/components/modals/message-file-modal";
import { DeleteServerModal } from "@/components/modals/delete-server-modal";
import { DeleteMessageModal } from "@/components/modals/delete-message-modal";


export const ModalProvider=()=>{
     const [isMounted,setIsMounted]=useState(false);
   //   const {isOpen,type}=useModal();

     useEffect(()=>{
        setIsMounted(true);
     },[]);

     if(!isMounted)
        return null;

     return (
      <>
        <CreateServerModal/>
        <InviteServerModal/>
        <EditServerModal/>
        <MembersModal/>
        <LeaveServerModal/>
        <CreateChannelModal/>
        <EditChannelModal/>
        <MessageFileModel/>
        <DeleteChannelModal/>
        <DeleteServerModal/>  
        <DeleteMessageModal/>      
        </>
     )

}













