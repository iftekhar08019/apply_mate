"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Login data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="Enter your email"
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("remember")} className="accent-blue-600" />
          Remember me
        </label>
        <Link href="/" className="text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </button>

      <p className="text-xs text-gray-500 text-center">
        By creating an account, you agree to our{" "}
        <Link href="/" className="text-blue-600 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      {/* Sign up link */}
      <p className="text-sm text-center">
        Dont have an account?{" "}
        <Link href="/sign-up" className="text-blue-600 font-medium hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
