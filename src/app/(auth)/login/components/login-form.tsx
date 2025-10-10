"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 👈 loading state

  const onSubmit = async (data: FormValues) => {
    setLoading(true); // 👈 start loading
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      toast.error("Invalid email or password");
      setLoading(false);
    } else {
      toast.success("Welcome Back");
      router.push("/");
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signIn("google", { callbackUrl: "/dashboard" });
      // Note: If successful, NextAuth will redirect automatically
      // No need for manual redirect here
    } catch {
      toast.error("Google login failed");
      setLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Email */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="you@example.com"
            className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.email
                ? "border-red-500 focus:ring-red-500/50"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500/50 focus:border-blue-500"
            }`}
            disabled={loading}
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
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            placeholder="••••••••"
            className={`w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.password
                ? "border-red-500 focus:ring-red-500/50"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500/50 focus:border-blue-500"
            }`}
            disabled={loading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.password.message}
          </p>
        )}
      </motion.div>

      {/* Remember and Forgot */}
      <motion.div 
        className="flex items-center justify-between text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            {...register("remember")}
            className="w-4 h-4 accent-blue-600 rounded"
            disabled={loading}
          />
          <span className="select-none">Remember me</span>
        </label>
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition">
          Forgot Password?
        </Link>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        className={`w-full bg-gradient-to-r from-[#0439e6] to-[#0051ff] text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:from-[#0051ff] hover:to-[#0439e6] shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
            Signing in...
          </span>
        ) : (
          "Sign In"
        )}
      </motion.button>

      {/* Or Divider */}
      <motion.div 
        className="flex items-center gap-3 my-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <hr className="flex-1 border-gray-300 dark:border-gray-600" />
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">OR</span>
        <hr className="flex-1 border-gray-300 dark:border-gray-600" />
      </motion.div>

      {/* Social Login Button */}
      <motion.button
        onClick={handleGoogleLogin}
        type="button"
        disabled={loading}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl py-3.5 font-semibold text-gray-700 dark:text-gray-200 transition-all duration-300 disabled:opacity-60 shadow-sm hover:shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <FcGoogle size={24} />
        Continue with Google
      </motion.button>

      {/* Terms */}
      <motion.p 
        className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        By signing in, you agree to our{" "}
        <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
          Terms of Service
        </Link>
      </motion.p>
    </motion.form>
  );
}
