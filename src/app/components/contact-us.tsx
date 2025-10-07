"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* === Hero Section (Text) === */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have questions about tracking, partnership ideas, or need technical
            support? Reach out to our dedicated team—were excited to hear from
            you!
          </p>
        </motion.div>

        {/* === Main Content Grid: Form and Info === */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16">
          {/* Left Side: Contact Info (Occupies 2/5 columns on large screens) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            // Box style: Lighter background for better contrast with the form
            className="lg:col-span-2 p-8 md:p-10 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col justify-between"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Talk to Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10">
              Our small, remote-first team is eager to connect. We typically
              respond within 24 hours during business days.
            </p>

            {/* Contact Details List */}
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Email Us
                  </h4>
                  <a
                    href="mailto:support@graphytracker.com"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    apply.mate04@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Call Us
                  </h4>
                  <a
                    href="tel:+8801234567890"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    +880 1234 567 890
                  </a>
                </div>
              </div>

              {/* Office/Location */}
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Our Hub
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Dhaka, Bangladesh (Remote-first Operation)
                  </p>
                </div>
              </div>
            </div>

            {/* Optional Footer Text */}
            <div className="mt-12 pt-4 border-t border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-500">
                We value your time and aim for rapid resolution of all
                inquiries.
              </p>
            </div>
          </motion.div>
          {/* Right Side: Contact Form (Occupies 3/5 columns on large screens) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 p-8 md:p-10 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Send a Message
            </h2>
            <form className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  // Added focus ring for better UX
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-cyan-500 focus:ring-cyan-500 transition-colors"
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-cyan-500 focus:ring-cyan-500 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 h-36 focus:border-cyan-500 focus:ring-cyan-500 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                // Using a darker, more premium blue/cyan for the button, and slightly adjusting the hover
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-6 text-base font-semibold transition-colors"
              >
                Submit
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
