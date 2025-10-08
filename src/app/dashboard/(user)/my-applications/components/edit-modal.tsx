"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosSecure from "@/hooks/useAxiosSecure";

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

interface EditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job;
  email: string;
}

export const EditModal: React.FC<EditModalProps> = ({
  open,
  onOpenChange,
  job,
  email,
}) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: job?.title || "",
    company: job?.company || "",
    location: job?.location || "",
    type: job?.type || "",
    description: job?.description || "",
    url: job?.url || "",
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.put("/jobs/update", {
        email,
        uid: job.uid,
        updatedJob: { ...formData, date: job.date },
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Job updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["userJobs", email] });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Failed to update job");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <Input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter job location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <Input
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g. Remote, On-site, Hybrid"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Job URL</label>
            <Input
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Paste job link"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short job description"
              className="w-full border rounded-md p-2 text-sm"
              rows={3}
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
