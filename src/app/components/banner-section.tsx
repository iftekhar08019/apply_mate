"use client";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

export default function BannerSection() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/banner.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <section className="relative bg-gray-100 dark:bg-gray-900 min-h-[90vh] flex items-center overflow-hidden py-12 md:py-20">
      {/* Background Decorations */}
      <div className="absolute -z-10 top-20 right-1/4 h-96 w-96 rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl animate-pulse" />
      <div className="absolute -z-10 bottom-20 left-1/4 h-96 w-96 rounded-full bg-cyan-400/20 dark:bg-cyan-600/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute -z-10 top-1/2 left-1/2 h-96 w-96 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Text Section */}
          <motion.div 
            className="flex-1 text-center lg:text-left space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 dark:border-blue-400/30 px-4 py-2 rounded-full backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide">
                  AI-Powered Job Application Tracker
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-gray-900 dark:text-white">
                All Your Job Applications,{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    In One Place
                  </span>
                  <motion.span
                    className="absolute bottom-2 left-0 right-0 h-3 bg-blue-400/30 dark:bg-blue-600/30 -z-10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Stop juggling spreadsheets and messy tabs.{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">ApplyMate</span>{" "}
              uses AI to track, organize, and automate your entire job search journey.
            </motion.p>

            {/* Feature Highlights */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {["AI Job Scraping", "Auto Email Sync", "Smart Analytics"].map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 bg-white/80 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50 dark:border-blue-700/50"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/login" 
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#0439e6] to-[#0051ff] hover:from-[#0051ff] hover:to-[#0439e6] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
                >
                  Get Started Free
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/download" 
                  className="inline-flex items-center gap-3 bg-white/80 dark:bg-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/20 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-blue-200/50 dark:border-blue-700/50 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 shadow-lg"
                >
                  Download Extension
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Lottie Animation Section */}
          <motion.div 
            className="flex-1 flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="absolute w-full h-full max-w-lg max-h-lg bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-600/20 dark:to-cyan-600/20 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            {/* Lottie Animation */}
            <div className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl">
              {animationData ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Lottie
                    animationData={animationData}
                    loop
                    className="w-full drop-shadow-2xl"
                  />
                </motion.div>
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-3xl animate-pulse" />
              )}
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl hidden lg:block"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-xl hidden lg:block"
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" fill="currentColor" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    </section>
  );
}
