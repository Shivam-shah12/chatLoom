"use client"

import { useEffect, useState } from "react";
import {
    QueryClient,
    QueryClientProvider
  } from "@tanstack/react-query";

export const QueryProvider = ({children} : {children : React.ReactNode;}) => {
    const [isMounted,setIsMounted]=useState(false);

    const [queryClient] = useState(() => new QueryClient());

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted)
        return null;

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}