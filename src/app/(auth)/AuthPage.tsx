"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./login/components/login-form";
import SignUpForm from "./signup/components/signup-form";
import { usePathname } from "next/navigation";

export default function AuthPage() {
  const pathname = usePathname()
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    if (pathname.includes('signup')){
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }
  },[pathname])

  return (
    <section className="flex flex-col items-center gap-4">
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold">Welcome Back !</h1>
              <p className="text-gray-300 mt-2">Please enter your details</p>
            </div>

            <LoginForm />

            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 font-medium hover:underline"
              >
                Sign Up
              </button>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
             initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            <SignUpForm />

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600 font-medium hover:underline"
              >
                Log In
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
