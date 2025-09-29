"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const slides = [
    {
      src: "/image5.png",
      alt: "slide1",
      title: "Log in to ApplyMate",
      text: "Track your job applications and deadlines in one place.  ",
    },
    {
      src: "/image6.png",
      alt: "slide2",
      title: "Quick and secure access.",
      text: "All your applications and notes are waiting for you.",
    },
    {
      src: "/image3.png",
      alt: "slide3",
      title: "Your account, your control",
      text: "Protecting your data with safe access.",
    },
  ];

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100 dark:bg-gray-950">
      {/* Left side → login / signup form */}
      <div className="flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right side → swiper with bg */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="relative z-10 max-w-sm text-center text-white p-8 md:p-10">
          <Swiper
            modules={[ Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            className="mb-6"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={600}
                    height={600}
                    className="mx-auto drop-shadow-2xl"
                  />

                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-lg md:text-2xl font-semibold mt-4"
                  >
                    {slide.title}
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-sm md:text-base mt-2"
                  >
                    {slide.text}
                  </motion.p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
