// app/about/legal/loading.jsx

import React from 'react';

/**
 * Loading skeleton for the Legal Information page.
 * This component provides a visual placeholder that mimics the final page layout,
 * improving user experience by showing an active loading state.
 */
const loading = () => {
  return (
    // Main container that matches the layout of the final page
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero Section Skeleton */}
      <div className="w-[80%] h-[30vh] bg-gray-300 animate-pulse flex flex-col justify-center items-center mt-10 rounded-3xl">
        {/* Placeholder for the Lock icon */}
        <div className="bg-gray-400 rounded-full h-14 w-14 mb-4"></div>
        {/* Placeholder for the hero heading */}
        <div className="h-7 bg-gray-400 rounded-md w-1/3"></div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="w-[80%] px-6 py-8">
        {/* Create a few placeholder sections to represent the loading content */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="space-y-6 mb-10 animate-pulse">
            {/* Section Title Placeholder */}
            <div className="h-8 bg-gray-400 rounded-md w-2/5"></div>

            {/* Content Placeholder */}
            <div className="space-y-4">
              {/* Paragraph placeholders with varying widths for a natural look */}
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              <div className="h-4 bg-gray-200 rounded-md w-11/12"></div>
              <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>

              <div className="h-6"></div> {/* Spacer for visual separation */}

              {/* Bullet list placeholders */}
              <div className="pl-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                <div className="h-4 bg-gray-200 rounded-md w-11/12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;