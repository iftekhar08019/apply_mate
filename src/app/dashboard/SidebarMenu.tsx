"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SidebarMenu() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-3">
        <nav className="space-y-1 py-6">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
                  ${pathname === "/dashboard"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
                  ${pathname === "/dashboard/settings"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
              >
                <Settings className="h-4 w-4" />
                My Profile
              </Link>
              <Link
                href="/dashboard/my-applications"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
                  ${pathname === "/dashboard/my-applications"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
              >
                <Settings className="h-4 w-4" />
                My Applications
              </Link>
            </li>
          </ul>
        </nav>
      </ScrollArea>

    </div>
  );
}
