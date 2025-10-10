"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Chrome, 
  Sparkles, 
  CheckCircle,
  AlertTriangle,
  PlayCircle
} from "lucide-react";
import { motion } from "framer-motion";

export default function DownloadPage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Direct download from public folder
    const link = document.createElement('a');
    link.href = '/apply-mate-extension.zip';
    link.download = 'apply-mate-extension.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsDownloading(false), 1000);
  };

  const features = [
    "Works on LinkedIn, Indeed, and all job websites",
    "AI-powered automatic job data extraction",
    "One-click job saving to your dashboard",
    "Secure & private - your data stays safe",
    "Real-time sync with Apply Mate dashboard",
    "No manual data entry required"
  ];

  const installationSteps = [
    {
      number: 1,
      title: "Download & Extract",
      description: "Click the download button above and extract the ZIP file to a folder on your computer"
    },
    {
      number: 2,
      title: "Open Chrome Extensions",
      description: "Navigate to chrome://extensions/ or click the puzzle icon → Manage Extensions"
    },
    {
      number: 3,
      title: "Enable Developer Mode",
      description: "Toggle 'Developer mode' switch in the top-right corner of the extensions page"
    },
    {
      number: 4,
      title: "Load Extension",
      description: "Click 'Load unpacked' button and select the extracted extension folder"
    },
    {
      number: 5,
      title: "Start Using",
      description: "Visit any job site and click the Apply Mate extension icon to start saving jobs!"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="fixed -z-10 top-20 left-10 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="fixed -z-10 top-1/3 right-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="fixed -z-10 bottom-20 left-1/4 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="container mx-auto px-4 py-16 sm:py-20 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            className="relative inline-block w-fit px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[length:200%_100%] border border-blue-600 mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="inline w-4 h-4 mr-2" />
            Chrome Extension
          </motion.p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Download Apply Mate{" "}
            <span className="text-blue-600 dark:text-blue-400">Extension</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Install our powerful Chrome extension to automatically extract and save job listings with AI-powered precision
          </p>
        </motion.div>

        {/* Download Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 shadow-xl backdrop-blur-md overflow-hidden">
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Left - Extension Info */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Chrome className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Apply Mate Extension
                      </h2>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        Version 2.0 • Latest Release
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right - Download Button */}
                <div className="w-full md:w-auto flex flex-col items-center gap-4">
                  <Button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    size="lg" 
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    {isDownloading ? (
                      <>
                        <Download className="h-5 w-5 mr-2 animate-bounce" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5 mr-2" />
                        Download Extension
                      </>
                    )}
                  </Button>
                  
                  <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>File size: ~132 KB</p>
                    <p className="font-medium">Chrome • Edge • Brave</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Video Tutorial Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <PlayCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              Video Tutorial
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Watch this step-by-step guide to download and install the Apply Mate extension
            </p>
          </div>

          <Card className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 shadow-xl backdrop-blur-md overflow-hidden">
            <CardContent className="p-4 md:p-6">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                  title="Apply Mate Extension Installation Tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Installation Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Installation{" "}
              <span className="text-blue-600 dark:text-blue-400">Instructions</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Follow these simple steps to install the extension manually
            </p>
          </div>

          <div className="grid gap-6">
            {installationSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 shadow-sm backdrop-blur-md hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-yellow-50/80 to-orange-50/60 dark:from-yellow-900/20 dark:to-orange-900/10 border border-yellow-200/50 dark:border-yellow-700/50 shadow-lg backdrop-blur-md">
            <CardContent className="p-6 md:p-8">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 dark:bg-yellow-600 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-200 mb-3">
                    Important Security Notice
                  </h3>
                  <div className="text-yellow-800 dark:text-yellow-300 space-y-2 text-sm leading-relaxed">
                    <p>
                      <strong>This extension is not yet published on the Chrome Web Store.</strong> When installing manually, Chrome may display a warning about developer mode extensions.
                    </p>
                    <p>
                      This is completely normal and safe. The extension only accesses job listing pages to extract information and save it to your Apply Mate dashboard.
                    </p>
                    <p className="font-semibold text-yellow-900 dark:text-yellow-200">
                      🔒 Your data is secure, encrypted, and never shared with third parties.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Need Help?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              asChild
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500"
            >
              <a href="/about">
                Learn More About Apply Mate
              </a>
            </Button>
            <Button 
              variant="outline" 
              asChild
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500"
            >
              <a href="/about#contact">
                Contact Support
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
