"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    setLoading(true);
    const res = await signIn("google", { redirect: false });
    if (res?.error) {
      toast.error("Google login failed");
      setLoading(false);
    } else {
      toast.success("Logged in with Google");
      router.push("/");
    }
  };

  // GitHub Login
  const handleGitHubLogin = async () => {
    setLoading(true);
    const res = await signIn("github", { redirect: false });
    if (res?.error) {
      toast.error("GitHub login failed");
      setLoading(false);
    } else {
      toast.success("Logged in with GitHub");
      router.push("/");
    }
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
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
            disabled={loading}
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
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
            disabled={loading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Remember and Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("remember")}
            className="accent-blue-600"
            disabled={loading}
          />
          Remember me
        </label>
        <Link href="/" className="text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-gradient-to-r from-[#0439e6] to-[#0051ff] text-white px-6 py-2.5 rounded-sm font-medium transition duration-300 hover:from-[#0051ff] hover:to-[#0439e6] ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : "Login"}
      </button>

      {/* Or Divider */}
      <div className="flex items-center gap-3 mt-2 mb-2">
        <hr className="flex-1 border-gray-300" />
        <span className="text-gray-500 text-sm">OR</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Social Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleGoogleLogin}
          type="button"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-60"
        >
          <FcGoogle />
          Google
        </button>
        <button
          onClick={handleGitHubLogin}
          type="button"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-60"
        >
          <FaGithub />
          GitHub
        </button>
      </div>

      {/* Terms */}
      <p className="text-xs text-gray-500 text-center mt-3">
        By creating an account, you agree to our{" "}
        <Link href="/" className="text-blue-600 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>
      </p>
    </form>
  );
}
