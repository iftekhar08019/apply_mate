"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useSignup from "@/hooks/useSignup";
import Link from "next/link";

type FormValues = {
  name: string;
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
    formState: { errors },
  } = useForm<FormValues>({ mode: "onBlur" });

  const [passwordStrength, setPasswordStrength] = useState({
    width: "0%",
    color: "",
  });
  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  // React Query signup hook
  const { mutateAsync, isPending } = useSignup();
  const router = useRouter();

  // Password strength meter
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
    }
    setPasswordStrength({ width, color });
  }, [password]);

  //  Submit handler
const onSubmit: SubmitHandler<FormValues> = async (data) => {
  try {
    // user create
    await mutateAsync({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    // auto-login
    const loginRes = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (loginRes?.ok) {
      toast.success("Account created and logged in successfully!");
      router.push("/dashboard"); // home বা dashboard
    } else {
      toast.error("Auto login failed, please login manually.");
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Signup failed";

    if (errorMessage.toLowerCase().includes("exists")) {
      toast.error("User already exists. Please log in.");
    } else {
      toast.error(errorMessage);
    }
  }
};


  //  Google Login
  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
      // Note: If successful, NextAuth will redirect automatically
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="name"
              type="text"
              {...register("name", { required: "Full name is required" })}
              placeholder="John Doe"
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500/50 focus:border-blue-500"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.name.message}
            </p>
          )}
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
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
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500/50 focus:border-blue-500"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.email.message}
            </p>
          )}
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="••••••••"
              className={`w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500/50 focus:border-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <div className="mt-2 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
              style={{ width: passwordStrength.width }}
            ></div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.password.message}
            </p>
          )}
        </motion.div>

        {/* Confirm Password */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="confirmPassword"
              type={confirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="••••••••"
              className={`w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500/50 focus:border-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setConfirmPassword(!confirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
            >
              {confirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.confirmPassword.message}
            </p>
          )}
        </motion.div>

        {/* Terms Agreement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="flex items-start gap-3 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-200/50 dark:border-blue-700/30">
            <input
              id="terms"
              type="checkbox"
              {...register("terms", { required: "You must accept the terms" })}
              className="w-4 h-4 mt-0.5 rounded accent-blue-600 cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
              I agree to the{" "}
              <Link href="/terms" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.terms.message}
            </p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: isPending ? 1 : 1.02 }}
          type="submit"
          disabled={isPending}
          className={`w-full bg-gradient-to-r from-[#0439e6] to-[#0051ff] text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:from-[#0051ff] hover:to-[#0439e6] shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 ${
            isPending ? "opacity-70 cursor-not-allowed" : ""
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </motion.button>
      </motion.form>

      {/* Divider */}
      <motion.div 
        className="my-6 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <hr className="w-full border-gray-300 dark:border-gray-600" />
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">OR</span>
        <hr className="w-full border-gray-300 dark:border-gray-600" />
      </motion.div>

      {/* Social Signup */}
      <motion.button
        type="button"
        onClick={handleGoogleLogin}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl py-3.5 font-semibold text-gray-700 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <FcGoogle size={24} />
        Continue with Google
      </motion.button>
    </>
  );
}
