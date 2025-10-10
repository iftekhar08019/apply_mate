"use client";

import {  SquarePlus, Mail, BarChart } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

type Step = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

const STEPS: Step[] = [
  { 
    id: "add", 
    title: "Scrape jobs with AI", 
    description: "AI-powered Chrome extension extracts job details from any job board (LinkedIn, Indeed, etc.) and saves it to your dashboard instantly.", 
    icon: SquarePlus 
  },
  { 
    id: "sync", 
    title: "Auto-update with AI", 
    description: "Connect Gmail and let Gemini AI analyze your emails. It automatically detects job updates and changes status (Applied → Interview → Offer → Rejected).", 
    icon: Mail 
  },
  { 
    id: "track", 
    title: "Track & analyze", 
    description: "View all applications in one dashboard with real-time stats, status tracking, and visual analytics to monitor your job search progress.", 
    icon: BarChart 
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto container px-4 py-12 md:flex md:gap-10 items-center">
      {/* Left side */}
      <motion.div
        className="md:w-1/2 mb-8 md:mb-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="relative inline-block w-fit px-3 py-1 rounded-md text-sm uppercase tracking-wide font-medium text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[length:200%_100%] border border-blue-600 mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          How it works
        </motion.p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          <Typewriter
            words={[
              "3 AI-powered steps to job search success",
              "Scrape jobs, auto-update, track progress",
              "Let artificial intelligence work for you",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </h2>

        <motion.p
          className="text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          AI scrapes job details from any website, analyzes your Gmail for status updates, and organizes everything in one intelligent dashboard.
        </motion.p>
      </motion.div>

      {/* Right side */}
      <div className="flex flex-col gap-6 md:w-1/2">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.id}  
              className="relative flex items-center gap-4 rounded-lg border bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/200 backdrop-blur-md p-5 shadow-sm transition-transform duration-200 hover:scale-[1.02] border-blue-600 border-l-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              {/* Hexagon with icon inside */}
              <div className="flex-shrink-0 grid place-items-center w-14 h-14 dark:bg-gray-900 bg-blue-100 text-blue-600 [clip-path:polygon(25%_6.7%,75%_6.7%,100%_50%,75%_93.3%,25%_93.3%,0%_50%)]">
                <Icon className="h-6 w-6" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>

             
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
