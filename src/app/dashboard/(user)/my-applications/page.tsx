"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useUserJobs } from "@/hooks/useUserJobs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  List,
  Grid3x3,
  Search,
  Briefcase,
  Building2,
  MapPin,
  CalendarDays,
  Pencil,
  Trash2,
  Loader2,
  ExternalLink,
  Clock,
  CheckCircle,
  Sparkles,
  Filter,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditModal } from "./components/edit-modal";
import axiosSecure from "@/hooks/useAxiosSecure";
import Link from "next/link";

interface Job {
  uid: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  url: string;
  date: string;
  status?: string;
}

const MyApplicationPage: React.FC = () => {
  const { data: session } = useSession();
  const email = session?.user?.email ?? undefined;
  const queryClient = useQueryClient();

  // Fetch user-specific jobs
  const { data: jobs = [], isLoading } = useUserJobs(email);

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

  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingUid, setDeletingUid] = useState<string | null>(null);
  //Delete Job Mutation
  const deleteMutation = useMutation({
    mutationFn: async (uid: string) => {
      setDeletingUid(uid);
      await axiosSecure.delete(`/jobs?email=${email}&uid=${uid}`);
    },
    onSuccess: () => {
      toast.success("Job deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["userJobs", email] });
    },
    onError: () => {
      toast.error("Failed to delete job");
    },
    onSettled: () => {
      setDeletingUid(null);
    },
  });

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/50 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Please sign in to view your job applications
        </h2>
        <Link
          href="/signup"
          className=" border px-6 py-3 font-bold text-xl bg-blue-600 rounded-xl text-white"
        >
          SignUp
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  //  Filter Jobs
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
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white border border-blue-600 px-4 py-2 rounded-full shadow-lg mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium uppercase tracking-wide">My Job Applications</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Track Your{" "}
            <span className="text-blue-600 dark:text-blue-400">Job Journey</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Manage all your job applications in one place with AI-powered tracking and insights
          </p>
        </div>

        {/* Search & Filters Card */}
        <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400 h-5 w-5" />
              <Input
                placeholder="Search by company or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 focus:border-blue-500 focus:ring-blue-500 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>

            {/* Filter and View Controls */}
            <div className="flex items-center gap-3">
              <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                <SelectTrigger className="w-[160px] h-12 bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 rounded-xl">
                  <Filter className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">Onsite</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-1 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-xl p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-blue-50 dark:hover:bg-blue-900/30"}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("table")}
                  className={viewMode === "table" ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-blue-50 dark:hover:bg-blue-900/30"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredJobs.length}</span> of <span className="font-semibold text-blue-600 dark:text-blue-400">{jobs.length}</span> applications
          </div>
        </div>

        {/* Job Cards / Table View */}
        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 p-12 bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-md rounded-2xl shadow-lg">
            <Briefcase className="w-20 h-20 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Jobs Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              No jobs found matching your criteria. Try adjusting your filters or add new applications.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          // GRID VIEW
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job: Job) => (
              <Card
                key={job.uid}
                className="group relative rounded-2xl border border-blue-200/50 dark:border-blue-700/50 bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500" />
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                          {job.title}
                        </CardTitle>
                      </div>
                    </div>
                    {job.url && (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex-shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
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
                    <span>Applied: {new Date(job.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
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

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedJob(job);
                        setIsModalOpen(true);
                      }}
                      className="flex-1 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors"
                    >
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deletingUid === job.uid}
                      onClick={() => deleteMutation.mutate(job.uid)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      {deletingUid === job.uid ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" /> 
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // TABLE VIEW
          <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-muted/30 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job: Job) => (
                  <tr
                    key={job.uid}
                    className="border-t hover:bg-muted/10 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                      {job.title}
                    </td>
                    <td className="px-4 py-3">{job.company}</td>
                    <td className="px-4 py-3">{job.location}</td>
                    <td className="px-4 py-3 capitalize">{job.type}</td>
                    <td className="px-4 py-3">
                      {new Date(job.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 flex flex-wrap gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedJob(job);
                          setIsModalOpen(true);
                        }}
                      >
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={deletingUid === job.uid}
                        onClick={() => deleteMutation.mutate(job.uid)}
                        className="bg-red-700 text-white"
                      >
                        {deletingUid === job.uid ? (
                          "Deleting..."
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedJob && (
        <EditModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          job={selectedJob}
          email={email!}
        />
      )}
    </TooltipProvider>
  );
};

export default MyApplicationPage;
