"use client";

import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useUserJobs } from "@/hooks/useUserJobs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";
import { List, Grid3x3, Search, Briefcase, Building2, MapPin, CalendarDays, ExternalLink } from "lucide-react";
import Loading from "./loading";
import { GmailIntegration } from "./components/GmailIntegration";
import { Toaster } from "sonner";

interface Job {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  url: string;
  date: string;
}

const MyApplicationPage: React.FC = () => {
  const { data: session } = useSession();
  const email = session?.user?.email ?? undefined;

  // Fetch user-specific jobs
  const { data: jobs = [], isLoading } = useUserJobs(email);

  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Not logged in
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/50 text-center">
        <h2 className="text-3xl font-semibold mb-4">Please sign in to view your job applications</h2>
        <Button onClick={() => signIn("google")} className="px-6">
          Sign in with Google
        </Button>
      </div>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <Loading />
    )
  }

  // Filtered jobs
  const filteredJobs = jobs.filter((job: Job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = jobTypeFilter === "all" || job.type === jobTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <TooltipProvider>
      <Toaster position="top-center" />
      <div className="min-h-screen p-6 bg-background">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full">
            <Briefcase className="h-4 w-4" />
            <span className="text-sm font-medium">My Job Applications</span>
          </div>
          <h1 className="text-4xl font-bold mt-3">Track Your Job Journey</h1>
          <p className="text-muted-foreground text-lg mt-1 max-w-2xl mx-auto">
            Stay on top of all the jobs you&apos;ve applied for and easily track your progress.
          </p>
        </div>

        {/* Gmail Integration Section */}
        <div className="mb-8 max-w-4xl mx-auto">
          <GmailIntegration userEmail={email} />
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by company or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">Onsite</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Job Data Display */}
        {filteredJobs.length === 0 ? (
          <p className="text-center text-muted-foreground mt-20 text-lg">
            No jobs found matching your criteria.
          </p>
        ) : viewMode === "grid" ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredJobs.map((job : Job, index : number) => (
        <Card
          key={index}
          className="group relative rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          

          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-500" />
              {job.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-4 h-4 text-gray-400" />
              {job.company}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{job.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-500" />
              <span>Type: {job.type}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-blue-500" />
              <span>Posted: {new Date(job.date).toLocaleDateString()}</span>
            </div>

            <Button
              asChild
              size="sm"
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-300 hover:scale-[1.02]"
            >
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                View Job
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-3 font-medium">Title</th>
                  <th className="p-3 font-medium">Company</th>
                  <th className="p-3 font-medium">Location</th>
                  <th className="p-3 font-medium">Type</th>
                  <th className="p-3 font-medium">Posted</th>
                  <th className="p-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job: Job, index: number) => (
                  <tr key={index} className="border-t hover:bg-muted/30 transition">
                    <td className="p-3">{job.title}</td>
                    <td className="p-3">{job.company}</td>
                    <td className="p-3">{job.location}</td>
                    <td className="p-3 capitalize">{job.type}</td>
                    <td className="p-3">{new Date(job.date).toLocaleDateString()}</td>
                    <td className="p-3">
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default MyApplicationPage;
