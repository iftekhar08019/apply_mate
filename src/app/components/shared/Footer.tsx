"use client";
import Link from "next/link";
import logo from "../../../../public/assets/Logo.png";
import { Github, LinkedinIcon, Mail } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const socialIcons = [
    { icon: Github, href: "https://github.com/", label: "GitHub" },
    { icon: LinkedinIcon, href: "https://www.linkedin.com/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:apply.mate04@gmail.com", label: "Email" },
  ];

  const menus = [
    { label: "Home", path: "/" },
    { label: "Job Details", path: "/jobs" },
    { label: "Resume Builder", path: "/resume" },
    { label: "About Us", path: "/about" },
  ];

  const pathName = usePathname();

  if (!pathName.includes("/dashboard")) {
    return (
      <footer className="w-full bg-white dark:bg-gray-900/70 dark:backdrop-blur-xl border-t border-gray-200 dark:border-gray-700/50">
        <div className="container mx-auto px-4 py-12 lg:px-0">
          {/* Main footer content */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-10 lg:items-center">
            {/* Left: Logo + text */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <Link href="/" className="flex justify-center md:justify-start">
                <Image 
                  src={logo} 
                  alt="Footer-Logo" 
                  width={150} 
                  className="dark:invert dark:brightness-0 dark:contrast-200"
                  priority 
                />
              </Link>
              <p className="mt-4 text-gray-600 dark:text-white text-sm leading-relaxed max-w-md mx-auto md:mx-0">
                Application Tracker helps job seekers organize and manage all their
                applications in one place — track progress, sync with Gmail, and stay
                on top of every opportunity effortlessly.
              </p>
            </div>

            {/* Middle: Dynamic Menu */}
            <div className="flex-1 flex justify-center">
              <ul className="flex flex-wrap justify-center gap-6">
                {menus.map((menu) => (
                  <li key={menu.path}>
                    <Link
                      href={menu.path}
                      className="text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {menu.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Social Links */}
            <div className="flex-1 text-center md:text-right">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Social Links
              </h3>
              <div className="flex justify-center md:justify-end gap-6">
                {socialIcons.map((social) => (
                  <div key={social.label} className="flex flex-col items-center">
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors dark:text-white"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </Link>
                    <span className="mt-2 text-xs text-gray-600 dark:text-white">
                      {social.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-white text-center md:text-left">
              © 2025 Application Tracker. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <Link
                href="/terms"
                className="text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Terms & Condition
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  } else {
    return <></>;
  }
};

export default Footer;
