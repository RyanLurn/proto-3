"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { AppSidebarHeader } from "@/features/sidebar/components/header";

function AppSidebar() {
  return (
    <Sidebar>
      <AppSidebarHeader />
      <SidebarContent>Empty</SidebarContent>
    </Sidebar>
  );
}

export { AppSidebar };
