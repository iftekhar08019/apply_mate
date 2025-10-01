"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    quote:
      "I used to lose track of where I applied. With JobTracker, I can easily log my applications, follow-ups, and interviews in one place.",
    image: "https://swiftshop-client.vercel.app/assets/review2-BM4fLxYs.png",
  },
  {
    name: "Michael Lee",
    role: "Data Analyst",
    quote:
      "The tracker helped me stay consistent and organized. I finally had a clear view of my progress, and it kept me motivated during my job search.",
    image: "https://swiftshop-client.vercel.app/assets/review1-BiN12U6l.png",
  },
  {
    name: "Emily Carter",
    role: "Product Designer",
    quote:
      "I love how simple and intuitive the dashboard is. Tracking applications became less stressful, and I landed interviews much faster.",
    image: "https://i.ibb.co.com/Psfx4zm4/download.png",
  },
]

export default function TestimonialSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-950">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-6">
          What Job Seekers Say
        </h2>
        <p className="text-lg text-gray-700 mb-16 max-w-2xl mx-auto">
          Hear from professionals who track their applications, interviews, and
          career progress with JobTracker.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 shadow-lg hover:shadow-[0_10px_30px_rgba(59,130,246,0.5)] transition"
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="rounded-full w-13 h-13 object-cover border-1 border-gray-500"
                />
                <div className="ml-4 text-left">
                  <p className="font-semibold text-black dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 dark:text-gray-300 text-base leading-relaxed italic">
                “{t.quote}”
              </p>
            </motion.div>
          ))}
        </div>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="text-4xl font-bold text-blue-600">5,000+</p>
          <p className="text-black/80 dark:text-gray-300">
            Job seekers already tracking their applications with JobTracker
          </p>
        </motion.div>
      </div>


    </section>
  )
}
