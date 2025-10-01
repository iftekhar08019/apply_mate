"use client";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";


export default function BannerSection() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/banner.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <section className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-10">

        {/* Left Text Section */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            All your job applications,{" "}
            <span className="text-primary">in one place.</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Stop juggling spreadsheets and messy tabs. <br />
            <span className="font-semibold">Apply Mate</span> helps you track,
            manage, and stay ahead in your job search.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-gradient-to-r from-[#0439e6] to-[#0051ff] text-white px-6 py-3 rounded-sm font-medium transition duration-300 hover:from-[#0051ff] hover:to-[#0439e6]">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Lottie Animation Section */}
        <div className="flex-1 flex justify-center">
          {animationData && (
            <Lottie
              animationData={animationData}
              loop
              className="w-full max-w-md md:max-w-lg lg:max-w-xl"
            />
          )}
        </div>
      </div>
    </section>
  );
}
