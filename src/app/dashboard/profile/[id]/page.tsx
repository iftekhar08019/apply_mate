"use client";

import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import axiosSecure from "@/hooks/useAxiosSecure";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

const getUser = async (id: string): Promise<User | null> => {
  try {
    const res = await axiosSecure.get(`/users/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });

  if (isLoading) {
    return (
      <div className="p-10 text-center text-gray-500 font-medium">
        Loading user data...
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        User not found!
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
      <div className="flex flex-col items-center">
        <Image
          src={user.avatar || "/user.jpg"}
          alt={'user-img'}
          className="w-24 h-24 rounded-full border mb-3"
          width={150}
          height={50}
        />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {user.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        {user.bio && (
          <p className="mt-3 text-gray-700 dark:text-gray-300">{user.bio}</p>
        )}
      </div>
    </div>
  );
}
