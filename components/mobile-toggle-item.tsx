import { Menu } from "lucide-react";
import { NavigationSidebar } from "./navigation/navigation-sidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

export const MobileToggleItems = () => {
  return (  
    // <Sheet>
    //     <SheetTrigger asChild>
    //         <Button variant={"ghost"} size="icon" className="md:hidden">   
    //             <Menu />
    //         </Button>
    //     </SheetTrigger>
    //     <SheetContent side="left" className="p-0 flex gap-0">
    //         <div className="w-[72px]">
    //             <NavigationSidebar />
    //         </div>
    //         {/* <ServerSidebar serverId={serverId} /> */}
    //     </SheetContent>
    // </Sheet>

    <Drawer>
      <DrawerTrigger asChild>
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
