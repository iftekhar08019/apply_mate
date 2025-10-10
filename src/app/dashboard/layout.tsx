"use client";

import Link from "next/link";
import SidebarMenu from "./SidebarMenu";
import { Menu, Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../../public/assets/Logo.png";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ModeToggle } from "../components/mode-toggle";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import axiosSecure from "@/hooks/useAxiosSecure";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession();
  const email = session?.user?.email ?? undefined;
  const [gmailConnected, setGmailConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [connectingGmail, setConnectingGmail] = useState(false);

  // Check Gmail connection status on mount
  useEffect(() => {
    const checkGmailStatus = async () => {
      try {
        const response = await axiosSecure.get("/gmail/sync");
        setGmailConnected(response.data.gmailConnected || false);
      } catch (error) {
        console.error("Error checking Gmail status:", error);
      }
    };

    if (email) {
      checkGmailStatus();
    }
  }, [email]);

  const handleGmailConnect = async () => {
    try {
      setConnectingGmail(true);
      const response = await axiosSecure.get("/gmail/auth");

      if (response.data.url) {
        const width = 600;
        const height = 700;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
          response.data.url,
          "Gmail OAuth",
          `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );

        const handleMessage = (event: MessageEvent) => {
          if (event.data.type === "gmail_connected") {
            if (event.data.success) {
              setGmailConnected(true);
              toast.success("Gmail connected successfully!");
            } else {
              toast.error(event.data.error || "Failed to connect Gmail");
            }
            setConnectingGmail(false);
            window.removeEventListener("message", handleMessage);
          }
        };

        window.addEventListener("message", handleMessage);

        if (!popup || popup.closed || typeof popup.closed === "undefined") {
          toast.error("Popup blocked! Please allow popups for this site.");
          setConnectingGmail(false);
          window.removeEventListener("message", handleMessage);
        }
      }
    } catch (error) {
      console.error("Error connecting Gmail:", error);
      toast.error("Failed to connect Gmail");
      setConnectingGmail(false);
    }
  };

  const handleGmailSync = async () => {
    try {
      setSyncing(true);
      toast.info("Syncing emails...");

      const response = await axiosSecure.post("/gmail/sync");

      if (response.data.success) {
        toast.success(
          `Sync completed! ${response.data.applicationsUpdated} application(s) updated.`
        );
        
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error syncing Gmail:", error);
      toast.error("Failed to sync Gmail");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm dark:bg-gray-900/90 dark:border-gray-800">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 dark:bg-gray-900">
                <VisuallyHidden>
                  <SheetTitle>Sidebar Menu</SheetTitle>
                </VisuallyHidden>
                <SidebarMenu />
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src={logo} alt="logo" width={140} height={45} className="dark:invert dark:brightness-0 dark:contrast-200" />
            </Link>
          </div>

          {/* Gmail & Right Actions */}
          <div className="flex items-center gap-3">
            {/* Gmail Connect/Sync Button */}
            {gmailConnected ? (
              <Button
                onClick={handleGmailSync}
                disabled={syncing}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white hidden sm:flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "Syncing..." : "Sync Gmail"}
              </Button>
            ) : (
              <Button
                onClick={handleGmailConnect}
                disabled={connectingGmail}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white hidden sm:flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {connectingGmail ? "Connecting..." : "Connect Gmail"}
              </Button>
            )}

            {/* Mode Toggle */}
            <ModeToggle />

            {/* User Dropdown */}
            <DropdownMenu>
              
              <DropdownMenuContent
                align="end"
                className="w-40 dark:bg-gray-900 dark:border-gray-800"
              >
                <Link href="/dashboard/settings">
                  <DropdownMenuItem className="dark:text-gray-200 cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Layout Body */}
      <div className="flex">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:block sticky top-16 h-[calc(100vh-4rem)] w-64 border-r border-gray-200 bg-white shadow-md dark:bg-gray-900 dark:border-gray-800">
          <SidebarMenu />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="rounded-2xl border bg-white shadow-md py-6 min-h-[calc(100vh-8rem)] dark:bg-gray-900 dark:border-gray-800">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
