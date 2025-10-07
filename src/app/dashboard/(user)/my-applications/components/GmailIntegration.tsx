"use client";

import React, { useState, useEffect } from "react";
import { Mail, RefreshCw, CheckCircle, XCircle, Unplug } from "lucide-react";
import { toast } from "sonner";
import axiosSecure from "@/hooks/useAxiosSecure";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface GmailIntegrationProps {
  userEmail?: string;
}

export const GmailIntegration: React.FC<GmailIntegrationProps> = ({ userEmail }) => {
  const [gmailConnected, setGmailConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [connectingGmail, setConnectingGmail] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);

  // Check Gmail connection status on mount
  useEffect(() => {
    const checkGmailStatus = async () => {
      try {
        const response = await axiosSecure.get("/gmail/sync");
        setGmailConnected(response.data.gmailConnected || false);
        setLastSync(response.data.lastSync || null);
      } catch (error) {
        console.error("Error checking Gmail status:", error);
      }
    };

    if (userEmail) {
      checkGmailStatus();
    }
  }, [userEmail]);

  const handleGmailConnect = async () => {
    try {
      setConnectingGmail(true);
      const response = await axiosSecure.get("/gmail/auth");

      if (response.data.url) {
        // Open OAuth in popup
        const width = 600;
        const height = 700;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
          response.data.url,
          "Gmail OAuth",
          `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );

        // Listen for message from popup
        const handleMessage = (event: MessageEvent) => {
          if (event.data.type === "gmail_connected") {
            if (event.data.success) {
              setGmailConnected(true);
              toast.success("Gmail connected successfully!");
              // Check status again to get last sync time
              setTimeout(async () => {
                const statusResponse = await axiosSecure.get("/gmail/sync");
                setLastSync(statusResponse.data.lastSync || null);
              }, 1000);
            } else {
              toast.error(event.data.error || "Failed to connect Gmail");
            }
            setConnectingGmail(false);
            window.removeEventListener("message", handleMessage);
          }
        };

        window.addEventListener("message", handleMessage);

        // Check if popup was blocked
        if (!popup || popup.closed || typeof popup.closed === "undefined") {
          toast.error("Popup blocked! Please allow popups for this site.");
          setConnectingGmail(false);
          window.removeEventListener("message", handleMessage);
        }

        // Fallback: Check if popup is still open
        const checkPopup = setInterval(() => {
          if (popup && popup.closed) {
            clearInterval(checkPopup);
            setConnectingGmail(false);
            window.removeEventListener("message", handleMessage);
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Error connecting Gmail:", error);
      toast.error("Failed to connect Gmail");
      setConnectingGmail(false);
    }
  };

  const handleGmailSync = async () => {
    try {
      setSyncing(true);
      toast.info("Syncing emails...");

      const response = await axiosSecure.post("/gmail/sync");

      if (response.data.success) {
        toast.success(
          `Sync completed! ${response.data.applicationsUpdated} application(s) updated from ${response.data.emailsProcessed} emails.`
        );
        setLastSync(new Date().toISOString());
        
        // Refresh the page to show new applications
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error syncing Gmail:", error);
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { error?: string } } }).response?.data
              ?.error || "Failed to sync Gmail"
          : "Failed to sync Gmail";
      toast.error(errorMessage);
    } finally {
      setSyncing(false);
    }
  };

  const handleDisconnectGmail = async () => {
    try {
      setDisconnecting(true);
      await axiosSecure.post("/gmail/disconnect");
      
      setGmailConnected(false);
      setLastSync(null);
      toast.success("Gmail disconnected successfully");
      setShowDisconnectDialog(false);
    } catch (error) {
      console.error("Error disconnecting Gmail:", error);
      toast.error("Failed to disconnect Gmail");
    } finally {
      setDisconnecting(false);
    }
  };

  return (
    <>
      <Card className="border-2 border-blue-100 dark:border-blue-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Mail className="w-5 h-5 text-blue-600" />
            Gmail Integration
          </CardTitle>
          <CardDescription>
            Automatically track job application updates from your Gmail inbox using AI
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {gmailConnected ? (
            <>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Gmail Connected</span>
              </div>

              {lastSync && (
                <p className="text-sm text-muted-foreground">
                  Last synced: {new Date(lastSync).toLocaleString()}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleGmailSync}
                  disabled={syncing}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
                  {syncing ? "Syncing..." : "Sync Applications"}
                </Button>

                <Button
                  onClick={() => setShowDisconnectDialog(true)}
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Unplug className="w-4 h-4 mr-2" />
                  Disconnect
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Click sync to automatically update your application statuses from recent emails.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-gray-500">
                <XCircle className="w-5 h-5" />
                <span className="font-medium">Gmail Not Connected</span>
              </div>

              <Button
                onClick={handleGmailConnect}
                disabled={connectingGmail}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                {connectingGmail ? "Connecting..." : "Connect Gmail"}
              </Button>

              <div className="text-xs text-muted-foreground space-y-1">
                <p className="font-medium">What happens when you connect?</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Read-only access to your Gmail</li>
                  <li>AI scans recent emails for job updates</li>
                  <li>Automatically updates application statuses</li>
                  <li>Creates new applications from emails</li>
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Disconnect Confirmation Dialog */}
      <AlertDialog open={showDisconnectDialog} onOpenChange={setShowDisconnectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect Gmail?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove Gmail access and stop automatic syncing. You can reconnect
              anytime. Your existing applications will not be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDisconnectGmail}
              disabled={disconnecting}
              className="bg-red-600 hover:bg-red-700"
            >
              {disconnecting ? "Disconnecting..." : "Disconnect"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

