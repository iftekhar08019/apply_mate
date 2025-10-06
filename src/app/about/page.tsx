// app/about/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Zap, Brain, Shield } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const teamRoles = [
    {
      title: "Frontend Developer",
      description: "Next.js + TypeScript, Dashboard UI, authentication, job detail forms",
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: "Backend Developer",
      description: "API + Database, API routes, database design, user management",
      icon: <Brain className="h-5 w-5" />
    },
    {
      title: "Extension Developer",
      description: "Chrome Extension, job data scraping, integration with backend",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Integration & Automation",
      description: "Gmail API integration, status automation, deployment",
      icon: <Shield className="h-5 w-5" />
    }
  ];

  const techStack = [
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "shadcn/ui", category: "Frontend" },
    { name: "Node.js/Express", category: "Backend" },
    { name: "MongoDB/PostgreSQL", category: "Database" },
    { name: "Chrome Extension", category: "Extension" },
    { name: "Gmail API", category: "Integration" },
    { name: "Vercel", category: "Deployment" }
  ];

  const features = [
    "One-click job application saving",
    "Gmail integration for automatic status updates",
    "Chrome extension for easy job extraction",
    "Centralized application tracking",
    "Smart status categorization",
    "Cross-platform compatibility"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            About Application Tracker
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            Revolutionizing Job Application Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            A comprehensive solution built by a dedicated team of 4 developers to 
            streamline your job hunting process and bring order to the chaos of application tracking.
          </p>
        </section>

        {/* Problem Statement */}
        <section className="mb-16">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                The Problem We Solve
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Job hunting is messy and disorganized
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Candidates apply to dozens of jobs across multiple portals, keep scattered notes, 
                  and lose track of deadlines, interview updates, and rejections. This lack of 
                  organization leads to missed opportunities and increased stress during the job search process.
                </p>
                <p>
                  Our Application Tracker centralizes everything in one place, providing clarity 
                  and control over your job hunting journey.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team & Roles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Team & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamRoles.map((role, index) => (
              <Card key={index} className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      {role.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-400">{role.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-gray-900 dark:text-white">Technology Stack</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Modern, scalable, and developer-friendly technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">{tech.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {tech.category}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-3"></div>
                <span className="text-gray-900 dark:text-gray-100">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Ready to Transform Your Job Hunt?</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Join thousands of job seekers who have organized their application process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Link href="/features">View Features</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}