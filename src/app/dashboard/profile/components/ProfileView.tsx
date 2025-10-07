"use client";
import Image from "next/image";
import React from "react";
import { User } from "../types/types";

interface Props {
  user: User;
  onEditClick: () => void;
}

export const ProfileView: React.FC<Props> = ({ user, onEditClick }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
      <Image
        width={200}
        height={200}
        src={user.image || "/userimage.png"}
        alt="Avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-gray-500">{user.email}</p>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {user.bio || "No bio yet."}
      </p>
      <button
        onClick={onEditClick}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Edit Profile
      </button>
    </div>
  );
};
