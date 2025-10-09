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
} from "lucide-react";
import { GmailIntegration } from "./components/GmailIntegration";
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
}

const MyApplicationPage: React.FC = () => {
  const { data: session } = useSession();
  const email = session?.user?.email ?? undefined;
  const queryClient = useQueryClient();

  // Fetch user-specific jobs
  const { data: jobs = [], isLoading } = useUserJobs(email);

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
      <div className="min-h-screen p-6 bg-background">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full">
            <Briefcase className="h-4 w-4" />
            <span className="text-sm font-medium">My Job Applications</span>
          </div>
          <h1 className="text-4xl font-bold mt-3">Track Your Job Journey</h1>
          <p className="text-muted-foreground text-lg mt-1 max-w-2xl mx-auto">
            Stay on top of all the jobs you&apos;ve applied for and easily track
            your progress.
          </p>
        </div>

        {/* Gmail Integration */}
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

        {/* Job Cards / Table View */}
        {filteredJobs.length === 0 ? (
          <p className="text-center text-muted-foreground mt-20 text-lg">
            No jobs found matching your criteria.
          </p>
        ) : viewMode === "grid" ? (
          // GRID VIEW
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job: Job) => (
              <Card
                key={job.uid}
                className="group relative rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="truncate block max-w-[200px]">
                      {job.title}
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <CardDescription className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="w-4 h-4 text-gray-400" />
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

                  <div className="flex gap-2 mt-3">
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
