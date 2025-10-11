"use client"

import * as React from "react"
import { ChevronDown, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

const faqs = [
  {
    q: "Is my Gmail data safe with AI-powered email tracking?",
    a: "Absolutely! Your privacy is our top priority. Apply Mate uses Google's OAuth 2.0 for secure authentication and only reads job-related email metadata (sender, subject, dates). Our AI analyzes this data locally and never stores your actual email content. All communication is encrypted end-to-end.",
  },
  {
    q: "How does the AI Chrome Extension extract job details?",
    a: "Our intelligent Chrome extension uses advanced AI algorithms to automatically detect and extract job information from any job board (LinkedIn, Indeed, Glassdoor, and more). With one click, it captures company name, position, requirements, salary, location, and saves everything to your dashboard—no manual entry needed!",
  },
  {
    q: "What AI features does Apply Mate offer?",
    a: "Apply Mate is powered by Google Gemini AI to provide: (1) Automatic job scraping from websites, (2) Smart email analysis to detect status updates (Applied → Interview → Offer → Rejected), (3) AI-powered application tracking with 95%+ accuracy, and (4) Intelligent Gmail sync that processes your last 24 hours of emails.",
  },
  {
    q: "Is Apply Mate free to use?",
    a: "Yes! Apply Mate is completely free during our beta phase. You get full access to AI-powered job scraping, Gmail integration, application tracking, and the resume builder. Premium AI features like personalized resume optimization and predictive interview analytics will be introduced later.",
  },
  {
    q: "How does AI email sync update my application status?",
    a: "Our Gemini AI integration scans your Gmail inbox every 24 hours for job-related emails. It intelligently detects keywords, sender patterns, and email content to automatically update your application status. When you receive an interview invite, rejection, or offer letter, AI recognizes it and updates your dashboard instantly—saving you hours of manual tracking.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

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
            FAQ
          </motion.p>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked{" "}
            <span className="text-blue-600 dark:text-blue-400">Questions</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to the most common questions about Apply Mate&apos;s AI-powered features and how they work.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              {faqs.map((item, idx) => {
                const isOpen = openIndex === idx
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={cn(
                      "rounded-2xl border border-blue-200/50 dark:border-blue-700/50 bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 shadow-sm backdrop-blur-md transition-all",
                      "hover:shadow-lg hover:border-blue-300/60 dark:hover:border-blue-600/60"
                    )}
                  >
                    {/* Trigger */}
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between px-5 py-5 text-left font-semibold text-gray-900 dark:text-white transition-colors hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                    >
                      <span className="text-base md:text-lg pr-4">{item.q}</span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 transition-transform duration-300",
                          isOpen ? "rotate-180" : ""
                        )}
                      />
                    </button>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-5 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Side - Animated Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Decorative blur behind image */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl scale-110" />
              <Image
                src="/FAQ.png"
                alt="FAQ Illustration"
                width={500}
                height={400}
                className="relative rounded-full shadow-2xl border-4 border-blue-200/30 dark:border-blue-700/30"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
