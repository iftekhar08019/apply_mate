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
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          {isEditing ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`${
                      activeTab === "profile"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`${
                      activeTab === "password"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Change Password
                  </button>
                </nav>
              </div>

              {activeTab === "profile" && (
                <EditProfileForm
                  user={user}
                  onUpdateSuccess={handleProfileUpdate}
                />
              )}
              {activeTab === "password" && <ChangePasswordForm />}

              <button
                onClick={() => setIsEditing(false)}
                className="mt-6 w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Cancel
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
