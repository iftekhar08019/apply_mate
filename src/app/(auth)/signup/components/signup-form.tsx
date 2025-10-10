"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, Lock, User, AlertCircle, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useSignup from "@/hooks/useSignup";

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
      const result = await signIn("google", { callbackUrl:"/dashboard" })
      if (result?.ok) {
        toast.success("Sign in Success");
        router.push("/");
      }
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
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
        {/* Name */}
        <motion.div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="name"
              type="text"
              {...register("name", { required: "Full name is required" })}
              placeholder="John Doe"
              className={`w-full pl-10 pr-3 py-2.5 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.name
                  ? "border-red-500/50 focus:ring-red-500"
                  : " focus:ring-blue-500"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.name.message}
            </p>
          )}
        </motion.div>

        {/* Email */}
        <motion.div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
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
        <motion.div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
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
              className={`w-full pl-10 pr-3 py-2.5 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.password
                  ? "border-red-500/50 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
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
        <motion.div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1"
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
              className={`w-full pl-10 pr-3 py-2.5 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.confirmPassword
                  ? "border-red-500/50 focus:ring-red-500"
                  : " focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setConfirmPassword(!confirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {confirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.confirmPassword.message}
            </p>
          )}
        </motion.div>

        {/* Terms Agreement */}
        <motion.div>
          <div className="flex items-start gap-3">
            <input
              id="terms"
              type="checkbox"
              {...register("terms", { required: "You must accept the terms" })}
              className="h-4 w-4 mt-0.5 rounded bg-white/10 border-white/30 text-blue-500 focus:ring-blue-600 accent-blue-500"
            />
            <label htmlFor="terms" className="text-sm">
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
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-[#0439e6] to-[#0051ff] text-white px-6 py-2.5 rounded-sm font-medium transition duration-300 hover:from-[#0051ff] hover:to-[#0439e6]"
        >
          {isPending ? "Creating Account..." : "Sign Up"}
        </motion.button>
      </motion.form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <hr className="w-full border-t-2 border-gray-800" />
        <span className="text-sm">OR</span>
        <hr className="w-full border-t-2 border-gray-800" />
      </div>

      {/* Social Signup */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-300 dark:hover:bg-gray-800 transition"
      >
        <FcGoogle /> Continue with Google
      </button>
    </>
  );
}
