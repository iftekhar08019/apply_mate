"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side → login / signup form */}
      <div className="flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right side → shared section with Swiper */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-10">
        <div className="max-w-sm text-center text-white">
          <Swiper loop autoplay={{ delay: 2500 }} className="mb-6">
            <SwiperSlide>
              <Image
                src="/login-illustration1.png"
                alt="slide1"
                width={400}
                height={400}
                className="mx-auto"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/login-illustration2.png"
                alt="slide2"
                width={400}
                height={400}
                className="mx-auto"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/login-illustration3.png"
                alt="slide3"
                width={400}
                height={400}
                className="mx-auto"
              />
            </SwiperSlide>
          </Swiper>

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
