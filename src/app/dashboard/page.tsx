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
  MapPin,
  Calendar,
  Award,
  XCircle,
  Loader2,
  Sparkles,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AddJobModal } from "./components/AddJobModal";

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
      return <Badge className="bg-blue-500 text-white">Applied</Badge>;
    case 'interview':
      return <Badge className="bg-cyan-400 text-white">Interview</Badge>;
    case 'offer':
      return <Badge className="bg-green-500 text-white">Offer</Badge>;
    case 'rejected':
      return <Badge className="bg-red-500 text-white">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function JobTrackerDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>(defaultDashboardData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);

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

  const statCards = [
    {
      title: "Total Applications",
      value: dashboardData.totalApplications,
      icon: Briefcase,
      iconBg: "bg-blue-600 dark:bg-blue-500",
      change: "+2 from last week",
      gradient: "from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20"
    },
    {
      title: "Interviews",
      value: dashboardData.statusSummary.interview,
      icon: Clock,
      iconBg: "bg-cyan-500 dark:bg-cyan-400",
      change: "+1 from last week",
      gradient: "from-cyan-50/80 to-blue-50/60 dark:from-cyan-900/30 dark:to-blue-900/20"
    },
    {
      title: "Offers",
      value: dashboardData.statusSummary.offer,
      icon: Award,
      iconBg: "bg-green-600 dark:bg-green-500",
      change: "+1 from last week",
      gradient: "from-green-50/80 to-emerald-50/60 dark:from-green-900/30 dark:to-emerald-900/20"
    },
    {
      title: "Rejected",
      value: dashboardData.statusSummary.rejected,
      icon: XCircle,
      iconBg: "bg-red-600 dark:bg-red-500",
      change: "Better luck next time",
      gradient: "from-red-50/80 to-orange-50/60 dark:from-red-900/30 dark:to-orange-900/20"
    },
    {
      title: "Response Rate",
      value: `${dashboardData.responseRate}%`,
      icon: TrendingUp,
      iconBg: "bg-purple-600 dark:bg-purple-500",
      change: `Based on ${dashboardData.totalApplications} applications`,
      gradient: "from-purple-50/80 to-pink-50/60 dark:from-purple-900/30 dark:to-pink-900/20"
    }
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white border border-blue-600 px-4 py-2 rounded-full shadow-lg mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium uppercase tracking-wide">Dashboard Overview</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Welcome Back to{" "}
            <span className="text-blue-600 dark:text-blue-400">Apply Mate</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Here&apos;s an overview of your job application journey
          </p>
        </motion.div>

        {/* Add Application Button */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button
            onClick={() => setIsAddJobModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Application
          </Button>
        </motion.div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`bg-gradient-to-br ${stat.gradient} border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.iconBg} rounded-lg p-2 shadow-md`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:gap-8 grid-cols-1 xl:grid-cols-3">
        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="xl:col-span-2"
        >
          <Card className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-md shadow-lg">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Recent Applications
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Your latest job applications and their current status
                </CardDescription>
              </div>
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md w-full sm:w-auto">
                <Link href="/dashboard/my-applications" className="flex items-center justify-center gap-2">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentApplications.length > 0 ? (
                  dashboardData.recentApplications.map((application) => (
                    <div 
                      key={application.id} 
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-blue-200/30 dark:border-blue-700/30 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          application.status.toLowerCase() === 'applied' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                          application.status.toLowerCase() === 'interview' ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' :
                          application.status.toLowerCase() === 'offer' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                          'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        } flex-shrink-0`}>
                          {getStatusIcon(application.status)}
                        </div>
                        <div className="grid gap-1 flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                            {application.company} - {application.role}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1 min-w-0">
                              <MapPin className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{application.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 flex-shrink-0" />
                              <span className="whitespace-nowrap">{application.appliedDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-start sm:self-center">
                        {getStatusBadge(application.status)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white/30 dark:bg-gray-800/30 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                    <Briefcase className="h-16 w-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                    <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">No applications yet</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Start by adding your first job application</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Application Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Status Breakdown
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Your applications by current status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Applied */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Applied</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Waiting for response</p>
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {dashboardData.statusSummary.applied}
                </div>
              </div>
              
              {/* Interview */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Interview</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Scheduled meetings</p>
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  {dashboardData.statusSummary.interview}
                </div>
              </div>
              
              {/* Offer */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Offer</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Job offers received</p>
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                  {dashboardData.statusSummary.offer}
                </div>
              </div>
              
              {/* Rejected */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                    <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Rejected</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Applications declined</p>
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">
                  {dashboardData.statusSummary.rejected}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add Job Modal */}
      <AddJobModal
        open={isAddJobModalOpen}
        onOpenChange={setIsAddJobModalOpen}
        onSuccess={() => window.location.reload()}
      />
    </div>
  );
}
