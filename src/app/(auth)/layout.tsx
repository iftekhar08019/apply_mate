"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";

// Data for the slides
const slides = [
  {
    src: "/image5.png",
    alt: "Application Tracking",
    title: "Welcome to ApplyMate",
    text: "Track all your job applications and important deadlines in one single, streamlined space.",
  },
  {
    src: "/image6.png",
    alt: "Secure Access",
    title: "Quick & Secure Access",
    text: "Your professional journey, applications, and notes are always waiting for you, safe and sound.",
  },
  {
    src: "/image3.png",
    alt: "Data Control",
    title: "Your Account, Your Control",
    text: "We prioritize your privacy. Your data is protected with secure access and robust encryption.",
  },
];

function ParallaxSlide({ slide }: { slide: (typeof slides)[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [-10, 10]);
  const rotateY = useTransform(x, [-100, 100], [10, -10]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col items-center justify-center text-center h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="mb-6 transition-transform duration-200 ease-out"
      >
        <Image
          src={slide.src}
          alt={slide.alt}
          width={500}
          height={500}
          className="mx-auto drop-shadow-2xl"
          priority
        />
      </motion.div>
      <motion.h3
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.6,
          type: "spring",
          stiffness: 100,
        }}
        className="text-2xl md:text-3xl font-bold"
      >
        {slide.title}
      </motion.h3>
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.3,
          duration: 0.6,
          type: "spring",
          stiffness: 100,
        }}
        className="text-base md:text-lg mt-3 max-w-xs"
      >
        {slide.text}
      </motion.p>
    </motion.div>
  );
}

const AnimationStyles = () => (
  <style jsx global>{`
    .animated-gradient {
      background: linear-gradient(to bottom right, #0046ff, #0065f8, #4300ff);
      background-size: 400% 400%;
      animation: gradient-xy 15s ease infinite;
    }
    @keyframes gradient-xy {
      0%,
      100% {
        background-position: left center;
      }
      50% {
        background-position: right center;
      }
    }
    .blob-animation {
      animation: blob 7s infinite;
    }
    @keyframes blob {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }
  `}</style>
);

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const imageSide = (
    <div className="hidden md:flex flex-col items-center justify-center text-white p-10 relative overflow-hidden rounded-bl-[96px] rounded-tl-[96px] border border-blue-400 dark:border-blue-700 m-4">
      <AnimationStyles />

      <div className="absolute inset-0 w-full h-full animated-gradient"></div>

      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full opacity-30 filter blur-3xl blob-animation"></div>
      <div
        className="absolute -bottom-20 -right-10 w-72 h-72 bg-blue-500 rounded-full opacity-30 filter blur-3xl blob-animation"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute -bottom-5 left-10 w-48 h-48 bg-blue-400 rounded-full opacity-20 filter blur-3xl blob-animation"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          aria-live="polite"
          className="w-full h-full"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx} className="flex items-center justify-center">
              <ParallaxSlide slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );

  const formSide = (
    <div className="flex items-center justify-center w-full px-6 md:px-12 py-12">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {formSide}
        {imageSide}
      </div>
    </section>
  );
}
