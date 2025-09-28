"use client"
import React from "react";
import { LayoutDashboard, Chrome, Mail, Bell } from "lucide-react";

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: LayoutDashboard,
    title: "Centralized Dashboard",
    description: "See all your job applications in one organized place with status updates and deadlines."
  },
  {
    icon: Chrome,
    title: "Chrome Extension",
    description: "Save job postings from LinkedIn, Indeed, and other portals with one click, auto-filling all fields."
  },
  {
    icon: Mail,
    title: "Gmail Integration",
    description: "Automatically detect interview invites, rejections, and updates from your inbox and update your tracker."
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Get notified about upcoming interviews and follow-ups so you never miss an opportunity."
  }
];
// card section
const FeatureCard = ({ icon: Icon, title, description }: Feature) => {
  return (
    <div className="hexagon-card-wrapper">
      <div className="hexagon-card flex flex-col items-center justify-center p-6 sm:p-8 text-center">
        <div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-blue-200 dark:ring-blue-500/50">
          <Icon size={28} strokeWidth={2} className="sm:size-8" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function FeatureSection() {
  return (
    <>
      {/* hexagon card design style */}
      <style jsx global>{`
        .hexagon-card {
          position: relative;
          width: 100%;
          max-width: 280px; /* Prevents from growing too large */
          aspect-ratio: 5 / 6; /* Keeps proportional shape */
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

      <section className="bg-gray-100 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Everything You Need to Track <br /> Your Job Applications
            </h2>
           
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
