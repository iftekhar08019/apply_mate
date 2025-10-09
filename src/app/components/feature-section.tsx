"use client";
import React from "react";
import { Chrome, Mail, Sparkles, Zap, Brain } from "lucide-react";
import { motion } from "framer-motion";

type Feature = {
  icon: typeof Chrome;
  title: string;
  subtitle: string;
  details: string[];
  gradient: string;
  iconGradient: string;
  borderColor: string;
  dotColor: string;
};

export default function FeatureSection() {
  const features: Feature[] = [
    {
      icon: Chrome,
      title: "AI-Powered Chrome Extension",
      subtitle: "Intelligent job scraping with one click",
      details: [
        "AI extracts job details from LinkedIn, Indeed, and any job board automatically",
        "Smart parsing understands company names, positions, requirements, and salary",
        "One-click save to your dashboard with AI-organized data",
        "Works seamlessly across all job platforms",
      ],
      gradient: "from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20",
      iconGradient: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-600",
      dotColor: "bg-blue-500",
    },
    {
      icon: Mail,
      title: "AI Gmail Integration",
      subtitle: "Never miss an update with intelligent email tracking",
      details: [
        "AI automatically detects job-related emails from your inbox",
        "Smart status updates: Applied → Interview → Offer → Rejected",
        "Gemini AI analyzes email content to extract company and position",
        "Syncs last 24 hours, processes 10 emails intelligently",
      ],
      gradient: "from-sky-50/80 to-blue-50/60 dark:from-sky-900/30 dark:to-blue-900/20",
      iconGradient: "from-sky-400 to-blue-500",
      borderColor: "border-sky-500",
      dotColor: "bg-sky-500",
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 md:py-24 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute -z-10 top-10 right-1/4 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -z-10 bottom-10 left-1/4 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
      
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
            AI-Powered Features
          </motion.p>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Smart Tools Powered by{" "}
            <span className="text-blue-600 dark:text-blue-400">Artificial Intelligence</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
            Let AI do the heavy lifting. Our intelligent features automate tedious tasks so you can focus on landing your dream job.
          </p>
        </motion.div>

        {/* Features */}
        <div className="space-y-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Feature Card */}
                <motion.div
                  className={`relative bg-gradient-to-br ${feature.gradient} backdrop-blur-md rounded-3xl p-8 border ${feature.borderColor} border-l-8 overflow-hidden flex-1 w-full`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                >
                  {/* Background decorations */}
                  <div className={`absolute -top-4 -right-4 w-32 h-32 ${feature.dotColor} opacity-10 rounded-full blur-2xl`}></div>
                  <div className={`absolute -bottom-4 -left-4 w-40 h-40 ${feature.dotColor} opacity-5 rounded-full blur-3xl`}></div>

                  {/* AI Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/80 dark:bg-gray-900/80 px-3 py-1.5 rounded-full backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                    <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">AI-Powered</span>
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.iconGradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-base font-medium">
                      {feature.subtitle}
                    </p>

                    {/* Details List */}
                    <ul className="space-y-3">
                      {feature.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-xl"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className={`w-2 h-2 ${feature.dotColor} rounded-full mt-2 flex-shrink-0`}></div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {detail}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Hexagon Icon */}
                <motion.div
                  className="flex-shrink-0 lg:w-1/3 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-48 h-48 md:w-64 md:h-64">
                    {/* Hexagon shape */}
                    <div className={`w-full h-full bg-gradient-to-br ${feature.iconGradient} opacity-10 dark:opacity-20 [clip-path:polygon(25%_6.7%,75%_6.7%,100%_50%,75%_93.3%,25%_93.3%,0%_50%)]`}></div>
                    
                    {/* Icon in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className={`w-20 h-20 md:w-28 md:h-28 text-blue-600 dark:text-blue-400`} strokeWidth={1.5} />
                      </motion.div>
                    </div>

                    {/* AI Sparkle Effect */}
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Zap className="w-8 h-8 text-yellow-500" fill="currentColor" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Benefits Highlight */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-900/20 dark:to-blue-800/20 rounded-2xl p-6 max-w-3xl mx-auto border border-sky-200/50 dark:border-sky-700/50 shadow-lg"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              <span className="font-bold text-blue-600 dark:text-blue-400">Powered by Google Gemini AI:</span> 
              {" "}Our intelligent system processes your jobs and emails with 95%+ accuracy, saving you hours of manual work every week.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
