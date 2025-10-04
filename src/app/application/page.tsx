"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "@/hooks/useAxiosSecure";

// ShadCN UI & Lucide Icons
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Filter,
  Search,
  Building2,
  MapPin,
  CalendarDays,
  Briefcase,
  Link,
  ClipboardList,
  Edit,
  Trash,
} from "lucide-react";
import { toast } from "sonner";

type Application = {
  _id: string;
  company: string;
  role: string;
  location: string;
  source?: string;
  status: "applied" | "interview" | "offer" | "rejected";
  jobtype: "remote" | "hybrid" | "onsite";
  appliedDate?: string;
};

// Badge color helper
const getStatusBadgeClass = (status: Application["status"]) => {
  switch (status) {
    case "offer":
      return "bg-[#22c55e]";
    case "interview":
      return "bg-indigo-500 text-white";
    case "rejected":
      return "bg-red-500 text-white";
    case "applied":
    default:
      return "bg-gray-500 text-white";
  }
};

export default function ApplicationSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery<Application[]>({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      console.log(res);
      return res.data;
    },
  });

  const { mutate: addApplication, isPending: isAdding } = useMutation({
    mutationFn: (newApplication: Omit<Application, "_id">) =>
      axiosSecure.post("/applications", newApplication),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application added successfully!");
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to add application. Please try again.");
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newApp = {
      company: formData.get("company") as string,
      role: formData.get("role") as string,
      location: formData.get("location") as string,
      source: formData.get("source") as string,
      status: formData.get("status") as Application["status"],
      jobtype: formData.get("jobtype") as Application["jobtype"],
      appliedDate: formData.get("appliedDate") as string,
    };
    addApplication(newApp);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      {/* Header with image */}
      <div
        className="relative flex flex-col justify-center items-center text-center py-24 md:py-32 bg-cover bg-center"
        style={{ backgroundImage: "url('/bannerapplication.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-3xl px-4 text-white">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            The Path to Your Next Role
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Track all your job applications in one place. Stay organized and
            never miss an opportunity.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center md:items-start">
          <div className="relative flex-1 w-full md:w-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              placeholder="Search by company or role..."
              className="pl-10 w-full"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full md:w-auto"
            >
              <Filter size={16} /> Filter
            </Button>

            {/* Add Application Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 font-semibold w-full md:w-auto">
                  <Plus size={16} /> Add Application
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    Add New Job Application
                  </DialogTitle>
                  <DialogDescription>
                    Fill in the details below to track a new application.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input name="company" placeholder="Company *" required />
                    <Input name="role" placeholder="Role *" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input name="location" placeholder="Location *" required />
                    <Input
                      name="source"
                      placeholder="Source (e.g., LinkedIn)"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Select name="status" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select name="jobtype" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Job Type *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="onsite">Onsite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label
                      htmlFor="appliedDate"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Applied Date
                    </label>
                    <Input
                      id="appliedDate"
                      type="date"
                      name="appliedDate"
                      className="mt-1"
                    />
                  </div>
                  <DialogFooter className="flex gap-2 justify-end">
                    <DialogClose asChild>
                      <Button type="button" variant="ghost">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isAdding}>
                      {isAdding ? "Saving..." : "Save Application"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Applications Grid */}
        {isLoading && <p>Loading applications...</p>}
        {isError && (
          <p className="text-red-500">Failed to load applications.</p>
        )}
        {!isLoading && !isError && applications.length === 0 && (
          <div className="text-center py-16 px-6 border-2 border-dashed rounded-lg">
            <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              No applications yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first job application.
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <Card
              key={app._id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {app.role}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-1 text-gray-500 dark:text-gray-400 text-lg">
                      <Building2 size={14} /> {app.company}
                    </CardDescription>
                  </div>
                  <Badge
                    className={`capitalize text-sm ${getStatusBadgeClass(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-2 text-lg text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin size={14} /> {app.location}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={14} />{" "}
                  <span className="capitalize">{app.jobtype}</span>
                </div>
                {app.source && (
                  <div className="flex items-center gap-2">
                    <Link size={14} /> {app.source}
                  </div>
                )}
                {app.appliedDate && (
                  <div className="flex items-center gap-2">
                    <CalendarDays size={14} /> Applied on{" "}
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-300 dark:border-blue-600 bg-blue-600 dark:text-blue-300 hover:bg-blue-100 text-white px-6"
                >
                  <Edit/>
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash/>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}