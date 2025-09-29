import Link from "next/link";
import logo from "../../../../public/assets/Logo.png";
import { Github, LinkedinIcon, Mail } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const socialIcons = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="w-full bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-10 lg:items-center">
          {/* Left: Logo + text */}
          <div className="flex-1 text-center md:text-left">
            <Image src={logo} alt="Footer-Logo" width={150} priority />
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
              Graphy empowers teams to transform raw data into clear, compelling
              visuals — making insights easier to share, understand, and act on.
            </p>
          </div>

          {/* Middle: Horizontal Menu */}
          <div className="flex-1 flex justify-center">
            <ul className="flex flex-wrap justify-center gap-6">
              {["Features", "Pricing", "Integrations", "Changelog"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
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
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                  <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    {social.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
            © 2025 Graphy. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookies Settings"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
