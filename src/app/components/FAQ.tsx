"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

const faqs = [
  {
    q: "Is my Gmail data safe?",
    a: "Yes, your Gmail data is fully secure. We only read email headers to detect application updates, never the email content itself.",
  },
  {
    q: "Will the extension work on all sites?",
    a: "Our Chrome extension works with most job boards and company career pages. We're constantly expanding support to cover more sites.",
  },
  {
    q: "Do I need to pay?",
    a: "No. Apply Mate is free during beta. Pro features like resume feedback and job recommendations will be available later.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  return (
    <section className="relative py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto lg:px-4 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Accordion */}
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked <span className="text-blue-600 dark:text-blue-400">Questions</span>
          </h2>
          <p className="text-lg text-gray-800 mb-12 dark:text-white">
            Find answers to the most common questions about Apply Mate and how it works.
          </p>

          <div className="space-y-6">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={idx}
                  className={cn(
                    "rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-800 shadow-lg backdrop-blur-xl transition-all",
                    "hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700"
                  )}
                >
                  {/* Trigger */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between px-6 py-6 text-left text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 transition-colors hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={cn(
                        "h-6 w-6 shrink-0 text-gray-500 transition-transform duration-300",
                        isOpen ? "rotate-180 text-gray-700 dark:text-gray-300" : ""
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
                        <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Side - Animated Image */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex justify-center"
        >
          <Image
            src="/FAQ.png"
            alt="FAQ Illustration"
            width={500}
            height={400}
            className="rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
          />
        </motion.div>
      </div>

      {/* Gradient background decoration */}
      <div className="absolute -z-10 top-10 left-1/3 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -z-10 bottom-0 right-1/4 h-80 w-80 rounded-full bg-green-400/10 blur-3xl" />
    </section>
  )
}