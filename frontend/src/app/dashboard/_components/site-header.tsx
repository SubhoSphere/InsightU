"use client"

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const SiteHeader = () => {

    const pathname = usePathname()

    const segments = pathname.split('/')
    const lastSegment = segments[segments.length - 1]

    // Custom title mappings for specific routes
    const customTitles: Record<string, string> = {
        'dashboard': 'Overview',
        'feed': 'Campus Intelligence Feed',
        'contribute': 'Contribute Intelligence',
        'profile': 'Operator Profile',
        'account': 'Account Settings',
    }

    const title = customTitles[lastSegment] || lastSegment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                />
                <h1 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h1>
                <div className="ml-auto flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}

export default SiteHeader;
