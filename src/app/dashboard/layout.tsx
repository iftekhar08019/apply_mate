import Link from "next/link";
import SidebarMenu from "./SidebarMenu";
import { Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
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

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
              <Image src={logo} alt="logo" width={140} height={45} />
            </Link>
          </div>

          {/* Search & Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <Input
                type="search"
                placeholder="Search projects, tasks..."
                className="pl-10 w-72 rounded-full bg-gray-100 border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>

            {/* Notification */}
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
