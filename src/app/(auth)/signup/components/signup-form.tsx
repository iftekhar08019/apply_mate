"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, Lock, User, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

import { FcGoogle } from "react-icons/fc";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};


export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "onBlur" });

  const [passwordStrength, setPasswordStrength] = useState({
    width: "0%",
    color: "",
  });
  const password = watch("password");

  useEffect(() => {
    let score = 0;
    if (!password) {
      setPasswordStrength({ width: "0%", color: "" });
      return;
    }
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 8) score++;

    let width = "0%";
    let color = "";
    switch (score) {
      case 1:
        width = "20%";
        color = "bg-red-500";
        break;
      case 2:
        width = "40%";
        color = "bg-orange-500";
        break;
      case 3:
        width = "60%";
        color = "bg-yellow-500";
        break;
      case 4:
        width = "80%";
        color = "bg-lime-500";
        break;
      case 5:
        width = "100%";
        color = "bg-green-500";
        break;
      default:
        break;
    }
    setPasswordStrength({ width, color });
  }, [password]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Signup data:", data);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="mt-2">Start your journey with us today.</p>
      </div>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Full Name */}
        <motion.div variants={itemVariants}>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium  mb-1"
          >
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="fullName"
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              placeholder="John Doe"
              className={`w-full pl-10 pr-3 py-2.5  bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.fullName
                  ? "border-red-500/50 focus:ring-red-500"
                  : " focus:ring-blue-500"
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.fullName.message}
            </p>
          )}
        </motion.div>

        {/* Email */}
        <motion.div variants={itemVariants}>
          <label
            htmlFor="email"
            className="block text-sm font-medium  mb-1"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="you@example.com"
              className={`w-full pl-10 pr-3 py-2.5 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.email
                  ? "border-red-500/50 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.email.message}
            </p>
          )}
        </motion.div>

        {/* Password */}
        <motion.div variants={itemVariants}>
          <label
            htmlFor="password"
            className="block text-sm font-medium  mb-1"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="••••••••"
              className={`w-full pl-10 pr-3 py-2.5 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.password
                  ? "border-red-500/50 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
          </div>
          <div className="mt-2 h-1.5 w-full bg-gray-600 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
              style={{ width: passwordStrength.width }}
            ></div>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.password.message}
            </p>
          )}
        </motion.div>

        {/* Confirm Password */}
        <motion.div variants={itemVariants}>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium  mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="••••••••"
              className={`w-full pl-10 pr-3 py-2.5 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.confirmPassword
                  ? "border-red-500/50 focus:ring-red-500"
                  : "border-white/20 focus:ring-blue-500"
              }`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.confirmPassword.message}
            </p>
          )}
        </motion.div>

        {/* Terms Agreement */}
        <motion.div variants={itemVariants}>
          <div className="flex items-start gap-3">
            <input
              id="terms"
              type="checkbox"
              {...register("terms", { required: "You must accept the terms" })}
              className="h-4 w-4 mt-0.5 rounded bg-white/10 border-white/30 text-blue-500 focus:ring-blue-600 accent-blue-500"
            />
            <label htmlFor="terms" className="text-sm ">
              I agree to the{" "}
              <a href="#" className="font-medium text-blue-400 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-blue-400 hover:underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.terms.message}
            </p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          variants={itemVariants}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-300 disabled:bg-blue-400"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </motion.button>
      </motion.form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <hr className="w-full border-t-2 border-gray-800" />
        <span className="text-sm">OR</span>
        <hr className="w-full border-t-2 border-gray-800" />
      </div>

      {/* Social Signup */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-3 py-2.5 border border-blue-600 rounded-lg hover:bg-white/10 transition-colors duration-300"
      >
      
    <FcGoogle/>
        Sign Up with Google
      </motion.button>
    </>
  );
}
