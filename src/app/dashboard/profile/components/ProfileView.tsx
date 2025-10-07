"use client";
import Image from "next/image";
import React from "react";
import { User } from "../types/types";
import { MailCheck, User2 } from "lucide-react";

interface Props {
  user: User;
  onEditClick: () => void;
}

export const ProfileView: React.FC<Props> = ({ user, onEditClick }) => {
  return (
    <div>
      <div className="rounded-xl overflow-hidden">
        {/* Cover Image Section */}
        <div className="relative">
          <Image
            width={1200}
            height={400}
            src={user.coverImage || "/applicationbanner.jpg"}
            alt="Cover image"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Main Content Section */}
        <div className="p-6">
          {/* Profile Picture and Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            {/* Profile Picture with Progress Ring */}
            <div className="relative -mt-24 ml-4">
              <div className="w-32 h-32 rounded-full p-1">
                <div className="bg-white dark:bg-gray-800 rounded-full p-1">
                  <Image
                    width={128}
                    height={128}
                    src={user.image || "/userimage.png"}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <button
                onClick={onEditClick}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* User Info Section */}
          <div className="mt-4 space-y-4">
            <h1 className="text-2xl font-bold flex gap-2 items-center">
              <User2 size={20} /> {user.name}
            </h1>
            <p className="text-lg flex gap-2 items-center">
              <MailCheck size={20} /> {user.email}
            </p>

            <p>{user.bio || "No bio yet. Click 'Edit Profile' to add one."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
