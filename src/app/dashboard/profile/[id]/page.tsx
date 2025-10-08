"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Toaster } from "sonner";
import axiosSecure from "@/hooks/useAxiosSecure";
import { User } from "../types/types";
import { EditProfileForm } from "../components/EditProfileForm";
import { ChangePasswordForm } from "../components/ChangePasswordForm";
import { ProfileView } from "../components/ProfileView";

// Fetch function
const getLoggedInUser = async (): Promise<User | null> => {
  try {
    const res = await axiosSecure.get("/profile/user");
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: getLoggedInUser,
    enabled: status === "authenticated",
  });

  const handleProfileUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
    setIsEditing(false);
  };

  if (status === "loading" || isLoading)
    return <div className="p-10 text-center">Loading...</div>;
  if (status === "unauthenticated" || isError || !user)
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Please log in to view your profile.
      </div>
    );

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {isEditing ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Edit Your Profile
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Update your profile information and settings
                </p>
              </div>

              {/* Tabs */}
              <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`${
                      activeTab === "profile"
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-2 border-b-2 font-semibold text-sm transition-colors`}
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`${
                      activeTab === "password"
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-2 border-b-2 font-semibold text-sm transition-colors`}
                  >
                    Change Password
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === "profile" && (
                  <EditProfileForm
                    user={user}
                    onUpdateSuccess={handleProfileUpdate}
                  />
                )}
                {activeTab === "password" && <ChangePasswordForm />}
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => setIsEditing(false)}
                className="mt-6 w-full text-center py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancel and Go Back
              </button>
            </div>
          ) : (
            <ProfileView user={user} onEditClick={() => setIsEditing(true)} />
          )}
        </div>
      </div>
    </>
  );
}
