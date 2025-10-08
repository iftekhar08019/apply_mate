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

  return (
    <>
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
          {/* Header Section */}

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
            <p
              className="flex flex-col items-center justify-center text-center border-2 border-dashed border-blue-300 rounded-xl min-h-screen
              p-8 animate-fadeIn"
            >
              <Briefcase className="w-30 h-30 text-gray-400 mb-4 animate-bounce" />
              <span className="text-lg font-semibold mb-2 animate-pulse">
                No jobs found
              </span>
              <span className="text-sm animate-pulse">
                It looks like no jobs have been added yet.
              </span>
            </p>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredJobs.map((job: Job, index: number) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.03]"
                >
                  {/* Decorative top shape */}
                  <div className="absolute top-0 left-0 w-full h-16 bg-blue-400 rounded-b-full opacity-30 -z-10"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-500" />
                      <span className="truncate block max-w-[200px] dark:text-white">
                        {job.title}
                      </span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3 text-sm text-muted-foreground relative z-10">
                    <CardDescription className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="w-4 h-4 text-blue-500" />
                      {job.company}
                    </CardDescription>

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
                      <span>
                        Posted: {new Date(job.date).toLocaleDateString()}
                      </span>
                    </div>

                    <Button
                      asChild
                      size="sm"
                      className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white transition-transform duration-300 hover:scale-[1.05]"
                    >
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
    </>
  );
}
