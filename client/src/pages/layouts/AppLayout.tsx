import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar"
import type {ReactNode} from "react";

export default function DefaultLayout({children}: { children: ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarTrigger/>
      <div className="flex-1 p-2">
        <div className="">{children}</div>
      </div>
    </SidebarProvider>
  )
}