"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowUp,
} from "lucide-react";

interface TermsSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  const termsSections: TermsSection[] = [
    {
      id: "introduction",
      title: "Introduction",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Welcome to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              Application Tracker
            </span>.
            By using our website, Chrome Extension, or related services (including
            Gmail integration), you agree to these Terms & Conditions.
          </p>
        </div>
      ),
    },
    {
      id: "services-overview",
      title: "Services Overview",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Application Tracker helps you record and manage job applications in
            one place. Features include manual entry, one-click job capture via
            Chrome Extension, and automatic updates by scanning Gmail.
          </p>
        </div>
      ),
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      content: (
        <div className="space-y-3">
          {[
            "Provide accurate and up-to-date information when creating or editing records.",
            "Keep your account credentials confidential and secure.",
            "Use the service lawfully and do not attempt to access other users data without permission.",
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-300 text-sm">{text}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "gmail-integration",
      title: "Gmail Integration & Data Handling",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            If you connect your Gmail account, we use OAuth 2.0 with limited,
            read-only scopes to detect job-related messages. We do not share your
            email content with third parties and only store minimal metadata.
          </p>
          <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              For full details, please review our Privacy Policy.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "chrome-extension",
      title: "Chrome Extension",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            The Chrome Extension reads publicly available page content on job
            boards to pre-fill application fields.
          </p>
        </div>
      ),
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            You must not use the Service to engage in illegal activities, send
            spam, distribute malware, or scrape data unlawfully.
          </p>
        </div>
      ),
    },
    {
      id: "limitations-of-liability",
      title: "Limitations of Liability",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              The Service is provided as is. We do not guarantee uninterrupted
              operation or perfect accuracy.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            All content, branding, and code are property of Application Tracker.
          </p>
        </div>
      ),
    },
    {
      id: "changes-to-terms",
      title: "Changes to Terms",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            We reserve the right to modify these Terms. Continued use after
            changes means you accept the updated Terms.
          </p>
        </div>
      ),
    },
    {
      id: "termination",
      title: "Termination",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            We may suspend or terminate access if a user violates these Terms.
          </p>
        </div>
      ),
    },
    {
      id: "governing-law",
      title: "Governing Law & Dispute Resolution",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            These Terms are governed by the laws of the country where you reside.
          </p>
        </div>
      ),
    },
    {
      id: "contact",
      title: "Contact Information",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">For questions, contact us at:</p>
          <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <a
              href="mailto:apply.mate04@gmail.com"
              className="text-gray-900 dark:text-white font-medium hover:underline inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              apply.mate04@gmail.com  
            </a>
          </div>
        </div>
      ),
    },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <Badge
              variant="outline"
              className="mb-4 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-700"
            >
              <FileText className="w-3 h-3 mr-1" />
              Legal Document
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-3 text-gray-900 dark:text-white">
              Terms & Conditions
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-[120px]">
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-base text-gray-900 dark:text-white">
                    Contents
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1 p-2">
                    {termsSections.map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                          activeSection === section.id
                            ? "bg-blue-600 text-white font-medium"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        {index + 1}. {section.title}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardContent className="p-8 lg:p-12">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <div className="space-y-16">
                    {termsSections.map((section, index) => (
                      <section
                        key={section.id}
                        id={section.id}
                        className="scroll-mt-28"
                      >
                        <div className="space-y-4">
                          <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-blue-600/70">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                              {section.title}
                            </h2>
                          </div>
                          <Separator className="border-gray-200 dark:border-gray-700" />
                          <div className="pt-2">{section.content}</div>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      This document does not constitute legal advice.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      >
                        Go Back
                      </Button>
                      <Button
                        onClick={scrollToTop}
                        className="gap-2 text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <ArrowUp className="w-4 h-4" />
                        Back to Top
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
