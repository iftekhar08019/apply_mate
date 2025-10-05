"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileText, Mail, CheckCircle2, AlertTriangle, Info, ArrowUp } from "lucide-react";

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
          <p className="text-muted-foreground">
            Welcome to <span className="font-semibold text-foreground">Application Tracker</span>. By using our website, Chrome Extension, or related
            services (including Gmail integration), you agree to these Terms & Conditions. Please read them
            carefully before using the service.
          </p>
        </div>
      )
    },
    {
      id: "services-overview",
      title: "Services Overview",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Application Tracker helps you record and manage job applications in one place. Features include manual
            entry of applications, one-click job capture via our Chrome Extension, and automatic status updates
            by scanning Gmail for relevant messages.
          </p>
        </div>
      )
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
            <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">Provide accurate and up-to-date information when creating or editing records.</p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
            <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">Keep your account credentials confidential and secure.</p>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
            <CheckCircle2 className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">Use the service lawfully and do not attempt to access other users data without permission.</p>
          </div>
        </div>
      )
    },
    {
      id: "gmail-integration",
      title: "Gmail Integration & Data Handling",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            If you connect your Gmail account, we use OAuth 2.0 with limited, read-only scopes to detect job-related
            messages (for example: Interview, Application received, or We regret to inform you). We do not
            share your email content with third parties and only store the minimum metadata required to update
            application status.
          </p>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border">
            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">For full details, please review our Privacy Policy.</p>
          </div>
        </div>
      )
    },
    {
      id: "chrome-extension",
      title: "Chrome Extension",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            The Chrome Extension reads publicly available page content on job boards to pre-fill application fields.
            Since job sites may change their HTML structure, compatibility cannot be guaranteed indefinitely. You
            remain responsible for verifying saved details.
          </p>
        </div>
      )
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            You must not use the Service to engage in illegal activities, send spam, distribute malware, scrape
            data unlawfully, or infringe others privacy or intellectual property rights.
          </p>
        </div>
      )
    },
    {
      id: "limitations-of-liability",
      title: "Limitations of Liability",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border">
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              The Service is provided as is. We do not guarantee uninterrupted operation or perfect accuracy. To
              the fullest extent permitted by law, we are not liable for indirect, incidental, special, or consequential
              damages arising from your use of the Service.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            All content, branding, and code provided by Application Tracker are the property of the service owner or
            licensors. You may not reproduce or redistribute our proprietary materials without permission.
          </p>
        </div>
      )
    },
    {
      id: "changes-to-terms",
      title: "Changes to Terms",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            We reserve the right to modify these Terms. Significant changes will be communicated via email or in-app
            notifications. Continued use after the effective date constitutes acceptance of the updated Terms.
          </p>
        </div>
      )
    },
    {
      id: "termination",
      title: "Termination",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            We may suspend or terminate access if a user violates these Terms. After termination, your access to the
            Service will cease and we may remove or anonymize your data according to our retention policies.
          </p>
        </div>
      )
    },
    {
      id: "governing-law",
      title: "Governing Law & Dispute Resolution",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            These Terms are governed by the laws of the country where you reside. Disputes will be resolved in the
            competent courts located in your jurisdiction, unless otherwise agreed in writing.
          </p>
        </div>
      )
    },
    {
      id: "contact",
      title: "Contact Information",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            For questions about these Terms, please contact us at:
          </p>
          <div className="p-4 rounded-lg border bg-card">
            <a 
              href="mailto:support@applicationtracker.com"
              className="text-foreground font-medium hover:underline inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              support@applicationtracker.com
            </a>
          </div>
        </div>
      )
    }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4">
              <FileText className="w-3 h-3 mr-1" />
              Legal Document
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contents</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1 p-2">
                    {termsSections.map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          activeSection === section.id 
                            ? 'bg-muted font-medium text-foreground' 
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
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
            <Card>
              <CardContent className="p-8 lg:p-12">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <div className="space-y-16">
                    {termsSections.map((section, index) => (
                      <section 
                        key={section.id}
                        id={section.id}
                        className="scroll-mt-24"
                      >
                        <div className="space-y-4">
                          <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-muted-foreground/30">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <h2 className="text-2xl font-semibold tracking-tight">
                              {section.title}
                            </h2>
                          </div>
                          <Separator />
                          <div className="pt-2">
                            {section.content}
                          </div>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-16 pt-8 border-t">
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      This document does not constitute legal advice.
                    </p>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => window.history.back()}
                      >
                        Go Back
                      </Button>
                      <Button 
                        onClick={scrollToTop}
                        className="gap-2"
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