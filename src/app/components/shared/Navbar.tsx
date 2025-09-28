"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../../public/assets/Logo.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const menus = ["AI System", "Guide", "Explore", "Contact Us", "Discover"];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
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
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 bg-white px-6 xl:px-10 py-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          {menus.map((menu, idx) => (
            <Link
              key={idx}
              href="#"
              className="text-sm xl:text-base font-semibold text-gray-700 hover:text-black transition whitespace-nowrap"
            >
              {menu}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
          {/* Desktop buttons */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            <Link
              href="#"
              className="text-sm xl:text-base font-semibold text-gray-700 hover:text-black transition"
            >
              Log in
            </Link>
            <Button
              className={cn(
                "rounded-full px-6 xl:px-8 py-2 xl:py-3 text-sm xl:text-base font-semibold shadow-md transition",
                "bg-blue-600 hover:bg-blue-700 text-white"
              )}
            >
              Sign Up
            </Button>
          </div>

          {/* Tablet buttons (hidden on mobile, shown on tablet) */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            <Link
              href="#"
              className="text-sm font-semibold text-gray-700 hover:text-black transition"
            >
              Log in
            </Link>
            <Button
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold shadow-md transition",
                "bg-blue-600 hover:bg-blue-700 text-white"
              )}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md hover:bg-gray-100 transition">
                  <Menu size={24} className="sm:w-7 sm:h-7" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Image
                      src={logo}
                      alt="Guide Logo"
                      width={140}
                      height={45}
                      className="w-28 sm:w-32"
                    />
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col items-center gap-6 px-4 sm:px-6">
                  {menus.map((menu, idx) => (
                    <Link
                      key={idx}
                      href="#"
                      className="text-base sm:text-lg font-semibold text-gray-700 hover:text-black transition w-full text-center py-2"
                    >
                      {menu}
                    </Link>
                  ))}
                  <hr className="my-2 w-full" />
                  <Link
                    href="#"
                    className="text-base sm:text-lg font-semibold text-gray-700 hover:text-black transition w-full text-center py-2"
                  >
                    Log in
                  </Link>
                  <Button
                    className={cn(
                      "rounded-full px-8 py-3 text-base font-semibold shadow-md transition",
                      "bg-blue-600 hover:bg-blue-700 text-white w-full max-w-xs"
                    )}
                  >
                    Sign Up
                  </Button>
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