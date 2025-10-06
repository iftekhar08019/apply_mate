"use client";
import axiosSecure from "@/hooks/useAxiosSecure";
import React, { useState } from "react";

import { toast } from "sonner";
import { User } from "../types/types";

interface Props {
  user: User;
  onUpdateSuccess: () => void;
}

export const EditProfileForm: React.FC<Props> = ({ user, onUpdateSuccess }) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || "");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = user.image;

      if (image) {
        const formData = new FormData();
        formData.append("avatar", image);

        const res = await fetch("/profile/upload-avatar", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        imageUrl = data.avatarUrl;
      }

      const res = await axiosSecure.patch("/profile/update", {
        name,
        bio,
        image: imageUrl,
      });
      toast.success("Profile updated successfully!");
      onUpdateSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        className="w-full p-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};
