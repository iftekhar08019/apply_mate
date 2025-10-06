"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    quote:
      "I used to lose track of where I applied. With JobTracker, I can easily log my applications, follow-ups, and interviews in one place.",
    image: "/assets/review-2.png",
  },
  {
    name: "Michael Lee",
    role: "Data Analyst",
    quote:
      "The tracker helped me stay consistent and organized. I finally had a clear view of my progress, and it kept me motivated during my job search.",
    image: "/assets/review-1.png",
  },
  {
    name: "Emily Carter",
    role: "Product Designer",
    quote:
      "I love how simple and intuitive the dashboard is. Tracking applications became less stressful, and I landed interviews much faster.",
    image: "/assets/review-3.png",
  },
  {
    name: "David Kim",
    role: "Full Stack Engineer",
    quote:
      "JobTracker gave me a structured way to track my progress. It made a huge difference during my job hunt.",
    image: "/assets/review-1.png",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [direction, setDirection] = React.useState(0);

  const nextSlide = React.useCallback(() => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevSlide = React.useCallback(() => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToSlide = React.useCallback(
    (index: number) => {
      if (!isAnimating && index !== current) {
        setDirection(index > current ? 1 : -1);
        setIsAnimating(true);
        setCurrent(index);
        setTimeout(() => setIsAnimating(false), 500);
      }
    },
    [isAnimating, current]
  );

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  // Trigger animation only once
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gray-100 dark:bg-gray-900 overflow-hidden"
    >
      <div className="w-11/13 mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What job seekers say about{" "}
            <span className="text-blue-600 dark:text-blue-400">JobTracker</span>
          </h2>
          <p className="text-lg text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
            Hear from professionals who track their applications, interviews, and
            career progress with JobTracker.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full"
              >
                <div className="bg-white/70 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 md:p-12 shadow-lg backdrop-blur-xl hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Image */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 
                      border-white dark:border-gray-700 shadow-lg mb-6 overflow-hidden
                      bg-gradient-to-br from-white/40 via-white/10 to-transparent 
                      dark:from-blue-500/20 dark:via-purple-500/10 dark:to-transparent
                      hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] 
                      dark:hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] 
                      transition-all duration-500"
                    >
                      <Image
                        src={testimonials[current].image}
                        alt={testimonials[current].name}
                        fill
                        sizes="(max-width: 768px) 80px, 96px"
                        className="object-cover"
                      />
                    </motion.div>

                    {/* Quote */}
                    <motion.blockquote
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.2 }}
                      className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-6 italic max-w-2xl"
                    >
                      {testimonials[current].quote}
                    </motion.blockquote>

                    {/* Author Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="font-semibold text-gray-900 dark:text-white text-xl md:text-2xl">
                        {testimonials[current].name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
                        {testimonials[current].role}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 lg:-translate-x-12 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-full p-3 md:p-4 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300 cursor" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 lg:translate-x-12 bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-full p-3 md:p-4 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-sm transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Dots Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-3 mb-16"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === current
                  ? "w-8 bg-blue-600 dark:bg-blue-400"
                  : "w-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              } disabled:cursor-not-allowed`}
            />
          ))}
        </motion.div>
      </div>

      {/* Gradient Decorations */}
      <div className="absolute -z-10 top-10 left-1/4 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -z-10 bottom-10 right-1/4 h-80 w-80 rounded-full bg-green-400/10 blur-3xl" />
      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-purple-400/5 blur-3xl" />
    </section>
  );
}
