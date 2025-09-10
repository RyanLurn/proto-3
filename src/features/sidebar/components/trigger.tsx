"use client";

import { PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";

function AppSidebarTrigger({ className }: { className?: string }) {
  const { open, toggleSidebar } = useSidebar();

  if (open) {
    return null;
  }

  return (
    <div className={className}>
      <Button onClick={toggleSidebar} variant="outline" size="icon">
        <PanelLeftOpen className="size-5" />
      </Button>
    </div>
  );
}

export { AppSidebarTrigger };
