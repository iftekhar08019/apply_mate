"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  FileText,
  LogOut,
  House,
  Star,
  Mail,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

interface SidebarMenuProps {
  onLinkClick?: () => void;
}

export default function SidebarMenu({ onLinkClick }: SidebarMenuProps) {
  const pathname = usePathname();
  const {data: session} = useSession();
  const userId = session?.user?.id;
   const handleLogOutButton = () => {
      signOut({ callbackUrl: "/" });
      toast.success("LogOut successfully.!!");
      onLinkClick?.();
    };

  const menuItems = [
    { name: "Home", href: "/", icon: House },
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Applications", href: "/dashboard/my-applications", icon: FileText },
    { name: "Gmail Integration", href: "/dashboard/gmail-integration", icon: Mail },
    { name: "Leave a Review", href: "/dashboard/review", icon: Star },
    { name: "My Profile", href: `/dashboard/profile/${userId}`, icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full mt-10 lg:mt-0 dark:bg-gray-900">
      {/* Top Navigation */}
      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-1 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onLinkClick}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
                      ${
                        pathname === item.href
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </ScrollArea>

      {/* Bottom Actions */}
      <div className="border-t px-3 py-4 space-y-2 dark:border-gray-800">
        
        <Button
          variant="destructive"
          className="w-full flex items-center gap-2"
          onClick={handleLogOutButton}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
