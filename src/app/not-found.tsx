"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import img from "../../public/assets/Error.png";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-center px-6 py-16">
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center space-y-8 md:space-y-10 -mt-16"
      >
        {/* Illustration (slightly bigger and higher) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[540px] md:h-[540px] lg:w-[600px] lg:h-[600px]"
        >
          <Image
            src={img}
            alt="404 Page Not Found"
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-2xl space-y-3 -mt-10"
        >
          <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100">
            Page Not Found
          </h1>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed my-3">
            Sorry, the page you’re looking for doesn’t exist or may have been
            moved. Please go back to the homepage and continue exploring.
          </p>

          {/* Button */}
          <div className="pt-2">
            <Link href="/" passHref>
              <Button
                size="lg"
                className="text-lg px-8 py-4 font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-transform hover:scale-105 cursor-pointer"
              >
                Go Back Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Glow Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-blue-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"
        ></motion.div>
      </div>
    </section>
  );
}
