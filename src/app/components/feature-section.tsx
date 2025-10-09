"use client";
import React from "react";
import { Chrome, Mail, CheckCircle2, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

// TypeScript Type Definitions
type Feature = {
  icon: LucideIcon;
  title: string;
  details: string[];
};

type FeatureDetailsProps = {
  feature: Feature;
};

type HexagonIconCardProps = {
  icon: LucideIcon;
};

// Reusable Feature Details Component
const FeatureDetails: React.FC<FeatureDetailsProps> = ({ feature }) => {
  const { icon: Icon, title, details } = feature;
  return (
    <div className="lg:w-1/2 flex flex-col justify-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="mb-4 inline-flex items-center gap-3 rounded-full px-4 py-2">
          <Icon className="text-blue-600 dark:text-blue-400" size={24} />
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
          Automate your workflow with our smart integrations, designed to give you an edge.
        </p>
        <ul className="space-y-4">
          {details.map((item, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <CheckCircle2
                className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500"
                aria-hidden="true"
              />
              <span className="text-gray-700 dark:text-gray-300">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

// Reusable Hexagon Icon Card Component
const HexagonIconCard: React.FC<HexagonIconCardProps> = ({ icon: Icon }) => {
  return (
    <motion.div
      className="lg:w-1/2 flex items-center justify-center p-8 relative z-10"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <div className="hexagon-wrapper">
        <div className="hexagon-inner">
          <Icon className="text-blue-500 dark:text-blue-400" size={80} strokeWidth={1.5} />
        </div>
      </div>
    </motion.div>
  );
};

// Main Feature Section Component
export default function FeatureSectionV2() {
  const features: Feature[] = [
    {
      icon: Chrome,
      title: "Chrome Extension",
      details: [
        "One-click job scraping from LinkedIn and Indeed",
        "Automatic job details extraction",
        "Seamless integration with the web app",
      ],
    },
    {
      icon: Mail,
      title: "Gmail Integration",
      details: [
        "Automatic status updates from emails",
        "Interview reminder notifications",
        "Smart email parsing for job-related communications",
      ],
    },
  ];

  return (
    <>
      <style jsx global>{`
        .hexagon-wrapper {
          position: relative;
          width: 100%;
          max-width: 320px;
          filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.05));
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s ease;
        }
        .hexagon-wrapper::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 1rem;
          padding: 2px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(236, 72, 153, 0.5));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
          transition: opacity 0.4s ease;
          opacity: 0.5;
        }
        .hexagon-wrapper:hover {
          transform: translateY(-12px) rotate(4deg) scale(1.05);
          filter: drop-shadow(0 20px 25px rgba(59, 130, 246, 0.2));
        }
        .hexagon-wrapper:hover::before {
          opacity: 1;
        }
        .hexagon-inner {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1 / 1;
          background: #ffffff;
          clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
        }
        .dark .hexagon-inner {
          background: #111827; /* gray-900 */
        }
        .dark .hexagon-wrapper:hover {
          filter: drop-shadow(0 20px 25px rgba(96, 165, 250, 0.25));
        }
      `}</style>

      <section className="relative py-20 sm:py-28 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3">
            <div className="w-[800px] h-[800px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3">
            <div className="w-[800px] h-[800px] rounded-full bg-pink-500/10 dark:bg-pink-500/5 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
              Powerful Tools, Seamless Workflow
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
              Automate the tedious parts of your job search and focus on what truly matters: landing your dream job.
            </p>
          </div>

          <div className="space-y-20 md:space-y-28">
            {features.map((feature, index) => (
              <div key={feature.title} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}>
                <FeatureDetails feature={feature} />
                <HexagonIconCard icon={feature.icon} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}