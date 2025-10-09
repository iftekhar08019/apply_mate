"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Linkedin, Github, Globe } from "lucide-react";
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
      role: "Frontend Developer",
      description:
        "Designs elegant interfaces and handles UI components for a smooth and polished experience.",
      img: rimiImg,
      links: [
        { icon: Github, href: "https://github.com/sanjidaRimi023", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/sanjida-akter-rimi711909/", label: "LinkedIn" },
        { icon: Globe, href: "https://sanjidarimi.vercel.app/", label: "Portfolio" },
      ],
    },
    {
      name: "Md Iftekharul Alam",
      role: "Chrome Extension Developer",
      description:
        "Develops and maintains the Chrome Extension to extract job details seamlessly from LinkedIn and Indeed.",
      img: joyImg,
      links: [
        { icon: Github, href: "https://github.com/iftekhar08019", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/mdiftekharulalam21/", label: "LinkedIn" },
        { icon: Globe, href: "https://iftekhar-web.web.app/", label: "Portfolio" },
      ],
    },
    {
      name: "Mafikul Islam",
      role: "Empty",
      description: "No description",
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
        "Focused on building responsive and interactive UIs with Next.js, TypeScript, and Tailwind CSS.",
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
      title: "Smart Tracking",
      description: "Automatically captures job applications from your emails and browsing",
    },
    {
      title: "Progress Analytics",
      description: "Visualize your application success rates and identify patterns",
    },
    {
      title: "Follow-up Reminders",
      description: "Never miss an interview or follow-up deadline again",
    },
    {
      title: "Multi-platform Sync",
      description: "Works across LinkedIn, Indeed, and direct company applications",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* ---------- Hero Section ---------- */}
      <section className="w-full mx-auto bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-gray-800 dark:to-gray-800 py-20 sm:py-28 lg:py-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <Badge
              variant="outline"
              className="border-white/30 bg-gray-200 text-black px-4 py-1.5 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              About Application Tracker
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Revolutionize Your Job Search
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
              Built by developers who understand the chaos of job hunting. Track,
              analyze, and optimize your applications in one powerful platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---------- Story / Mission ---------- */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-0 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6 mr-10">
            <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-0 px-4 py-1.5">
              Our Mission
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              From Chaos to Control in Your Job Search
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p className="text-lg">
                We experienced firsthand how overwhelming job hunting can be—
                scattered spreadsheets, missed follow-ups, and forgotten
                applications. Thats why we built Application Tracker to bring
                order to the chaos.
              </p>
              <p className="text-lg">
                Our platform automatically organizes your job search, provides
                actionable insights, and helps you stay on top of every
                opportunity from application to offer.
              </p>
            </div>
          </div>

          <Card className="shadow-xl bg-white dark:bg-gray-800 border-0 overflow-hidden ml-10">
            <CardContent className="p-6 lg:px-8 space-y-5">
              {[
                "Centralize all applications in one intelligent dashboard",
                "Automatically detect status updates from your Gmail",
                "One-click job saving from LinkedIn and Indeed",
                "Smart analytics to track your interview conversion rates",
                "Automated follow-up reminders and scheduling",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 items-start group"
                >
                  <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {point}
                  </span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* ---------- Features Grid ---------- */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-12"
        >
          <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-0 px-4 py-1.5">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything You Need for Job Search Success
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
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- Team Section ---------- */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-0 px-4 py-1.5">
              The Team
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Built by Job Seekers, for Job Seekers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {`We've been in your shoes. Our multidisciplinary team combined their job search frustrations to build the solution we all needed.`}
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
                <Card className="bg-white dark:bg-gray-800 hover:shadow-xl border-0 transition-all duration-300 group h-full flex flex-col">
                  <CardHeader className="pb-4 flex flex-col items-center text-center flex-1">
                    <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-blue-500 group-hover:border-blue-600 transition-colors shadow-md mb-4 bg-gray-100 dark:bg-gray-300 flex items-center justify-center">
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
                      <CardTitle className="text-lg font-semibold dark:text-white transition-colors">
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

                  <CardContent className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex justify-center space-x-4">
                      {member.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
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
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-0 px-4 py-1.5">
            Future Vision
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">
            The Future of Intelligent Job Hunting
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {`We're evolving Application Tracker into an AI-powered career companion. Soon, you'll get personalized resume optimization, predictive interview analytics, and smart job matching based on your success patterns and career goals.`}
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mt-8 text-left">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-lg mb-2">AI Resume Tailoring</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Automatic resume optimization for each job application
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-lg mb-2">Predictive Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Forecast your chances and get personalized recommendations
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-lg mb-2">Smart Job Matching</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Discover opportunities that match your profile and preferences
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
