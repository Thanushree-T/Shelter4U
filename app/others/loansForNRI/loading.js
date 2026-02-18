// app/about/loan/loading.jsx

import React from 'react';

/**
 * Loading skeleton for the "Loans for NRIs" page.
 * This component provides a visual placeholder that mimics the final page layout,
 * including a hero section, text content, and a data table.
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
        <div className="h-7 bg-gray-400 rounded-md w-1/2"></div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="w-[80%] px-6 py-8 space-y-10">
        {/* Create two placeholder sections to represent a list of content */}
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="space-y-6 animate-pulse">
            {/* Section Title Placeholder */}
            <div className="h-8 bg-gray-400 rounded-md w-2/3"></div>

            {/* Paragraphs Placeholder */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              <div className="h-4 bg-gray-200 rounded-md w-11/12"></div>
              <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
            </div>

            {/* Bullet Points Placeholder */}
            <div className="pl-6 space-y-3 mt-4">
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              <div className="h-4 bg-gray-200 rounded-md w-11/12"></div>
            </div>

            {/* Table Placeholder (only for the first skeleton section for variety) */}
            {idx === 0 && (
              <div className="overflow-x-auto mt-6">
                <div className="min-w-full bg-white rounded-xl shadow-lg p-4">
                  {/* Table Header Skeleton */}
                  <div className="flex bg-gray-300 rounded-t-lg p-4 space-x-4">
                    <div className="h-6 bg-gray-400 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-400 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-400 rounded w-1/3"></div>
                  </div>
                  {/* Table Body Skeleton */}
                  <div className="space-y-2 mt-2">
                    {[...Array(4)].map((_, rIdx) => (
                      <div key={rIdx} className="flex p-4 space-x-4">
                        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;