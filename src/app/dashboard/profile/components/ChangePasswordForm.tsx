"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import axiosSecure from "@/hooks/useAxiosSecure";

export const ChangePasswordForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosSecure.post("/profile/change-password", { currentPassword, newPassword });
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="password"
        value={currentPassword}
        onChange={e => setCurrentPassword(e.target.value)}
        placeholder="Current Password"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        placeholder="New Password"
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">
        {loading ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
};
