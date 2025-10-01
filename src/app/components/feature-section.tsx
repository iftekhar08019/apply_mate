"use client";
import React from "react";
import { LayoutDashboard, Chrome, Mail, Bell } from "lucide-react";
import { motion } from "framer-motion";

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: LayoutDashboard,
    title: "Centralized Dashboard",
    description:
      "See all your job applications in one organized place with status updates and deadlines.",
  },
  {
    icon: Chrome,
    title: "Chrome Extension",
    description:
      "Save job postings from LinkedIn, Indeed, and other portals with one click, auto-filling all fields.",
  },
  {
    icon: Mail,
    title: "Gmail Integration",
    description:
      "Automatically detect interview invites, rejections, and updates from your inbox and update your tracker.",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description:
      "Get notified about upcoming interviews and follow-ups so you never miss an opportunity.",
  },
];

// Parent container variants for staggered children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

// Card variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Content inside card variants
const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay: 0.1 } },
};

const FeatureCard = ({ icon: Icon, title, description }: Feature) => {
  return (
    <motion.div
      className="hexagon-card-wrapper"
      variants={cardVariants}
    >
      <div className="hexagon-card flex flex-col items-center justify-center p-6 sm:p-8 text-center">
        <motion.div
          className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-blue-200 dark:ring-blue-500/50"
          variants={contentVariants}
        >
          <Icon size={28} strokeWidth={2} />
        </motion.div>
        <motion.h3
          className="text-base sm:text-lg font-bold text-gray-900 dark:text-white"
          variants={contentVariants}
        >
          {title}
        </motion.h3>
        <motion.p
          className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400"
          variants={contentVariants}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default function FeatureSection() {
  return (
    <>
      <style jsx global>{`
        .hexagon-card {
          position: relative;
          width: 100%;
          max-width: 280px;
          aspect-ratio: 5 / 6;
          background-color: white;
          clip-path: polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          );
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .hexagon-card-wrapper {
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
          transition: filter 0.3s ease-in-out;
          display: flex;
          justify-content: center;
        }

        .hexagon-card-wrapper:hover {
          filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1));
        }

        .hexagon-card-wrapper:hover .hexagon-card {
          transform: translateY(-8px);
        }

        .dark .hexagon-card {
          background-color: #1f2937;
        }
      `}</style>

      <section className="pb-16">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Track <br /> Your{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Job Applications
              </span>
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          >
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
