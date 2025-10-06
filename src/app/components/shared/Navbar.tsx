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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  // { session }: { session: UserSessionProps | null }
  const { data: session } = useSession();
  console.log(session);

  const menus = [
    { label: "Home", path: "/" },
    { label: "Job Details", path: "/jobs" },
    { label: "Resume Builder", path: "/resume" },
    { label: "About Us", path: "/about" },
    { label: "Terms & Condition", path: "/terms" },
  ];

  const pathName = usePathname();
  const handleLogOutButton = () => {
    signOut({ callbackUrl: "/" });
    toast.success("LogOut successfully.!!");
  };

  if (!pathName.includes("/dashboard")) {
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
              className="w-32 sm:w-36 lg:w-40"
            />
          </Link>

          {/* Center Menu (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 bg-white dark:bg-gray-900 px-6 xl:px-10 py-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-800">
            {menus.map((menu, idx) => (
              <Link
                key={idx}
                href={menu.path}
                className="text-sm xl:text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition whitespace-nowrap"
              >
                {menu.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
            {/* Desktop buttons */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5">
              <ModeToggle />
              {session?.user ? (
                <>
                  <div className="relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 focus:outline-none">
                          <Image
                            src={session.user.image || "/user.jpg"}
                            alt={session.user.name || "User"}
                            onError={(e) => (e.currentTarget.src = "/default.jpg")}
                            width={40}
                            height={40}
                            className="rounded-full border border-blue-600 cursor-pointer"
                          />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-md space-y-2 p-4"
                      >
                        <DropdownMenuLabel className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {session.user.name || "User"}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard"
                            className="block w-full text-left px-4 py-2 text-sm bg-gradient-to-r from-[#0439e6] to-[#0051ff] text-white rounded-sm font-medium transition duration-300 hover:from-[#0051ff] hover:to-[#0439e6]"
                          >
                            Dashboard
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <button
                            onClick={handleLogOutButton}
                            className="w-full text-left px-4 py-2 text-sm bg-gradient-to-r from-red-600 to-red-800 text-white rounded-sm font-medium transition duration-300 hover:from-red-600 hover:to-red-700"
                          >
                            Logout
                          </button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm xl:text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white transition  border-2 border-blue-600 px-6 py-2.5 hover:bg-blue-600 rounded-lg"
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

            {/* Tablet buttons */}
            <div className="hidden md:flex lg:hidden items-center gap-3">
              <ModeToggle />
              {session?.user ? (
                <button
                  onClick={handleLogOutButton}
                  className="bg-gradient-to-r from-[#0439e6] to-[#0051ff] text-white px-6 py-3 rounded-sm font-medium transition duration-300 hover:from-[#0051ff] hover:to-[#0439e6]"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm xl:text-base font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition  border-blue-600 px-6 py-2.5 hover:bg-blue-600 rounded-lg border-2"
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
                  <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
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
                        className="w-28 sm:w-32 dark:invert dark:brightness-90"
                      />
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col items-center gap-6 px-4 sm:px-6">
                    {menus.map((menu, idx) => (
                      <Link
                        key={idx}
                        href={menu.path}
                        className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition w-full text-center py-2"
                      >
                        {menu.label}
                      </Link>
                    ))}
                    <hr className="my-2 w-full border-gray-200 dark:border-gray-800" />
                    <div className="w-full flex justify-center">
                      <ModeToggle />
                    </div>
                    {session?.user ? (
                      <button
                        onClick={handleLogOutButton}
                        className="bg-gradient-to-r from-[#0439e6] to-[#0051ff] text-white px-6 py-3 rounded-sm font-medium transition duration-300 hover:from-[#0051ff] hover:to-[#0439e6]"
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
  } else {
    return <></>;
  }
};

export default Navbar;
