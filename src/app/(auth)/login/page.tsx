"use client";
import React from "react";

import Image from "next/image";
import LoginForm from "./components/login-form";

export default function Login() {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side card */}
      <div className="flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            {/* logo */}
                   
            <h2 className="text-lg font-semibold">Welcome Back !</h2>
          </div>
          <p className="mb-6 text-gray-500">Please enter your details</p>

          {/* Login form */}
          <LoginForm />
        </div>
      </div>

      {/* Right side card */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-10">
        <div className="max-w-sm text-center text-white">
          <Image
            src="/login-illustration.png"
            alt="login illustration"
            width={400}
            height={400}
            className="mx-auto mb-6"
          />
          <h3 className="text-2xl font-semibold mb-2">
            Seamless work experience
          </h3>
          <p className="text-white/80">
            Everything you need in an easily customizable dashboard
          </p>
        </div>
      </div>
    </section>
  );
}
