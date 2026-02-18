// app/contact-us/loading.jsx

import React from 'react';

/**
 * Loading skeleton for the Contact Us page.
 * This component provides a visual placeholder that mimics the final page layout,
 * including contact details, a form, and a map.
 */
const loading = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 py-12 px-6 md:px-24 lg:px-32 animate-pulse">
      <div className="flex flex-col md:flex-row justify-between w-full">
        {/* Left Section - Contact Info and Social Media Skeleton */}
        <div className="w-full md:w-1/2 md:pr-8">
          {/* Title and Subtitle Skeleton */}
          <div className="h-10 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-5 bg-gray-200 rounded w-full mb-8"></div>

          {/* Contact Info Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="bg-red-100 h-12 w-12 rounded-md"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  {i < 2 && <div className="h-4 bg-gray-200 rounded w-4/5"></div>}
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-gray-200 mb-7"></div>

          {/* Social Media Icons Skeleton */}
          <div className="flex items-center text-2xl gap-4 flex-wrap">
            <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
            <div className="bg-red-100 h-12 w-12 rounded-md"></div>
            <div className="bg-red-100 h-12 w-12 rounded-md"></div>
            <div className="bg-red-100 h-12 w-12 rounded-md"></div>
          </div>
        </div>

        {/* Right Section - Inquiry Form Skeleton */}
        <div className="w-full md:w-1/2 md:pl-8 mt-8 md:mt-0">
          <div className="rounded-lg p-6 shadow-lg bg-white border border-gray-200">
            <div className="space-y-5">
              {/* Form Field Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
              </div>
              {/* Form Field Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
              </div>
              {/* Form Field Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
              </div>
              {/* Textarea Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
              </div>
              {/* Button Skeleton */}
              <div className="h-12 bg-red-200 rounded-lg w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Embed Skeleton */}
      <div className="w-full mt-8">
        <div className="w-full h-96 bg-gray-300 rounded-lg shadow-md"></div>
      </div>
    </div>
  );
};

export default loading;