import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="spinner mb-8"></div>

      <div className="loader-text">ApplyMate</div>
    </div>
  );
};

export default Loading;
