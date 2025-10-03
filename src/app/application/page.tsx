"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


export default function ApplicationSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [applications, setApplications] = useState<any[]>([]);
  // handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newApp = {
      company: formData.get("company"),
      role: formData.get("role"),
      location: formData.get("location"),
      source: formData.get("source"),
      status: formData.get("status"),
      jobType: formData.get("jobType"),
      appliedDate: formData.get("appliedDate"),
    };
    setApplications((prev) => [...prev, newApp]);
    e.currentTarget.reset();
  };
  

  return (
    <section
      className="relative bg-cover bg-center py-20"
      style={{ backgroundImage: "url('/bannerapplication.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0" />
      <div className="relative z-10 container mx-auto text-white">
        <h1 className="text-3xl md:text-5xl font-bold">
          Manage Your Job Applications
        </h1>
        <p className="my-5 text-gray-200">
          Manage all your applied jobs in one place. Stay organized with
          filters, search, and real-time updates.
        </p>

        {/* Search + Filter + Add Button */}
        <div className="flex gap-5">
          <Input
            placeholder="Search applications..."
            className="bg-white text-black w-1/2"
          />
          <Button variant="secondary" className="flex items-center gap-2">
            <Filter size={16} /> Filter
          </Button>

          {/* Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 font-bold bg-white text-blue-600 hover:text-white">
                <Plus size={16} /> Add Application
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Job Application</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                <div className="flex gap-4">
                  <Input name="company" placeholder="Company *" required />
                  <Input name="role" placeholder="Role *" required />
                </div>
                <div className="flex gap-4">
                  <Input name="location" placeholder="Location *" required />
                  <Input name="source" placeholder="Source" />
                </div>

                {/* Status + Job Type */}

                <div className="w-full">
                  <Select name="status">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="reject">Rejected</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full">
                  <Select name="jobType">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">Onsite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Applied Date */}
                <Input
                  type="date"
                  name="appliedDate"
                  placeholder="Applied Date"
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Applications List */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {applications.length === 0 && (
            <p className="text-gray-200 text-2xl">
              No applications yet. Add one above.
            </p>
          )}

          {applications.map((app, idx) => (
            <div
              key={idx}
              className="bg-white text-black p-4 rounded-lg shadow"
            >
              <h3 className="font-bold text-lg">{app.role}</h3>
              <p className="text-sm">
                {app.company} - {app.location}
              </p>
              <p className="mt-2 text-sm">Status: {app.status}</p>
              <p className="text-sm">Type: {app.jobType}</p>
              <p className="text-sm">Source: {app.source}</p>
              {app.appliedDate && (
                <p className="text-sm">Applied Date: {app.appliedDate}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
