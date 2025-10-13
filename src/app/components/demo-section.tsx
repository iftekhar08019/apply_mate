"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import Image from "next/image";

const YOUTUBE_VIDEO_ID = "rET8OQ2tT6E";

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 md:py-24 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute -z-10 top-1/4 left-10 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -z-10 bottom-1/4 right-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="relative inline-block w-fit px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[length:200%_100%] border border-blue-600 mb-6"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="inline w-4 h-4 mr-2" />
            Watch Demo
          </motion.p>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            See AI-Powered Job Tracking in{" "}
            <span className="text-blue-600 dark:text-blue-400">Action</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Watch how Apply Mate uses AI to automate your entire job search workflow – from scraping to tracking to success.
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="relative group">
            {/* Video Container with gradient border */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 p-1 shadow-2xl">
              <div className="bg-gray-900 rounded-[1.3rem] overflow-hidden">
                {isPlaying ? (
                  <div className="relative aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                      title="Apply Mate Demo - AI-Powered Job Tracking"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video cursor-pointer" onClick={handlePlayVideo}>
                    {/* YouTube Thumbnail */}
                    <Image
                      src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                      alt="Apply Mate Demo Video Thumbnail"
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300" />
                    
                    {/* Play Button - Large & Centered */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative">
                        {/* Pulsing Ring */}
                        <motion.div
                          className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Play Button */}
                        <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300">
                          <Play className="w-10 h-10 md:w-12 md:h-12 text-blue-600 ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Video Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                        Apply Mate Demo
                      </h3>
                      <p className="text-white/90 text-sm md:text-base">
                        See AI-powered job tracking in action
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl -z-10" />
          </div>

          {/* CTA Button Below Video */}
          {!isPlaying && (
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={handlePlayVideo}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/25 transition-all duration-300"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Watch Demo Video
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
