// components/HowItWorks.tsx
"use client";
import { ArrowRight, SquarePlus, Mail, BarChart } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";

type Step = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType; // icon component type
};

const STEPS: Step[] = [
  {
    id: "add",
    title: "Add jobs with one click",
    description: "Use the browser extension to add jobs instantly.",
    icon: SquarePlus, // component, not string
  },
  {
    id: "sync",
    title: "Stay updated",
    description: "Gmail sync keeps interview invites and replies in one place.",
    icon: Mail,
  },
  {
    id: "track",
    title: "Track progress",
    description: "Monitor progress from the dashboard with analytics.",
    icon: BarChart,
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto container px-4 py-12 md:flex md:gap-10 items-center">
      {/* Left side */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <p
          className="
    relative inline-block w-fit px-3 py-1 rounded-md text-sm uppercase tracking-wide font-medium text-white
    bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 
    bg-[length:200%_100%]
    border border-blue-600"
        >
          How it works
        </p>

        <h2 className="text-3xl font-bold mb-3 text-blue-700">
          <Typewriter
            words={[
              "3 simple steps to manage applications",
              "Add jobs, stay updated, track progress",
              "Everything in one dashboard",
            ]}
            loop={0} // 0 = infinite loop
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </h2>

        <p>
          Add roles with a click, get updates from Gmail, and track everything
          from one dashboard.
        </p>
      </div>

      {/* Right side */}
      <div className="flex flex-col gap-6 md:w-1/2">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className="relative flex items-center gap-4 rounded-lg border dark:bg-gray-800 bg-white p-5 shadow-sm transition-transform duration-200 hover:scale-[1.02] border-blue-600 border-l-10"
            >
              {/* Hexagon with icon inside */}
              <div className="flex-shrink-0 grid place-items-center w-14 h-14 dark:bg-gray-900 bg-blue-100 text-blue-600 [clip-path:polygon(25%_6.7%,75%_6.7%,100%_50%,75%_93.3%,25%_93.3%,0%_50%)]">
                <Icon className="h-6 w-6" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>

              {/* Arrow badge (except last) */}
              {idx < STEPS.length - 1 && (
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center border border-blue-600 rounded-md bg-white dark:bg-gray-700 shadow">
                  <ArrowRight className="h-6 w-6 text-blue-400 rotate-90" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
