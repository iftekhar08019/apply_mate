"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Briefcase } from "lucide-react";
import { useSession } from "next-auth/react";

interface AddJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const AddJobModal: React.FC<AddJobModalProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "remote",
    description: "",
    url: "",
    status: "Applied",
    date: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim() || !formData.company.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!session?.user?.email) {
      toast.error("You must be logged in to add applications");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/saveJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          job: formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.isDuplicate) {
          toast.warning("This job already exists in your applications");
        } else {
          toast.success(`Job saved successfully! Total jobs: ${data.totalJobs}`);
          
          // Reset form
          setFormData({
            title: "",
            company: "",
            location: "",
            type: "remote",
            description: "",
            url: "",
            status: "Applied",
            date: new Date().toISOString().split('T')[0],
          });

          // Close modal
          onOpenChange(false);

          // Call success callback
          if (onSuccess) {
            onSuccess();
          }
        }
      } else {
        toast.error(data.error || "Failed to save job");
      }
    } catch {
      // console.error("Error occurred");
      toast.error("An error occurred while saving the job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50/95 to-cyan-50/95 dark:from-blue-900/95 dark:to-cyan-900/95 backdrop-blur-xl border border-blue-200 dark:border-blue-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            Add New Application
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Manually add a job application to track your progress
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-900 dark:text-white font-medium">
              Job Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Senior Frontend Developer"
              className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-gray-900 dark:text-white font-medium">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="e.g., Google, Microsoft, etc."
              className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-gray-900 dark:text-white font-medium">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., San Francisco, CA or Remote"
              className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Job Type and Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Job Type */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-gray-900 dark:text-white font-medium">
                Job Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700">
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">Onsite</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-900 dark:text-white font-medium">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700">
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url" className="text-gray-900 dark:text-white font-medium">
              Job URL
            </Label>
            <Input
              id="url"
              name="url"
              type="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://..."
              className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Applied Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-gray-900 dark:text-white font-medium">
              Applied Date
            </Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-900 dark:text-white font-medium">
              Job Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Paste the job description here..."
              rows={5}
              className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 focus:border-blue-500 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-300 dark:border-gray-600"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Briefcase className="w-4 h-4 mr-2" />
                  Add Application
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

