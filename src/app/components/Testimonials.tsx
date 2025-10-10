"use client";

import * as React from "react";
import { Star, Sparkles, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  _id: string;
  userName: string;
  userImage: string;
  userBio: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function TestimonialSlider() {
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Fetch reviews
  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        if (data.success) {
          setReviews(data.data);
        }
      } catch (error) {
        // console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Calculate how many reviews to show per slide based on screen size
  const getReviewsPerSlide = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth >= 1280) return 4; // xl
    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 768) return 2;  // md
    return 1; // sm
  };

  const [reviewsPerSlide, setReviewsPerSlide] = React.useState(4);

  React.useEffect(() => {
    const handleResize = () => {
      setReviewsPerSlide(getReviewsPerSlide());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(reviews.length / reviewsPerSlide);

  const nextSlide = React.useCallback(() => {
    if (isAnimating || totalSlides <= 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalSlides]);

  const prevSlide = React.useCallback(() => {
    if (isAnimating || totalSlides <= 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalSlides]);

  const goToSlide = React.useCallback(
    (index: number) => {
      if (!isAnimating && index !== currentSlide) {
        setIsAnimating(true);
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 500);
      }
    },
    [isAnimating, currentSlide]
  );

  // Auto-rotate slides
  React.useEffect(() => {
    if (totalSlides > 1) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, totalSlides]);

  // Trigger animation only once
  const ref = React.useRef(null);

  // Loading state
  if (loading) {
    return (
      <section className="bg-gray-100 dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-600 dark:text-blue-400" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading reviews...</p>
        </div>
      </section>
    );
  }

  // No reviews state
  if (reviews.length === 0) {
    return (
      <section className="bg-gray-100 dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Star className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Reviews Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Be the first to share your experience with Apply Mate!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="bg-gray-100 dark:bg-gray-900 py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute -z-10 top-20 left-10 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -z-10 bottom-20 right-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="relative inline-block w-fit px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[length:200%_100%] border border-blue-600 mb-6"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="inline w-4 h-4 mr-2" />
            Testimonials
          </motion.p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Users Say About{" "}
            <span className="text-blue-600 dark:text-blue-400">Apply Mate</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Real experiences from job seekers who transformed their application tracking with AI
          </p>
        </motion.div>

        {/* Reviews Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
              >
                {reviews
                  .slice(
                    currentSlide * reviewsPerSlide,
                    (currentSlide + 1) * reviewsPerSlide
                  )
                  .map((review, index) => (
                    <motion.div
                      key={review._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/60 dark:from-blue-900/30 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl p-6 shadow-sm backdrop-blur-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                        {/* Profile Section */}
                        <div className="flex items-center gap-4 mb-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative w-12 h-12 rounded-full border-2 border-blue-600 dark:border-blue-400 shadow-lg overflow-hidden flex-shrink-0"
                          >
                            <Image
                              src={review.userImage}
                              alt={review.userName}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                              {review.userName}
                            </h4>
                            <p className="text-blue-600 dark:text-blue-400 text-xs font-medium truncate">
                              {review.userBio}
                            </p>
                          </div>
                        </div>

                        {/* Stars Rating */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Review Comment */}
                        <blockquote className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-4">
                          &quot;{review.comment}&quot;
                        </blockquote>

                        {/* Date */}
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 lg:-translate-x-12 bg-white/80 dark:bg-gray-800/80 border border-blue-200/50 dark:border-blue-700/50 rounded-full p-3 md:p-4 hover:bg-blue-50 dark:hover:bg-gray-700 backdrop-blur-sm transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 lg:translate-x-12 bg-white/80 dark:bg-gray-800/80 border border-blue-200/50 dark:border-blue-700/50 rounded-full p-3 md:p-4 hover:bg-blue-50 dark:hover:bg-gray-700 backdrop-blur-sm transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next reviews"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {totalSlides > 1 && (
            <motion.div
              className="flex justify-center gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isAnimating}
                  className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentSlide
                      ? "w-8 bg-blue-600 dark:bg-blue-400"
                      : "w-3 bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-500"
                  } disabled:cursor-not-allowed`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
