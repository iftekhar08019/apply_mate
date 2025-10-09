"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../../public/assets/Logo.png";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "../mode-toggle";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Home, Briefcase, FileText, Download, Info } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { data: session } = useSession();
  const pathName = usePathname();

  const menus = [
    { label: "Home", path: "/", icon: Home },
    ...(session?.user
      ? [{ label: "My Jobs", path: "/jobs", icon: Briefcase }]
      : []),
    { label: "Resume Builder", path: "/resume", icon: FileText },
    { label: "Download Extension", path: "/download", icon: Download },
    { label: "About Us", path: "/about", icon: Info },
  ];

  const handleLogOutButton = () => {
    signOut({ callbackUrl: "/" });
    toast.success("Logged out successfully!");
  };

  // Hide Navbar in dashboard routes
  if (pathName.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="w-full bg-white dark:bg-gray-950 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex items-center justify-between py-4 lg:py-6 px-4 sm:px-6 lg:px-0">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Guide Logo"
            width={150}
            height={50}
            className="w-32 sm:w-36 lg:w-40 dark:invert dark:brightness-0 dark:contrast-200"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <section className="hidden lg:flex items-center gap-6 xl:gap-8 bg-white dark:bg-gray-900 px-6 xl:px-10 py-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-800">
          {menus.map((menu, idx) => {
            const isActive = pathName === menu.path;
            const Icon = menu.icon;
            return (
              <Link
                key={idx}
                href={menu.path}
                className="relative text-sm xl:text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition whitespace-nowrap flex items-center gap-1"
              >
                <Icon size={18} />
                {menu.label}

                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-1 rounded-full bg-blue-600 animate-[underlineExpand_0.8s]" />
                )}
              </Link>
            );
          })}
        </section>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            <ModeToggle />
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 focus:outline-none group"
                    aria-label="Open user menu"
                  >
                    <div className="relative">
                      <Image
                        src={session.user.image || "/default.jpg"}
                        alt={session.user.name || "User"}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-blue-600 dark:border-blue-400 cursor-pointer object-cover transition-all group-hover:border-blue-700 dark:group-hover:border-blue-300 group-hover:shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-950 rounded-full"></div>
                    </div>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-64 sm:w-72 bg-gradient-to-br from-blue-50/95 to-cyan-50/95 dark:from-blue-900/95 dark:to-cyan-900/95 backdrop-blur-xl border border-blue-200/50 dark:border-blue-700/50 shadow-xl rounded-2xl p-2"
                >
                  {/* User Info Header */}
                  <div className="px-4 py-3 mb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <Image
                        src={session.user.image || "/default.jpg"}
                        alt={session.user.name || "User"}
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-blue-600 dark:border-blue-400 object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {session.user.name || "User"}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="bg-blue-200/50 dark:bg-blue-700/50" />

                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent hover:bg-transparent">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg my-2"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                      <span className="text-white">Go to Dashboard</span>
                      <svg
                        className="w-4 h-4 ml-auto text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent hover:bg-transparent">
                    <button
                      onClick={handleLogOutButton}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="text-white">Logout</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm xl:text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white transition border-2 border-blue-600 px-6 py-2.5 hover:bg-blue-600 rounded-lg"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-[#0439e6] to-[#0051ff] text-white px-6 py-3 rounded-sm font-medium transition duration-300 hover:from-[#0051ff] hover:to-[#0439e6]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Tablet Buttons */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            <ModeToggle />
            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-r from-[#0439e6] to-[#0051ff] text-white px-6 py-3 rounded-sm font-medium transition duration-300 hover:from-[#0051ff] hover:to-[#0439e6]"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogOutButton}
                  className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-sm font-medium transition duration-300 hover:from-red-600 hover:to-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm xl:text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition border-blue-600 px-6 py-2.5 hover:bg-blue-600 rounded-lg border-2"
                >
                  Log in
                </Link>
                <Link href="/signup">
                  <button className="bg-gradient-to-r from-[#0439e6] to-[#0051ff] text-white px-6 py-3 rounded-sm font-medium transition duration-300 hover:from-[#0051ff] hover:to-[#0439e6]">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="md:hidden">
              <ModeToggle />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Open mobile menu"
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <Menu
                    size={24}
                    className="sm:w-7 sm:h-7 text-gray-700 dark:text-gray-300"
                  />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 sm:w-96 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800"
              >
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Image
                      src={logo}
                      alt="Guide Logo"
                      width={140}
                      height={45}
                      className="w-28 sm:w-32 dark:invert dark:brightness-0 dark:contrast-200"
                    />
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col items-center gap-6 px-4 sm:px-6">
                  {menus.map((menu, idx) => {
                    const isActive = pathName === menu.path;
                    return (
                      <Link
                        key={idx}
                        href={menu.path}
                        className={`text-base sm:text-lg font-semibold ${
                          isActive
                            ? "text-blue-600"
                            : "text-gray-700 dark:text-gray-300"
                        } hover:text-black dark:hover:text-white transition w-full text-center py-2`}
                      >
                        {menu.label}
                      </Link>
                    );
                  })}

                  {/* Dashboard link for mobile */}
                  {session?.user && (
                    <Link
                      href="/dashboard"
                      className={`text-base sm:text-lg font-semibold ${
                        pathName === "/dashboard"
                          ? "text-blue-600"
                          : "text-gray-700 dark:text-gray-300"
                      } hover:text-black dark:hover:text-white transition w-full text-center py-2`}
                    >
                      Dashboard
                    </Link>
                  )}

                  <hr className="my-2 w-full border-gray-200 dark:border-gray-800" />
                  <div className="w-full flex justify-center">
                    <ModeToggle />
                  </div>

                  {session?.user ? (
                    <button
                      onClick={handleLogOutButton}
                      className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-sm font-medium transition duration-300 hover:from-red-600 hover:to-red-700"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="text-sm xl:text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition border-blue-600 px-6 py-2.5 hover:bg-blue-600 rounded-lg border-2"
                      >
                        Log in
                      </Link>
                      <Link href="/signup">
                        <button className="bg-gradient-to-r from-[#0439e6] to-[#0051ff] text-white px-6 py-3 rounded-sm font-medium transition duration-300 hover:from-[#0051ff] hover:to-[#0439e6]">
                          Sign Up
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
