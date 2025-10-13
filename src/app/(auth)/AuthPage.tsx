"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./login/components/login-form";
import SignUpForm from "./signup/components/signup-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AuthPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  
  useEffect(() => {
    if (pathname.includes('signup')){
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }
  },[pathname])

  // Handle NextAuth errors from URL query parameters
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      console.error("NextAuth error:", error);
      
      // Map NextAuth error codes to user-friendly messages
      const errorMessages: Record<string, string> = {
        'Configuration': 'There is a problem with the server configuration. Please contact support.',
        'AccessDenied': 'Access denied. You do not have permission to sign in.',
        'Verification': 'The verification link is invalid or has expired.',
        'OAuthSignin': 'Error starting Google sign-in. Please try again.',
        'OAuthCallback': 'Error during Google authentication. Please check your settings and try again.',
        'OAuthCreateAccount': 'Could not create your account with Google. Please try again or use email/password.',
        'EmailCreateAccount': 'Could not create your account. Please try again.',
        'Callback': 'Authentication callback error. Please try again.',
        'OAuthAccountNotLinked': 'This email is already registered with a different sign-in method. Please use your original sign-in method.',
        'EmailSignin': 'Error sending verification email.',
        'CredentialsSignin': 'Invalid email or password.',
        'SessionRequired': 'Please sign in to access this page.',
        'Default': 'An unexpected error occurred during authentication. Please try again.'
      };
      
      const message = errorMessages[error] || errorMessages['Default'];
      toast.error(message);
      
      // Clean up URL by removing error parameter
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      router.replace(newUrl.pathname + newUrl.search);
    }
  }, [searchParams, router])

  const handleToggle = (toLogin: boolean) => {
    setIsLogin(toLogin);
    router.push(toLogin ? '/login' : '/signup');
  };

  return (
    <section className="flex flex-col items-center gap-4 w-full relative z-10">
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-4">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    AI-Powered Job Tracking
                  </span>
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Welcome Back!
              </motion.h1>
              <motion.p 
                className="text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Sign in to continue your job search journey
              </motion.p>
            </div>

            <LoginForm />

            <motion.p 
              className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Don&apos;t have an account?{" "}
              <button
                onClick={() => handleToggle(false)}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition"
              >
                Create Account
              </button>
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-4">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Start Your Journey
                  </span>
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Create an Account
              </motion.h1>
              <motion.p 
                className="text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Join thousands tracking their job applications with AI
              </motion.p>
            </div>

            <SignUpForm />

            <motion.p 
              className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Already have an account?{" "}
              <button
                onClick={() => handleToggle(true)}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition"
              >
                Sign In
              </button>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Back to Home Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <Link 
          href="/" 
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition inline-flex items-center gap-1"
        >
          ← Back to Home
        </Link>
      </motion.div>
    </section>
  );
}
