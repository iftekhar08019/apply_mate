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
import { Users, Zap, Brain, Shield, Rocket, Target, TrendingUp, CheckCircle2, ArrowRight, Globe, Lock, BarChart3 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  const stats = [
    { label: "Active Users", value: "10K+", icon: <Users className="h-8 w-8" /> },
    { label: "Applications Tracked", value: "150K+", icon: <BarChart3 className="h-8 w-8" /> },
    { label: "Success Rate", value: "87%", icon: <TrendingUp className="h-8 w-8" /> },
  ];

  const coreValues = [
    {
      title: "Simplicity First",
      description: "We believe job hunting should be straightforward, not overwhelming. Our interface is designed for clarity and ease of use.",
      icon: <Target className="h-8 w-8" />,
    },
    {
      title: "Data Security",
      description: "Your job search data is sensitive. We implement industry-standard encryption and never share your information.",
      icon: <Lock className="h-8 w-8" />,
    },
    {
      title: "Continuous Innovation",
      description: "We constantly evolve based on user feedback, adding features that genuinely improve your job search experience.",
      icon: <Rocket className="h-8 w-8" />,
    },
    {
      title: "User-Centric Design",
      description: "Every feature is built with job seekers in mind, ensuring efficiency and reducing application management stress.",
      icon: <Users className="h-8 w-8" />,
    },
  ];

  const teamRoles = [
    {
      title: "Frontend Architecture",
      description: "Designing and implementing responsive, accessible interfaces with Next.js, TypeScript, and modern UI frameworks for seamless user experiences.",
      icon: <Zap className="h-6 w-6" />,
      color: "blue",
    },
    {
      title: "Backend Engineering",
      description: "Building scalable API infrastructure, optimizing database queries, and ensuring robust data management with MongoDB and serverless architecture.",
      icon: <Brain className="h-6 w-6" />,
      color: "purple",
    },
    {
      title: "Extension Development",
      description: "Creating powerful browser extensions that integrate seamlessly with job platforms, enabling one-click data capture and synchronization.",
      icon: <Globe className="h-6 w-6" />,
      color: "green",
    },
    {
      title: "Integration Specialist",
      description: "Implementing third-party API integrations, automation workflows, and ensuring smooth deployment pipelines for continuous delivery.",
      icon: <Shield className="h-6 w-6" />,
      color: "orange",
    },
  ];

  const milestones = [
    {
      year: "Q1 2024",
      title: "Project Inception",
      description: "Identified the problem space and began architecting the solution with initial prototype development.",
    },
    {
      year: "Q2 2024",
      title: "Beta Launch",
      description: "Released MVP to early adopters, gathering critical feedback and refining core functionality.",
    },
    {
      year: "Q3 2024",
      title: "Chrome Extension",
      description: "Launched browser extension, enabling seamless job data extraction from major job platforms.",
    },
    {
      year: "Q4 2024",
      title: "AI Integration",
      description: "Implemented AI-powered status prediction and automated email parsing for intelligent tracking.",
    },
  ];

  const techStack = [
    { name: "Next.js 14", category: "Framework", color: "blue" },
    { name: "TypeScript", category: "Language", color: "blue" },
    { name: "Tailwind CSS", category: "Styling", color: "cyan" },
    { name: "shadcn/ui", category: "Components", color: "slate" },
    { name: "MongoDB", category: "Database", color: "green" },
    { name: "Chrome API", category: "Extension", color: "yellow" },
    { name: "Gmail API", category: "Integration", color: "red" },
    { name: "Vercel", category: "Infrastructure", color: "black" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden dark:bg-gray-800 bg-blue-600 text-white py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-8"
          >
            <Badge variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm px-4 py-1.5">
              About Application Tracker
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              Your Job Search,<br />
              <span className="text-white">Simplified & Organized</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
              A comprehensive platform built by developers who understand the chaos of job hunting. Were transforming how professionals track and manage their career opportunities.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="text-center bg-white dark:bg-transparent dark:text-white text-black backdrop-blur-md rounded-xl p-6 border border-white/20 w-full"
                >
                  <div className="flex justify-center mb-4 text-blue-600">{stat.icon}</div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-black mt-2 dark:text-white">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-20 py-20">
        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center w-full"
        >
          <div className="space-y-6 w-full">
            <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-0">
              Our Mission
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Empowering Job Seekers Through Technology
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {`We've experienced the frustration firsthand—scattered spreadsheets, missed follow-ups, and the mental burden of tracking dozens of applications. Thats why we built Application Tracker.`}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Our mission is to eliminate the administrative overhead of job searching, allowing you to focus on what truly matters: preparing for interviews and landing your ideal role.
            </p>
          </div>
          <Card className="border-gray-200 dark:border-gray-800 shadow-xl bg-white dark:bg-gray-800 w-full">
            <CardContent className="p-8 space-y-6">
              {[
                "Centralize all applications in one place",
                "Automate status tracking via email",
                "Never miss a follow-up or deadline",
                "Gain insights with analytics",
                "Reduce job search stress significantly"
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{point}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.section>

        {/* Core Values */}
        <section className="w-full py-20 lg:py-0 lg:my-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4 w-full"
          >
            <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-0">
              Core Values
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              What Drives Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our principles guide every decision we make, from feature development to user support.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-full"
              >
                <Card className="h-full border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-gray-800 group w-full">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Roles */}
        <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-3xl p-4 sm:p-12 shadow-inner w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4 w-full"
          >
            <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-0">
              The Team
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Expertise Across the Stack
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Four specialized developers bringing diverse skills to create a seamless experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 w-full">
            {teamRoles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-full"
              >
                <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 h-full w-full">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-${role.color}-100 dark:bg-${role.color}-950 text-${role.color}-600 dark:text-${role.color}-400 shrink-0`}>
                        {role.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2 text-gray-900 dark:text-white">{role.title}</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {role.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="w-full my-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4 w-full"
          >
            <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-0">
              Technology
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Built With Modern Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We leverage cutting-edge technologies to deliver a fast, reliable, and scalable platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="w-full"
              >
                <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full w-full">
                  <CardContent className="p-4 text-center space-y-2">
                    <div className="font-bold text-lg text-gray-900 dark:text-white">{tech.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{tech.category}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4 w-full"
          >
            <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-0">
              Our Journey
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Development Milestones
            </h2>
          </motion.div>

          <div className="space-y-8 relative before:absolute before:left-8 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:to-blue-300 dark:before:from-blue-500 dark:before:to-blue-800 w-full">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-20 w-full"
              >
                <div className="absolute left-5 top-6 w-7 h-7 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-gray-900 shadow-lg"></div>
                <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow w-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-2">
                        <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-0">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{milestone.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl w-full"
        >
          <Card className="border-0 bg-blue-600 dark:bg-gray-800 text-white w-full">
            <CardContent className="p-12 sm:p-16 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-bold">
                  Ready to Transform Your Job Search?
                </h2>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                  {`Join thousands of professionals who've simplified their application tracking and landed their dream jobs faster.`}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all group px-8 py-6 text-lg"
                >
                  <Link href="/signup" className="flex items-center gap-2">
                    Start Free Today
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white bg-transparent hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg hover:text-white"
                >
                  <Link href="/features">Explore Features</Link>
                </Button>
              </div>

              <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}