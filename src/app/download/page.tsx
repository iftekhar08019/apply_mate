"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Chrome, 
  Shield, 
  Zap, 
  CheckCircle,
  AlertTriangle,
  ExternalLink
} from "lucide-react";

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
    
    setIsDownloading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Download ApplyMate Extension
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Install our Chrome extension to automatically scrape job listings from any website
          </p>
        </div>

        {/* Download Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Extension Info */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Chrome className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl">ApplyMate Extension</CardTitle>
                  <CardDescription>Version 2.0</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Works on all job websites</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>AI-powered job extraction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>One-click job saving</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Secure & private</span>
              </div>
            </CardContent>
          </Card>

          {/* Download Button */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-6 w-6" />
                Download Extension
              </CardTitle>
              <CardDescription>
                Get the latest version of ApplyMate Chrome extension
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleDownload}
                disabled={isDownloading}
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                {isDownloading ? (
                  <>
                    <Zap className="h-5 w-5 mr-2 animate-pulse" />
                    Preparing Download...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 mr-2" />
                    Download Extension
                  </>
                )}
              </Button>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>File size: ~132 KB</p>
                <p>Compatible with: Chrome, Edge, Brave</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Installation Instructions */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Installation Instructions
            </CardTitle>
            <CardDescription>
              Follow these steps to install the extension manually
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold">Download & Extract</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Download the extension zip file and extract it to a folder on your computer
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold">Open Chrome Extensions</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Go to chrome://extensions/ or click the puzzle piece icon → Manage Extensions
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold">Enable Developer Mode</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Toggle &quot;Developer mode&quot; in the top-right corner of the extensions page
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold">Load Extension</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Click &quot;Load unpacked&quot; and select the extracted extension folder
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <AlertTriangle className="h-5 w-5" />
              Security Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-yellow-700 dark:text-yellow-300 space-y-2">
              <p>This extension is not yet published on the Chrome Web Store.</p>
              <p>When installing manually, Chrome may show a warning about developer mode extensions.</p>
              <p>This is normal and safe - the extension only accesses job listing pages to extract information.</p>
              <p className="font-semibold">Your data is secure and never shared with third parties.</p>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need Help?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <a href="/about" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Learn More
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/contact" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
