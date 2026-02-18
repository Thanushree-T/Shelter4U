// app/inquiry/loading.jsx

import React from 'react';

/**
 * Loading skeleton for the Inquiry page.
 * This component provides a visual placeholder that mimics the final page layout,
 * featuring a form on the left and a decorative image placeholder on the right.
 */
const loading = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-16 p-4 animate-pulse">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Left section - Inquiry form skeleton */}
          <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:max-w-none">
            {/* Title and Subtitle Skeleton */}
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-3"></div>
            <div className="h-5 bg-gray-200 rounded w-2/3 mb-8"></div>

            {/* Inquiry Form Skeleton */}
            <div className="space-y-5">
              {/* Name Input Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
              </div>
              {/* Email Input Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
              </div>
              {/* Phone Input Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
              </div>
              {/* Message Textarea Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-24 bg-gray-200 rounded-lg w-full"></div>
              </div>
              {/* Submit Button Skeleton */}
              <div className="h-12 bg-red-200 rounded-lg w-full"></div>
            </div>
          </div>

          {/* Right section - Decorative image skeleton */}
          <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
            <div className="relative w-[250px] h-[250px] xs:w-[300px] xs:h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px]">
              {/* Main circular image placeholder */}
              <div className="absolute inset-0 rounded-full bg-gray-300 border-8 border-white shadow-xl"></div>
              
              {/* Floating orb placeholders */}
              <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-red-100 opacity-50"></div>
              <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-red-100 opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;