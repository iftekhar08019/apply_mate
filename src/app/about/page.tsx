"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Linkedin, Github, Globe, Mail, MapPin, Phone, Send, Sparkles, Target, Zap, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// ✅ Import team images
import rimiImg from "../../../public/Team-assets/rimi.png";
import MohammadImg from "../../../public/Team-assets/Mohammad.png";
import joyImg from "../../../public/Team-assets/joy.png";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sanjida Rimi",
      role: "Full Stack Developer",
      description:
        "Builds end-to-end solutions with beautiful interfaces, robust backend architecture, and secure authentication systems.",
      img: rimiImg,
      links: [
        { icon: Github, href: "https://github.com/sanjidaRimi023", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/sanjida-akter-rimi711909/", label: "LinkedIn" },
        { icon: Globe, href: "https://sanjidarimi.vercel.app/", label: "Portfolio" },
      ],
    },
    {
      name: "Md Iftekharul Alam",
      role: "Full Stack Developer & AI Specialist",
      description:
        "Develops Chrome extensions and integrates AI APIs to power Apply Mate's intelligent features.",
      img: joyImg,
      links: [
        { icon: Github, href: "https://github.com/iftekhar08019", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/mdiftekharulalam21/", label: "LinkedIn" },
        { icon: Globe, href: "https://iftekhar-web.web.app/", label: "Portfolio" },
      ],
    },
    {
      name: "Mafikul Islam",
      role: "Backend Developer",
      description: "Architecting robust APIs and AI integrations that power Apply Mate&apos;s intelligent features.",
      img: "",
      links: [
        { icon: Github, href: "https://github.com", label: "GitHub" },
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: Globe, href: "https://portfolio.com", label: "Portfolio" },
      ],
    },
    {
      name: "Mohammad",
      role: "Frontend Developer",
      description:
        "Crafts beautiful, responsive user interfaces with Next.js and TypeScript for seamless experiences.",
      img: MohammadImg,
      links: [
        { icon: Github, href: "https://github.com/Mohammad7558/", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/mohammod-bin-amin-b051a0244/", label: "LinkedIn" },
        { icon: Globe, href: "https://iam-mohammad.vercel.app/", label: "Portfolio" },
      ],
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Tracking",
      description: "Automatically captures and organizes job applications using advanced AI technology",
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Gain actionable insights with AI-driven analytics to optimize your job search strategy",
    },
    {
      icon: Users,
      title: "Gmail Integration",
      description: "AI automatically detects and updates application status from your emails",
    },
    {
      icon: Target,
      title: "Chrome Extension",
      description: "One-click job saving from LinkedIn and Indeed with AI data extraction",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorations - Fixed for entire page */}
      <div className="fixed -z-10 top-20 left-10 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="fixed -z-10 top-1/3 right-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="fixed -z-10 bottom-20 left-1/4 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      
      {/* ---------- Hero Section ---------- */}
      <section className="relative w-full py-20 sm:py-28 lg:py-32">

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <motion.p
              className="relative inline-block w-fit px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[length:200%_100%] border border-blue-600"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="inline w-4 h-4 mr-2" />
              About Apply Mate
            </motion.p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              AI-Powered Job Application{" "}
              <span className="text-blue-600 dark:text-blue-400">Tracking</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
              Built by developers who experienced the chaos of job hunting. We leverage AI to track, analyze, and optimize your applications automatically.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------- Story / Mission ---------- */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <motion.p
              className="relative inline-block w-fit px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[length:200%_100%] border border-blue-600"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900 dark:text-white">
              From Job Search{" "}
              <span className="text-blue-600 dark:text-blue-400">Chaos to AI-Powered Control</span>
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p className="text-lg">
                We experienced firsthand the overwhelming nature of modern job hunting—scattered spreadsheets, missed follow-ups, and forgotten applications. That&apos;s why we built Apply Mate with cutting-edge AI technology.
              </p>
              <p className="text-lg">
                Our AI-powered platform automatically organizes your entire job search, provides intelligent insights, and keeps you on top of every opportunity from application to offer—all without manual effort.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl shadow-lg backdrop-blur-md overflow-hidden"
          >
            <CardContent className="p-6 lg:px-8 space-y-5">
              {[
                "AI automatically extracts job details from LinkedIn and Indeed",
                "Smart Gmail integration detects status updates in real-time",
                "Intelligent dashboard with predictive analytics and insights",
                "Chrome extension with one-click AI-powered job saving",
                "Automated reminders and follow-up suggestions powered by AI",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 items-start group"
                >
                  <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {point}
                  </span>
                </motion.div>
              ))}
            </CardContent>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------- Features Grid ---------- */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-12"
          >
            <motion.p
              className="relative inline-block w-fit px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[length:200%_100%] border border-blue-600"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Why Choose Us
            </motion.p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Everything You Need for{" "}
              <span className="text-blue-600 dark:text-blue-400">AI-Powered Success</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 p-6 rounded-xl shadow-sm backdrop-blur-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Team Section ---------- */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <motion.p
              className="relative inline-block w-fit px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[length:200%_100%] border border-blue-600"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Meet The Team
            </motion.p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Built by Job Seekers,{" "}
              <span className="text-blue-600 dark:text-blue-400">for Job Seekers</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We&apos;ve walked in your shoes. Our team combined their job search frustrations to build the AI-powered solution we all needed.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 hover:shadow-xl backdrop-blur-md transition-all duration-300 group h-full flex flex-col">
                  <CardHeader className="pb-4 flex flex-col items-center text-center flex-1">
                    <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-blue-600 dark:border-blue-400 group-hover:border-blue-700 dark:group-hover:border-blue-300 transition-colors shadow-lg mb-4 bg-gray-100 dark:bg-gray-300 flex items-center justify-center">
                      {member.img ? (
                        <Image
                          src={member.img}
                          alt={member.name}
                          className="w-full h-full object-contain object-center"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white font-semibold text-xl bg-gradient-to-br from-blue-500 to-blue-600">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">
                        {member.name}
                      </CardTitle>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                        {member.role}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-2">
                        {member.description}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4 border-t border-blue-200/50 dark:border-blue-700/50">
                    <div className="flex justify-center space-x-4">
                      {member.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
                          aria-label={link.label}
                        >
                          <link.icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Vision Section ---------- */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <motion.p
              className="relative inline-block w-fit px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[length:200%_100%] border border-blue-600"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Future Vision
            </motion.p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              The Future of{" "}
              <span className="text-blue-600 dark:text-blue-400">AI-Powered Career Intelligence</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We&apos;re evolving Apply Mate into the most intelligent career companion. Soon, you&apos;ll experience AI-powered resume optimization, predictive interview analytics, and smart job matching based on your success patterns and career goals.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mt-8 text-left">
              <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 p-6 rounded-lg shadow-sm backdrop-blur-md">
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">AI Resume Optimization</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Automatic, intelligent resume tailoring for each job application
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 p-6 rounded-lg shadow-sm backdrop-blur-md">
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Predictive AI Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  AI forecasts your success chances with personalized recommendations
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 p-6 rounded-lg shadow-sm backdrop-blur-md">
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Smart Job Matching</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  AI discovers opportunities that perfectly match your profile and goals
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- Contact Section ---------- */}
      <section className="text-gray-900 dark:text-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* === Hero Section (Text) === */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.p
              className="relative inline-block w-fit px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[length:200%_100%] border border-blue-600 mb-6"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Sparkles className="inline w-4 h-4 mr-2" />
              Contact Us
            </motion.p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Have questions about our AI-powered features, partnership ideas, or need technical support? Our dedicated team is here to help!
            </p>
          </motion.div>

          {/* === Main Content Grid: Form and Info === */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16">
            {/* Left Side: Contact Info (Occupies 2/5 columns on large screens) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 shadow-xl backdrop-blur-md flex flex-col justify-between"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Talk to Our Team
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-10">
                Our dedicated team is eager to connect and help you make the most of Apply Mate&apos;s AI features. We typically respond within 24 hours.
              </p>

              {/* Contact Details List */}
              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Email Us
                    </h4>
                    <a
                      href="mailto:apply.mate04@gmail.com"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      apply.mate04@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Call Us
                    </h4>
                    <a
                      href="tel:+8801234567890"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      +880 1234 567 890
                    </a>
                  </div>
                </div>

                {/* Office/Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
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
              <div className="mt-12 pt-4 border-t border-blue-200/50 dark:border-blue-700/50">
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  We value your time and aim for rapid resolution of all inquiries.
                </p>
              </div>
            </motion.div>
            {/* Right Side: Contact Form (Occupies 3/5 columns on large screens) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 shadow-xl backdrop-blur-md"
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
                    className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 focus:border-blue-500 focus:ring-blue-500 transition-colors"
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
                    className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 focus:border-blue-500 focus:ring-blue-500 transition-colors"
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
                    className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 h-36 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-6 text-base font-semibold transition-colors"
                >
                  Submit Message
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
