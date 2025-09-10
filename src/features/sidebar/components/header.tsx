import { AppWindow, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarHeader } from "@/components/ui/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";

function AppSidebarHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarHeader>
      <div className="ml-2 flex items-center gap-x-2">
        <AppWindow className="size-5" />
        <span>My App</span>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto cursor-pointer"
          onClick={toggleSidebar}
        >
          <PanelLeftClose className="size-5" />
        </Button>
      </div>
    </SidebarHeader>
  );
}

export { AppSidebarHeader };
