// app/about/career/[id]/loading.jsx

import React from 'react';

/**
 * Loading skeleton for the career details and application form page.
 * This component provides a visual placeholder that mimics the final page layout,
 * improving user experience by showing an active loading state.
 */
const loading = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Page Title Skeleton */}
      <div className="h-9 bg-gray-300 rounded-md w-1/3 animate-pulse"></div>

      {/* Job Info Card Skeleton */}
      <div className="bg-white rounded-2xl p-8 space-y-6 animate-pulse">
        {/* Job Title Skeleton */}
        <div className="h-8 bg-red-200 rounded-md w-3/4"></div>

        {/* Job Summary Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>

        {/* Job Description and Skills Skeleton */}
        <div className="pt-6 space-y-8">
          <div>
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>

          <div>
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Application Form Skeleton (ApplyForJob) */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-10 animate-pulse">
        <div className="h-8 bg-red-200 rounded-md w-1/3 mb-6"></div>
        <div className="space-y-5">
          {/* Input field skeletons */}
          <div className="h-11 w-full bg-gray-200 border rounded-md"></div>
          <div className="h-11 w-full bg-gray-200 border rounded-md"></div>
          <div className="h-11 w-full bg-gray-200 border rounded-md"></div>
          {/* Textarea skeleton */}
          <div className="h-28 w-full bg-gray-200 border rounded-md"></div>
          {/* File input skeleton */}
          <div className="h-11 w-full bg-gray-200 border rounded-md"></div>
          {/* Submit button skeleton */}
          <div className="h-11 w-28 bg-red-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default loading;