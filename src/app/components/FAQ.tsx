"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

const faqs = [
    {
        q: "Is my Gmail data safe?",
        a: "✅ Yes, your Gmail data is fully secure. We only read email headers to detect application updates, never the email content itself.",
    },
    {
        q: "Will the extension work on all sites?",
        a: "🌐 Our Chrome extension works with most job boards and company career pages. We're constantly expanding support to cover more sites.",
    },
    {
        q: "Do I need to pay?",
        a: "💸 No. Apply Mate is free during beta. Pro features like resume feedback and job recommendations will be available later.",
    },
]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null)

    return (
        <section className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-black dark:to-black">
            <div className="w-11/13 mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Side - Accordion */}
                <div>
                    <h2 className="text-5xl font-extrabold mb-4 tracking-tight text-blue-600">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-800 mb-12">
                        Find answers to the most common questions about Apply Mate and how it works.
                    </p>


                    <div className="space-y-6">
                        {faqs.map((item, idx) => {
                            const isOpen = openIndex === idx
                            return (
                                <div
                                    key={idx}
                                    className={cn(
                                        "rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 shadow-lg backdrop-blur-xl transition-all",
                                        "hover:shadow-xl hover:border-blue-400/60 dark:hover:border-green-500/60"
                                    )}
                                >
                                    {/* Trigger */}
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                                        className="flex w-full items-center justify-between px-6 py-6 text-left text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 transition-colors hover:text-blue-600 dark:hover:text-green-400 cursor-pointer"
                                    >
                                        <span>{item.q}</span>
                                        <ChevronDown
                                            className={cn(
                                                "h-6 w-6 shrink-0 text-gray-500 transition-transform duration-300",
                                                isOpen ? "rotate-180 text-blue-500 dark:text-green-400" : ""
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
                    animate={{ y: [0, -10, 0] }} // gently moves up and down
                    transition={{
                        duration: 3,       // slow movement
                        repeat: Infinity,  // keeps looping
                        ease: "easeInOut",
                    }}
                    className="flex justify-center"
                >
                    <Image
                        src="/FAQ.png"
                        alt="FAQ Illustration"
                        width={500}
                        height={400}
                        className="rounded-full shadow-[0_10px_25px_rgba(0,123,255,0.4)]"
                    />
                </motion.div>

            </div>

            {/* Gradient background decoration */}
            <div className="absolute -z-10 top-10 left-1/3 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute -z-10 bottom-0 right-1/4 h-80 w-80 rounded-full bg-green-400/20 blur-3xl" />
        </section>
    )
}
