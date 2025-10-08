"use client";
import axiosSecure from "@/hooks/useAxiosSecure";
import React, { useState } from "react";
import { toast } from "sonner";
import { User } from "../types/types";
import { Upload, User as UserIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  user: User;
  onUpdateSuccess: () => void;
}

export const EditProfileForm: React.FC<Props> = ({ user, onUpdateSuccess }) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || "");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = user.image;

      // Upload new image if selected
      if (image) {
        toast.loading("Uploading image...");
        const formData = new FormData();
        formData.append("avatar", image);

        const uploadRes = await axiosSecure.post("/profile/upload-avatar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = uploadRes.data.avatarUrl;
        toast.dismiss();
      }

      // Update profile
      await axiosSecure.patch("/profile/update", {
        name,
        bio,
        image: imageUrl,
      });

      toast.success("Profile updated successfully!");
      onUpdateSuccess();
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Image Upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32">
          {imagePreview || user.image ? (
            <Image
              src={imagePreview || user.image || ""}
              alt="Profile"
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <UserIcon className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>
        
        <label className="cursor-pointer">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          PNG, JPG or WEBP (Max 5MB)
        </p>
      </div>

      {/* Name Input */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          required
        />
      </div>

      {/* Bio Textarea */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {bio.length}/500 characters
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {loading ? "Updating Profile..." : "Save Changes"}
      </button>
    </form>
  );
};
