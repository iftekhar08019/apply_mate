"use client";

import React from "react";
import { GmailIntegration } from "../(user)/my-applications/components/GmailIntegration";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";

export default function GmailIntegrationPage() {
  const { data: session } = useSession();
  const email = session?.user?.email ?? undefined;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white border border-blue-600 px-4 py-2 rounded-full shadow-lg mb-4">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium uppercase tracking-wide">AI-Powered Email Tracking</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          Gmail{" "}
          <span className="text-blue-600 dark:text-blue-400">Integration</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
          Connect your Gmail to automatically track job application updates using AI-powered email analysis
        </p>
      </motion.div>

      {/* Gmail Integration Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <GmailIntegration userEmail={email} />
      </motion.div>

      {/* Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto mt-8"
      >
        <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              How It Works
            </h2>
          </div>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Connect Your Gmail</h3>
                <p className="text-sm">
                  Securely authenticate with Google OAuth. We only request read-only access to your emails.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">AI Scans Your Emails</h3>
                <p className="text-sm">
                  Our AI analyzes recent emails to identify job application confirmations, interview invitations, and status updates.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Automatic Updates</h3>
                <p className="text-sm">
                  Application statuses are automatically updated in your dashboard. New applications are created from confirmation emails.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Stay Synced</h3>
                <p className="text-sm">
                  Click the sync button anytime to check for new updates, or use the quick sync button in the navbar.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
            <p className="text-sm text-blue-900 dark:text-blue-200 font-medium">
              🔒 <strong>Privacy & Security:</strong> Your data is encrypted and never shared. We only read emails to detect job-related updates. You can disconnect anytime.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

