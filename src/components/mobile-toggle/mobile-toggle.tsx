import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ServerNavigation } from "../server/sidebar/main-sidebar/server-navigation";
import { ServerSidebar } from "../server/sidebar/server-sidebar/server-sidebar";
import { Menu } from "lucide-react";

export function MobileTogggle({ serverId }: { serverId: string }) {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="flex p-0 pr-12 gap-0 bg-[#0c0a09]">
        <div className="w-[72px]">
          <ServerNavigation />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
}
