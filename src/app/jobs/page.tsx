"use client";
import { Button } from "@/components/ui/button";
import { useUserJobs } from "@/hooks/useUserJobs";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Briefcase,
  Building2,
  CalendarDays,
  ExternalLink,
  Grid3x3,
  List,
  MapPin,
  Search,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Job {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  url: string;
  date: string;
  status?: string;
}

export default function AllJobs() {
  const { data: session } = useSession();
  const email = session?.user?.email ?? undefined;

  // Fetch user-specific jobs
  const { data: jobs = [] } = useUserJobs(email);
  console.log(jobs);

  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Not logged in
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/50 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Please sign in to view your job applications
        </h2>
        <Button onClick={() => signIn("google")} className="px-6">
          Sign in with Google
        </Button>
      </div>
    );
  }

  // Filtered jobs
  const filteredJobs = jobs.filter((job: Job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = jobTypeFilter === "all" || job.type === jobTypeFilter;
    return matchesSearch && matchesType;
  });

  // Function to return status badge with color
  const getStatusBadge = (status?: string) => {
    if (!status)
      return (
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-sm">
          Not Updated
        </span>
      );

    const statusMap: Record<string, string> = {
      Applied: "bg-blue-500 text-white shadow-blue-200 dark:shadow-blue-900",
      Interview: "bg-cyan-400 text-white shadow-cyan-200 dark:shadow-cyan-900",
      Selected: "bg-green-500 text-white shadow-green-200 dark:shadow-green-900",
      Offer: "bg-green-500 text-white shadow-green-200 dark:shadow-green-900",
      Rejected: "bg-red-500 text-white shadow-red-200 dark:shadow-red-900",
    };

    const classes = statusMap[status] || "bg-gray-500 text-white shadow-gray-200 dark:shadow-gray-900";
    return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${classes} shadow-md`}>
        {status}
      </span>
    );
  };

  return (
    <TooltipProvider>
      <div
        className="relative flex flex-col justify-center items-center text-center py-24 md:py-32 bg-cover bg-center"
        style={{ backgroundImage: "url('/bannerapplication.jpg')" }}
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-white">
          <Briefcase className="h-4 w-4" />
          <span className="text-sm font-medium text-white">
            My Job Applications
          </span>
        </div>
        <h1 className="text-4xl font-bold mt-3 text-white">
          Track Your Job Journey
        </h1>
        <p className="text-lg mt-1 text-white max-w-2xl mx-auto">
          Stay on top of all the jobs you’ve applied for and easily track your
          progress.
        </p>
      </div>

      <div className="min-h-screen container mx-auto my-4 px-2">
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
          <p className="flex flex-col items-center justify-center text-center border-2 border-dashed border-blue-300 rounded-xl min-h-screen p-8 animate-fadeIn">
            <Briefcase className="w-30 h-30 text-gray-400 mb-4 animate-bounce" />
            <span className="text-lg font-semibold mb-2 animate-pulse">
              No jobs found
            </span>
            <span className="text-sm animate-pulse">
              It looks like no jobs have been added yet.
            </span>
          </p>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job: Job, index: number) => (
              <Card
                key={index}
                className="group relative rounded-2xl border border-blue-200/50 dark:border-blue-700/50 bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500" />
                
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                        {job.title}
                      </CardTitle>
                    </div>
                  </div>
                  
                  <CardDescription className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                    <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="truncate">{job.company}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>

                  {/* Job Type Badge */}
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      {job.type}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CalendarDays className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span>Posted: {new Date(job.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    {getStatusBadge(job.status)}
                  </div>

                  {/* Description Preview */}
                  {job.description && (
                    <div className="pt-2 border-t border-blue-200/50 dark:border-blue-700/50">
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  )}

                  {/* View Job Button */}
                  <Button
                    asChild
                    size="sm"
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      View Job Details
                      <ExternalLink className="w-4 h-4" />
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
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job: Job, index: number) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-muted/30 transition"
                  >
                    <td className="p-3">{job.title}</td>
                    <td className="p-3">{job.company}</td>
                    <td className="p-3">{job.location}</td>
                    <td className="p-3 capitalize">{job.type}</td>
                    <td className="p-3">
                      {new Date(job.date).toLocaleDateString()}
                    </td>
                    <td className="p-3">{getStatusBadge(job.status)}</td>
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
}
