"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            See Apply Mate in{" "}
            <span className="text-blue-600 dark:text-blue-400">Action</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Watch our demo to see how Apply Mate transforms your job search experience from chaos to clarity.
          </p>
        </motion.div>

        {/* Laptop Mockup with Video */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            {/* Laptop Screen */}
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
              <div className="rounded-xl overflow-hidden h-[140px] md:h-[262px] relative">
                {/* Video Container */}
                {isPlaying ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/O8ivm7403rk?autoplay=1&controls=1&modestbranding=1&rel=0"
                    title="Apply Mate Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-xl"
                  />
                ) : (
                  <>
                    {/* Default laptop screen images */}
                    <img 
                      src="https://flowbite.s3.amazonaws.com/docs/device-mockups/screen-image-imac.png" 
                      className="dark:hidden h-[140px] md:h-[262px] w-full rounded-xl" 
                      alt="Apply Mate Dashboard Preview"
                    />
                    <img 
                      src="https://flowbite.s3.amazonaws.com/docs/device-mockups/screen-image-imac-dark.png" 
                      className="hidden dark:block h-[140px] md:h-[262px] w-full rounded-xl" 
                      alt="Apply Mate Dashboard Preview Dark"
                    />
                    
                    {/* Play Button Overlay */}
                    <motion.button
                      onClick={toggleVideo}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 dark:bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-white transition-colors duration-200 z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-6 h-6 text-gray-800 ml-1" />
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            {/* Laptop Base */}
            <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]"></div>
            <div className="relative mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]"></div>
          </div>
        </motion.div>

        {/* Features Highlight */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-6 bg-white/50 dark:bg-white/5 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dashboard Overview</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              See all your applications in one organized dashboard
            </p>
          </div>

          <div className="text-center p-6 bg-white/50 dark:bg-white/5 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Tracking</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Automatic status updates and deadline reminders
            </p>
          </div>

          <div className="text-center p-6 bg-white/50 dark:bg-white/5 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Progress Analytics</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Visual insights into your job search progress
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/25 transition-all duration-300"
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
