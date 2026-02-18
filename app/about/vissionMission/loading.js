// app/vision-mission/loading.jsx

import React from 'react';

/**
 * Loading skeleton for the Vision & Mission page.
 * This component provides a visual placeholder that mimics the final page layout,
 * improving user experience by showing an active loading state.
 */
const loading = () => {
  return (
    // Main container that matches the layout of the final page
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero section skeleton */}
      <div className="w-[80%] h-[30vh] bg-gray-300 animate-pulse py-6 flex flex-col justify-center items-center mt-10 rounded-3xl">
        {/* Placeholder for the Lock icon */}
        <div className="bg-gray-400 rounded-full h-14 w-14 mb-4"></div>
        {/* Placeholder for the hero heading */}
        <div className="h-7 bg-gray-400 rounded-md w-1/2"></div>
      </div>

      {/* Main Content Sections Skeleton */}
      <div className="w-[80%] px-6 py-8 space-y-10">
        {/* Create two placeholder sections for "Vision" and "Mission" */}
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="space-y-6 animate-pulse">
            {/* Section title placeholder */}
            <div className="h-8 bg-gray-400 rounded-md w-1/3"></div>

            {/* visionMissionText placeholder */}
            <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>

            {/* Paragraph placeholders */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded-md w-full"></div>
              <div className="h-4 bg-gray-300 rounded-md w-11/12"></div>
            </div>

            {/* Bullet list placeholders */}
            <div className="pl-6 space-y-3">
              <div className="h-4 bg-gray-300 rounded-md w-full"></div>
              <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;