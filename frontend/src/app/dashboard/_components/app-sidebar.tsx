"use client"

import * as React from "react"

import { NavMain } from "@/app/dashboard/_components/nav-main"
import { NavProjects } from "@/app/dashboard/_components/nav-projects"
import { NavUser } from "@/app/dashboard/_components/nav-user"
import { TeamSwitcher } from "@/app/dashboard/_components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, AudioLinesIcon, TerminalIcon, TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, FrameIcon, PieChartIcon, MapIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAppSelector } from "@/store/store"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: (
        <TerminalSquareIcon
        />
      ),
      isActive: true,
    },
    {
      title: "Feeds",
      url: "/dashboard/feed",
      icon: (
        <BotIcon
        />
      ),
    },
    {
      title: "Contribute",
      url: "/dashboard/contribute",
      icon: (
        <BookOpenIcon
        />
      ),
    }
  ],
  // projects: [
  //   {
  //     name: "Account Settings",
  //     url: "/dashboard/account",
  //     icon: (
  //       <Settings2Icon
  //       />
  //     ),
  //   }
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamically filter sidebar items based on role authorization after mounting
  const filteredNavMain = !mounted
    ? data.navMain
    : data.navMain.filter((item) => {
        if (item.title === "Contribute" && (user?.role as string) === "FRESHER") {
          return false;
        }
        return true;
      });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/" className="flex gap-0.5" />}
              className="data-[slot=sidebar-menu-button]:p-1.5! hover:bg-transparent"
            >
              <Image src={"https://res.cloudinary.com/drfodwc7q/image/upload/v1779172977/Orange_Blue_Modern_Professional_Letter_I_Business_Logo-removebg-preview_egwy4g.png"} alt='insightU_logo' width={100} height={100} className="h-7 w-7 object-contain object-center bg-white rounded" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-2xl">InsightU</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
