"use client";
import Image from "next/image";
import React from "react";
import { User } from "../types/types";
import { 
  MailCheck, 
  User2, 
  Edit3, 
  Briefcase, 
  Calendar,
  MapPin,
  Link as LinkIcon
} from "lucide-react";

interface Props {
  user: User;
  onEditClick: () => void;
}

export const ProfileView: React.FC<Props> = ({ user, onEditClick }) => {
  // Calculate account age
  const accountAge = user.createdAt 
    ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Main Card with Glass Effect */}
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        {/* Cover Image Section with Gradient Overlay */}
        <div className="relative h-64 sm:h-80">
          <Image
            width={1200}
            height={320}
            src={user.coverImage || "/applicationbanner.jpg"}
            alt="Cover image"
            className="w-full h-full object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900" />
          
          {/* Edit Button - Floating on Cover */}
          <button
            onClick={onEditClick}
            className="absolute top-4 right-4 px-6 py-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group"
          >
            <Edit3 size={18} className="group-hover:rotate-12 transition-transform" />
            Edit Profile
          </button>
        </div>

        {/* Main Content Section */}
        <div className="relative px-6 sm:px-8 pb-8">
          {/* Profile Picture with Ring */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-20 sm:-mt-24">
            <div className="relative group">
              {/* Animated Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition-all duration-300 animate-pulse" />
              
              {/* Profile Image */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white dark:bg-gray-900 p-2">
                <Image
                  width={160}
                  height={160}
                  src={user.image || "/userimage.png"}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-900"
                  priority
                />
                {/* Online Status Badge */}
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-white dark:border-gray-900" />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-3 flex-wrap">
              <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2">
                  <Briefcase size={20} className="text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Applications</p>
                    <p className="text-lg font-bold text-blue-700 dark:text-blue-300">0</p>
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Member for</p>
                    <p className="text-lg font-bold text-purple-700 dark:text-purple-300">{accountAge}d</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Info Section */}
          <div className="mt-8 space-y-6">
            {/* Name and Email */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <User2 size={32} className="text-blue-600 dark:text-blue-400" />
                {user.name}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                <p className="flex items-center gap-2 text-lg">
                  <MailCheck size={20} className="text-green-600 dark:text-green-400" />
                  {user.email}
                </p>
                
                {user.provider && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium capitalize">
                    {user.provider} Account
                  </span>
                )}
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                About Me
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                {user.bio || (
                  <span className="italic text-gray-400 dark:text-gray-500">
                    No bio yet. Click &apos;Edit Profile&apos; to add one and tell others about yourself.
                  </span>
                )}
              </p>
            </div>

            {/* Additional Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Location Card */}
              <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <MapPin size={20} className="text-gray-400 dark:text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {user.location || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Website Card */}
              <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <LinkIcon size={20} className="text-gray-400 dark:text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</p>
                  {user.website ? (
                    <a 
                      href={user.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {user.website}
                    </a>
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">Not specified</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
