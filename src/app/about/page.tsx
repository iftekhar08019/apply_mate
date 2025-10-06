"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Zap, Brain, Shield, Rocket } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  const teamRoles = [
    {
      title: "Frontend Developer",
      description:
        "Crafting intuitive Next.js + TypeScript interfaces, dashboard UI, authentication, and job detail forms.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Backend Developer",
      description:
        "Building robust API routes, database architecture, and secure user management systems.",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      title: "Extension Developer",
      description:
        "Developing Chrome extension for seamless job data scraping and backend integration.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Integration & Automation",
      description:
        "Implementing Gmail API integration, automated status updates, and streamlined deployment.",
      icon: <Shield className="h-6 w-6" />,
    },
  ];

  const techStack = [
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "shadcn/ui", category: "Frontend" },
    { name: "MongoDB", category: "Database" },
    { name: "Chrome Extension", category: "Extension" },
    { name: "Gmail API", category: "Integration" },
    { name: "Vercel", category: "Deployment" },
  ];

  const features = [
    "One-click job application saving",
    "Gmail integration for automatic status updates",
    "Chrome extension for seamless job extraction",
    "Centralized application tracking dashboard",
    "Smart status categorization",
    "Cross-platform compatibility",
  ];

  const developmentPhases = [
    {
      phase: "Phase 1: Foundation",
      description:
        "Core application setup, database design, and initial UI development.",
      status: "Completed",
    },
    {
      phase: "Phase 2: Integration",
      description: "Chrome extension and Gmail API integration.",
      status: "Completed",
    },
    {
      phase: "Phase 3: Enhancement",
      description: "Advanced analytics and AI-powered status prediction.",
      status: "In Progress",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-gray-100 py-16 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-24">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <Badge
            variant="outline"
            className="mb-4 border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400"
          >
            About Application Tracker
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Streamline Your Job Hunt
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Built by a passionate team of four developers, Application Tracker
            simplifies your job search with cutting-edge tools and seamless
            organization.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
          >
            <Link href="/signup">Start Organizing Now</Link>
          </Button>
        </motion.section>

        {/* Problem Statement */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-md bg-white/70 dark:bg-gray-900/40 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-gray-900 dark:text-white">
              <Users className="h-7 w-7 text-blue-600 dark:text-blue-500" />
              Why We Built This
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
              Solving the chaos of job applications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>
              Job hunting can feel overwhelming — scattered applications, missed
              deadlines, and disorganized notes create unnecessary stress. We
              experienced this firsthand and decided to build a solution.
            </p>
            <p>
              Application Tracker brings clarity to the process, centralizing
              all your applications, automating updates, and helping you focus
              on landing your dream job.
            </p>
          </CardContent>
        </Card>

        {/* Team & Roles */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamRoles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-gray-200 dark:border-gray-800 hover:shadow-xl bg-white dark:bg-gray-900 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        {role.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                      {role.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Our Technology Stack</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Built with modern, reliable technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {techStack.map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-center p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/50 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition"
                >
                  <div className="font-semibold text-black dark:text-white">
                    {tech.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {tech.category}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition"
              >
                <div className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500 mr-4"></div>
                <span>{f}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Phases */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Development Journey
          </h2>
          <div className="space-y-6">
            {developmentPhases.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                  <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6">
                    <div>
                      <h3 className="text-xl font-semibold">{p.phase}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {p.description}
                      </p>
                    </div>
                    <Badge
                      variant={
                        p.status === "Completed" ? "default" : "secondary"
                      }
                      className={`mt-3 sm:mt-0 ${
                        p.status === "Completed"
                          ? "bg-blue-600 dark:bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {p.status}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Ready to Simplify Your Job Hunt?
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
                Join thousands of job seekers who trust Application Tracker
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white group"
                >
                  <Link href="/signup" className="flex items-center gap-2">
                    Get Started
                    <Rocket className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-600/10 dark:hover:bg-blue-500/10"
                >
                  <Link href="/features">Explore Features</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
