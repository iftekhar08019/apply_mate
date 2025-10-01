"use client";

import { ArrowRight, SquarePlus, Mail, BarChart } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

type Step = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

const STEPS: Step[] = [
  { id: "add", title: "Add jobs with one click", description: "Use the browser extension to add jobs instantly.", icon: SquarePlus },
  { id: "sync", title: "Stay updated", description: "Gmail sync keeps interview invites and replies in one place.", icon: Mail },
  { id: "track", title: "Track progress", description: "Monitor progress from the dashboard with analytics.", icon: BarChart },
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
          className="relative inline-block w-fit px-3 py-1 rounded-md text-sm uppercase tracking-wide font-medium text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[length:200%_100%] border border-blue-600"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          How it works
        </motion.p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          <Typewriter
            words={[
              "3 simple steps to manage applications",
              "Add jobs, stay updated, track progress",
              "Everything in one dashboard",
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
          Add roles with a click, get updates from Gmail, and track everything from one dashboard.
        </motion.p>
      </motion.div>

      {/* Right side */}
      <div className="flex flex-col gap-6 md:w-1/2">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.id}  
              className="relative flex items-center gap-4 rounded-lg border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-5 shadow-sm transition-transform duration-200 hover:scale-[1.02] border-blue-600 border-l-8"
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

              {/* Arrow badge */}
              {idx < STEPS.length - 1 && (
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center border border-blue-600 rounded-md bg-white dark:bg-gray-700 shadow">
                  <ArrowRight className="h-6 w-6 text-blue-400 rotate-90" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
