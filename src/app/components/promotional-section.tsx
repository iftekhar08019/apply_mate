"use client";
import React from "react";
import { CheckCircle, Bell, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PromotionalSection() {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Main Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            The Job Hunt Struggle,{" "}
            <motion.span 
              className="text-blue-600 dark:text-blue-400"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Solved
            </motion.span>
          </h2>
        </motion.div>

        {/* Before vs After Comparison */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex flex-col lg:flex-row rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* BEFORE Panel */}
            <motion.div 
              className="bg-gradient-to-br from-amber-50/80 to-orange-50/60 dark:from-amber-900/30 dark:to-orange-900/20 p-8 relative overflow-hidden flex-1 backdrop-blur-md border-r border-amber-200/30 dark:border-amber-700/30"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Background decorations */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-orange-300/5 rounded-full blur-3xl"></div>
              
              <div className="absolute top-4 left-4 bg-amber-100/80 dark:bg-amber-800/80 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-200/50 dark:border-amber-700/50">
                <span className="text-amber-800 dark:text-amber-200 font-semibold text-sm">BEFORE</span>
              </div>
              
              <motion.div 
                className="mt-12 text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">
                  The Chaotic Job Hunt
                </h3>
                <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
                  Scattered applications across multiple tabs, forgotten deadlines, missed opportunities, and endless stress trying to keep track of everything manually.
                </p>
                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                >
                  <Image 
                    src="https://i.ibb.co/7xDdkHKD/Gemini-Generated-Image-ylsqtaylsqtaylsq-removebg-preview.png"
                    alt="Before - Chaotic job hunt"
                    width={300}
                    height={200}
                    className="w-full max-w-xs h-auto rounded-lg mt-4"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* AFTER Panel */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 p-8 relative overflow-hidden flex-1 backdrop-blur-md border-l border-blue-200/30 dark:border-blue-700/30"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Background decorations */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-cyan-300/5 rounded-full blur-3xl"></div>
              
              <div className="absolute top-4 left-4 bg-blue-100/80 dark:bg-blue-800/80 px-3 py-1 rounded-full backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50">
                <span className="text-blue-800 dark:text-blue-200 font-semibold text-sm">AFTER</span>
              </div>
              
              <motion.div 
                className="mt-12 text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                  Organized Success with Apply Mate
                </h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                  Everything in one place, smart reminders, clear progress tracking, and the confidence that comes from staying on top of your job search.
                </p>
                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  viewport={{ once: true }}
                >
                  <Image 
                    src="https://i.ibb.co/bR1gCXXF/Gemini-Generated-Image-79ujr279ujr279uj-removebg-preview.png"
                    alt="After - Organized job hunt with Apply Mate"
                    width={300}
                    height={200}
                    className="w-full max-w-xs h-auto rounded-lg mt-4"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Track Everything */}
          <motion.div 
            className="group relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-3xl p-8 border border-blue-200/50 dark:border-blue-700/50 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
          >
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Track Everything</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Keep all your job applications organized in one centralized dashboard with real-time updates.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">All applications in one place</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Centralized dashboard</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Instant status updates</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Smart & Timely */}
          <motion.div 
            className="group relative bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-800/20 rounded-3xl p-8 border border-amber-200/50 dark:border-amber-700/50 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
          >
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-400/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/25">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Smart & Timely</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Never miss important deadlines with intelligent reminders and automated email sync alerts.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Never miss deadlines</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Interview reminders</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email sync alerts</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Clarity & Control */}
          <motion.div 
            className="group relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-3xl p-8 border border-blue-200/50 dark:border-blue-700/50 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }}
          >
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Clarity & Control</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Get clear insights into your job search progress with visual analytics and comprehensive tracking.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Clear progress view</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Visual analytics</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Know where you stand</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* What You'll Love */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-800/20 rounded-2xl p-6 max-w-2xl mx-auto border border-amber-200/50 dark:border-amber-700/50"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <p className="text-lg text-amber-800 dark:text-amber-200 font-medium ">
              <span className="font-bold">What You&apos;ll Love:</span> Stress-free tracking, smart reminders, clear insights.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
