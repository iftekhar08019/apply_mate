"use client";
import React from "react";
import { Clock, Target, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function PromotionalSection() {
  const stats = [
    { 
      label: "Time Saved Weekly", 
      value: "5+ Hours",
      description: "No more manual tracking",
      icon: Clock,
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      label: "Application Accuracy", 
      value: "95%+",
      description: "AI-powered precision",
      icon: Target,
      gradient: "from-sky-500 to-blue-500"
    },
    { 
      label: "Faster Job Search", 
      value: "3x",
      description: "Stay organized & focused",
      icon: Rocket,
      gradient: "from-blue-500 to-cyan-600"
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 md:py-24 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute -z-10 top-20 left-10 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -z-10 bottom-20 right-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
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
            Why Apply Mate
          </motion.p>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Transform Your Job Search with{" "}
            <span className="text-blue-600 dark:text-blue-400">Artificial Intelligence</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Stop wasting time on manual tracking. Let AI handle the tedious work while you focus on landing your dream job.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="relative group bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 rounded-3xl p-8 border border-blue-200/50 dark:border-blue-700/50 overflow-hidden text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.3 } }}
              >
                {/* Background decoration */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="mx-auto mb-6"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-xl`}>
                      <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </motion.div>

                  {/* Value */}
                  <motion.h3 
                    className="text-4xl md:text-5xl font-black text-blue-600 dark:text-blue-400 mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.h3>

                  {/* Label */}
                  <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {stat.label}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* The Transformation Story */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 rounded-3xl p-8 md:p-12 border border-blue-200/50 dark:border-blue-700/50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-cyan-400/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  From Chaos to Success
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  Job seekers waste an average of <span className="font-bold text-blue-600 dark:text-blue-400">5-10 hours per week</span> on manual tracking. 
                  Apply Mate automates 90% of that work using AI, letting you focus on what matters: preparing for interviews and landing offers.
                </p>
              </div>

              {/* Progress Flow */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                <div className="flex items-center gap-3 px-6 py-4 bg-white/60 dark:bg-white/10 rounded-xl backdrop-blur-sm">
                  <span className="text-3xl">📝</span>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 dark:text-white">Manual Tracking</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">10 hours/week</p>
                  </div>
                </div>

                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-3xl rotate-90 md:rotate-0"
                >
                  →
                </motion.div>

                <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                  <span className="text-3xl">🤖</span>
                  <div className="text-left">
                    <p className="font-bold text-white">AI Automation</p>
                    <p className="text-sm text-blue-100">1 hour/week</p>
                  </div>
                </div>

                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  className="text-3xl rotate-90 md:rotate-0"
                >
                  →
                </motion.div>

                <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                  <span className="text-3xl">🎯</span>
                  <div className="text-left">
                    <p className="font-bold text-white">Land Your Job</p>
                    <p className="text-sm text-green-100">3x faster</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
