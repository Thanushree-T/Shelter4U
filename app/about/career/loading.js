// app/about/career/loading.jsx

import React from 'react';

/**
 * A skeleton placeholder for an individual career card.
 * It mimics the card's structure, including title, details, and button,
 * using animated gray boxes.
 */
const CareerCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg space-y-6 min-h-[320px] w-full max-w-[500px] mx-auto animate-pulse">
    {/* Job Position Title Skeleton */}
    <div className="h-8 bg-gray-300 rounded-md w-3/4"></div>

    {/* Job Details Section Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>

    {/* View Details Button Skeleton */}
    <div className="h-11 w-32 bg-gray-300 rounded-full mt-4"></div>
  </div>
);

/**
 * Loading skeleton for the main Career page.
 * This component provides a visual placeholder that includes a hero section
 * and a grid of career card skeletons.
 */
const loading = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero Section Skeleton */}
      <div className="w-[80%] h-[30vh] bg-gray-300 animate-pulse flex flex-col justify-center items-center mt-10 rounded-3xl">
        {/* Placeholder for the Lock icon */}
        <div className="bg-gray-400 rounded-full h-14 w-14 mb-4"></div>
        {/* Placeholder for the hero heading */}
        <div className="h-7 bg-gray-400 rounded-md w-1/3"></div>
      </div>

      {/* Grid of Job Cards Skeleton */}
      <div className="w-[80%] px-4 sm:px-6 md:px-8 lg:px-10 py-6 flex justify-center">
        <div className="w-full max-w-[1280px] grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Render multiple skeleton cards to represent a loading list (e.g., 6) */}
          {[...Array(6)].map((_, index) => (
            <CareerCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;