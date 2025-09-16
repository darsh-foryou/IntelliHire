"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarOptions } from "@/services/Constants";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function AppSideBar() {
  const pathname = usePathname(); // 👈 current route
  const router = useRouter();

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader>
        <div className="flex justify-center items-center py-4">
          <Image
            src="/logo.png"
            alt="IntelliHire Logo"
            width={120}
            height={40}
            className="rounded-lg shadow-md object-contain"
          />
        </div>
        <Button
          onClick={() => router.push("/dashboard/create-interviews")}
          className="w-full mt-2 flex items-center justify-center gap-x-2 rounded-md shadow-sm text-sm font-medium bg-sky-400 text-white hover:bg-sky-500 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          Create New Interview
        </Button>
      </SidebarHeader>

      {/* Sidebar Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {SideBarOptions.map((item, index) => {
              // ✅ check if current path starts with menu path
              const isActive = pathname.startsWith(item.path);

              return (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.path}
                      className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                        isActive
                          ? "bg-sky-100 text-sky-700 font-semibold shadow-sm border border-sky-300/70"
                          : "text-gray-700 hover:bg-sky-100"
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 ${
                          isActive ? "text-sky-700" : "text-gray-600"
                        }`}
                      />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-gray-500">
          © {new Date().getFullYear()} IntelliHire
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
