import { AppSidebar } from "@/app/dashboard/_components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import SiteHeader from "./_components/site-header";
import { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* <div className="@container/main flex flex-1 flex-col">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 flex-1"> */}
                    {children}
                    {/* </div>
                    </div> */}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}


export default DashboardLayout;