"use client";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Home,
  LayoutDashboard,
  LogIn,
  Settings,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { FiSidebar } from "react-icons/fi";
type NavItem = {
  title: string;
  url: string;
  icon: React.ReactNode;
};

const NAV_MAIN: NavItem[] = [
  { title: "Dashboard", url: "/dashboard/overview", icon: <LayoutDashboard /> },

  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: <ShoppingBag />,
  },
  {
    title: "Menu Management",
    url: "/dashboard/menu-management",
    icon: <Utensils />,
  },

  {
    title: "Calendar View",
    url: "/dashboard/calendar-view",
    icon: <Calendar />,
  },

  {
    title: "FAQ",
    url: "/dashboard/faq",
    icon: <Settings />,
  },
];

function SidebarNavItem({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        className="text-sm text-gray-200"
        asChild
        isActive={active}
      >
        <Link className="p-6 my-1 flex items-center relative" href={item.url}>
          {active && (
            <span className="w-2 h-full bg-neutral-300 rounded-l absolute left-0 top-0"></span>
          )}

          <span className="mr-2 ">{item.icon}</span>

          <span className="">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  // const dispatch = useAppDispatch();

  // const handleLogout = React.useCallback(() => {
  //   dispatch(logout());
  // }, [dispatch]);

  return (
    <Sidebar {...props} className="text-white flex flex-col z-50 fixed">
      <div
        className="flex items-center gap-2 cursor-pointer absolute -right-[34px] top-5 w-fit rounded-full"
        onClick={toggleSidebar}
      >
        <FiSidebar className="text-black w-10 hover:text-gray-600 transition-colors rounded-full" />
      </div>

      <SidebarHeader className="text-white relative mt-3 px-3">
        <div className="flex justify-center items-center">
          <Image
            src="/logo/logo-2.png"
            alt="logo"
            blurDataURL="/logo/logo-2.png"
            className=" rounded-md   w-44 object-contain "
            width={100}
            height={100}
          />
        </div>
      </SidebarHeader>
      <div className="border-b border-neutral-300/50"></div>

      <div className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_MAIN.map((item) => (
                <SidebarNavItem
                  key={item.title}
                  item={item}
                  active={pathname === item.url}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>

      <div className="mt-auto p-4 border-t space-y-5 border-neutral-400/50">
        <Button
          onClick={() => router.push("/")}
          className="bg-[#3F604F] hover:bg-neutral-700/50 py-6 w-full rounded-lg text-lg text-white"
        >
          <Home className=" h-6 w-6 -mr-1" />
          Go Home
        </Button>
        <Button
          // onClick={handleLogout}
          className="bg-[#3F604F] hover:bg-neutral-700/50 py-6 w-full rounded-lg text-lg text-white"
        >
          <LogIn className=" h-6 w-6 -mr-1" />
          Logout
        </Button>
      </div>

      <SidebarRail />
    </Sidebar>
  );
}
