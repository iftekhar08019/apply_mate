import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="spinner mb-8"></div>
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

      <div className="loader-text">ApplyMate</div>
    </div>
  );
};

export default Loading;
