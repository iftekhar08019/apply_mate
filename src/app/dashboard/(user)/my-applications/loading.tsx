// app/dashboard/(user)/my-applications/loading.tsx
"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" suppressHydrationWarning>
      <span className="loader" aria-hidden="true"></span>
        <p className="text-lg font-medium text-muted-foreground">Loading your applications...</p>
      <style jsx global>{`
        .loader {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: block;
          margin: 15px auto;
          position: relative;
          background: #002fff;
          box-shadow: -24px 0 #002fff, 24px 0 #002fff;
          box-sizing: border-box;
          animation: shadowPulse 2s linear infinite;
        }

        @keyframes shadowPulse {
          33% {
            background: #002fff;
            box-shadow: -24px 0 #fff, 24px 0 #002fff;
          }
          66% {
            background: #fff;
            box-shadow: -24px 0 #002fff, 24px 0 #fff;
          }
          100% {
            background: #002fff;
            box-shadow: -24px 0 #002fff, 24px 0 #fff;
          }
        }
      `}</style>
    </div>
  );
}
