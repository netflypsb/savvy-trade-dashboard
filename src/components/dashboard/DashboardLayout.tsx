import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./DashboardSidebar"
import { DashboardTopbar } from "./DashboardTopbar"
import { DashboardContent } from "./DashboardContent"
import { FolderSidebar } from "./FolderSidebar"

export function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <FolderSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardTopbar />
          <DashboardContent />
        </div>
      </div>
    </SidebarProvider>
  )
}