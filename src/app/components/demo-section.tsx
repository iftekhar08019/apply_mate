"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, CheckCircle, Zap, BarChart3 } from "lucide-react";
import GlitchText from "../../components/GlitchText";
import Image from "next/image";

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

        {/* Main Content - Two Column Layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Left Side - Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Experience the{" "}
                <GlitchText
                  speed={0.8}
                  enableShadows={true}
                  enableOnHover={true}
                  className="text-blue-600 dark:text-blue-400"
                >
                  Future
                </GlitchText>{" "}
                of Job Tracking
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Watch how Apply Mate transforms your chaotic job search into an organized, 
                stress-free experience. See the power of intelligent tracking in action.
              </p>
            </div>

            {/* Feature Points */}
            <div className="space-y-4 flex flex-col items-center lg:items-start">
              <motion.div 
                className="flex items-center gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 w-full max-w-sm lg:max-w-none"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Smart Organization</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">All applications in one place</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 w-full max-w-sm lg:max-w-none"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Real-time Updates</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Never miss important deadlines</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 w-full max-w-sm lg:max-w-none"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Progress Analytics</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Track your success journey</p>
                </div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/25 transition-all duration-300 mx-auto lg:mx-0"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              Watch Demo Now
            </motion.button>
          </div>

          {/* Right Side - Laptop Mockup */}
          <div className="flex justify-center lg:justify-end">
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
                      <Image 
                        src="https://flowbite.s3.amazonaws.com/docs/device-mockups/screen-image-imac.png" 
                        className="dark:hidden h-[140px] md:h-[262px] w-full rounded-xl" 
                        alt="Apply Mate Dashboard Preview"
                        width={512}
                        height={262}
                      />
                      <Image 
                        src="https://flowbite.s3.amazonaws.com/docs/device-mockups/screen-image-imac-dark.png" 
                        className="hidden dark:block h-[140px] md:h-[262px] w-full rounded-xl" 
                        alt="Apply Mate Dashboard Preview Dark"
                        width={512}
                        height={262}
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
          </div>
        </motion.div>

      </div>
    </section>
  );
}
