"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase,  
  Clock,
  TrendingUp,
  FileText,
  Download,
  MapPin,
  Calendar,
  Award,
  XCircle,
  Loader2
} from "lucide-react";

interface DashboardData {
  totalApplications: number;
  statusSummary: {
    applied: number;
    interview: number;
    offer: number;
    rejected: number;
  };
  recentApplications: Array<{
    id: number;
    company: string;
    role: string;
    status: string;
    appliedDate: string;
    location: string;
    jobType: string;
    url?: string;
  }>;
  responseRate: number;
}

const defaultDashboardData: DashboardData = {
  totalApplications: 0,
  statusSummary: {
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0
  },
  recentApplications: [],
  responseRate: 0
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'applied':
      return <FileText className="h-4 w-4" />;
    case 'interview':
      return <Clock className="h-4 w-4" />;
    case 'offer':
      return <Award className="h-4 w-4" />;
    case 'rejected':
      return <XCircle className="h-4 w-4" />;
    default:
      return <Briefcase className="h-4 w-4" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'applied':
      return <Badge variant="secondary">Applied</Badge>;
    case 'interview':
      return <Badge variant="default">Interview</Badge>;
    case 'offer':
      return <Badge className="bg-green-500 hover:bg-green-600 text-white">Offer</Badge>;
    case 'rejected':
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function JobTrackerDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>(defaultDashboardData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard/stats');
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-5 mb-10 lg:pb-0 pb-6">
        <div className="relative md:grow-0">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job Application Tracker</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="h-8 gap-1 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export Data
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1 bg-blue-600 hover:bg-blue-700 text-white">
            <Briefcase className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Application
            </span>
          </Button>
        </div>
      </header>

      <main className="grid flex-1 items-start gap-4 px-4 sm:px-6 sm:py-0 md:gap-8">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {/* Total Applications */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.totalApplications}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +2 from last week
              </p>
            </CardContent>
          </Card>

          {/* Interviews */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Interviews</CardTitle>
              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.statusSummary.interview}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +1 from last week
              </p>
            </CardContent>
          </Card>

          {/* Offers */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Offers</CardTitle>
              <Award className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.statusSummary.offer}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +1 from last week
              </p>
            </CardContent>
          </Card>

          {/* Response Rate */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.responseRate}%</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Based on {dashboardData.totalApplications} applications
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* Recent Applications */}
          <Card className="xl:col-span-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle className="text-gray-900 dark:text-white">Recent Applications</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Your recent job applications and their status.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1 bg-blue-600 hover:bg-blue-700 text-white">
                <a href="/dashboard/my-applications">
                  View All
                  <TrendingUp className="h-4 w-4" />
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dashboardData.recentApplications.length > 0 ? (
                  dashboardData.recentApplications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                          {getStatusIcon(application.status)}
                        </div>
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                            {application.company} - {application.role}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {application.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {application.appliedDate}
                            </div>
                            <div>{application.jobType}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm">
                          {getStatusBadge(application.status)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400 mb-2">No applications yet</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">Start by adding your first job application</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Application Status */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Application Status</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Breakdown of your applications by status.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">Applied</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Waiting for response</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.statusSummary.applied}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                    <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">Interview</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Scheduled meetings</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.statusSummary.interview}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                    <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">Offer</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Job offers received</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.statusSummary.offer}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">Rejected</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Applications declined</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardData.statusSummary.rejected}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* Application Progress */}
          <Card className="xl:col-span-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Application Progress</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Your job search activity over the last 30 days.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-60 w-full flex items-center justify-center bg-gray-50 dark:bg-gray-700/20 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                  <p>Application Trends</p>
                  <p className="text-sm">Weekly application chart would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Manage your job applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  <Briefcase className="h-4 w-4" />
                  Add New Application
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <FileText className="h-4 w-4" />
                  Update Status
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Calendar className="h-4 w-4" />
                  Schedule Interview
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Download className="h-4 w-4" />
                  Export Applications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
